import { makeFetchDriver } from './cycle-fetch-driver'
import { mockTimeSource } from '@cycle/time'

describe('Cycle Fetch Driver', () => {
  const fakeResponse = {}
  let fixture

  beforeEach(() => {
    fixture = makeFetchDriver()

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

  it('should drop requests from the same url', done => {
    const Time = mockTimeSource()

    const request$ = Time.diagram('a--b---c|', {
      a: {url: 'same', category: 'bar'},
      b: {url: 'same', category: 'dog'},
      c: {url: 'same', category: 'bar'}
    })
    const expected$ = Time.diagram('a', {a: fakeResponse})

    Time.assertEqual(fixture(request$).select('bar').flatten(), expected$)
    Time.run(done)
  })

  it('should select responses by category', done => {
    const Time = mockTimeSource()

    const request$ = Time.diagram('a--b---c|', {
      a: {url: 'same', category: 'bar'},
      b: {url: 'different', category: 'dog'},
      c: {url: 'similar', category: 'bar'}
    })
    const expected$ = Time.diagram('a------c', {a: fakeResponse, c: fakeResponse})

    Time.assertEqual(fixture(request$).select('bar').flatten(), expected$)
    Time.run(done)
  })
})
