import test from 'ava'
import { makeFetchDriver } from './cycle-fetch-driver'
import fromDiagram from 'xstream/extra/fromDiagram'

test.beforeEach(t => {
  const fakeResponse = {}

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
  t.plan(1)
  const request$ = fromDiagram('a--b---c|', {
    values: {
      a: {url: 'same', category: 'bar'},
      b: {url: 'same', category: 'dog'},
      c: {url: 'same', category: 'bar'}
    }
  })

  t.context.driver(request$)
    .select('bar')
    .flatten()
    .addListener({
      next: actual => {
        t.deepEqual(actual, t.context.fakeResponse)
        t.end()
      }
    })
})

test.cb('should select responses by category', t => {
  t.plan(2)

  const request$ = fromDiagram('a--b---c|', {
    values: {
      a: {url: 'same', category: 'bar'},
      b: {url: 'different', category: 'dog'},
      c: {url: 'similar', category: 'bar'}
    }
  })

  const expected = [t.context.fakeResponse, t.context.fakeResponse]

  t.context.driver(request$)
    .select('bar')
    .flatten()
    .addListener({
      next: actual => {
        t.deepEqual(actual, expected.shift())
        if (expected.length === 0) {
          t.end()
        }
      }
    })
})
