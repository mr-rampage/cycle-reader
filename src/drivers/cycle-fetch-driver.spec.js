import test from 'ava'
import { makeFetchDriver } from './cycle-fetch-driver'
import { mockTimeSource } from '@cycle/time'

test.beforeEach(t => {
  const fakeResponse = {}

  t.context.Time = mockTimeSource()
  t.context.driver = makeFetchDriver()
  t.context.fakeResponse = fakeResponse

  global.fetch = function mockFetch (url) {
    return Promise.resolve({
      url,
      status: 200,
      statusText: 'OK',
      ok: true,
      json: () => fakeResponse
    })
  }
})

test.cb('should drop requests for the same url', t => {
  const Time = t.context.Time

  const request$ = Time.diagram('a--b---c|', {
    a: {url: 'same', category: 'bar'},
    b: {url: 'same', category: 'dog'},
    c: {url: 'same', category: 'bar'}
  })
  const expected$ = Time.diagram('a', {a: t.context.fakeResponse})

  Time.assertEqual(t.context.driver(request$).select('bar').flatten(), expected$)
  Time.run(t.end)
})

test.cb('should select responses by category', t => {
  const Time = t.context.Time

  const request$ = Time.diagram('a--b---c|', {
    a: {url: 'same', category: 'bar'},
    b: {url: 'different', category: 'dog'},
    c: {url: 'similar', category: 'bar'}
  })
  const expected$ = Time.diagram('a------c', {a: t.context.fakeResponse, c: t.context.fakeResponse})

  Time.assertEqual(t.context.driver(request$).select('bar').flatten(), expected$)
  Time.run(t.end)
})
