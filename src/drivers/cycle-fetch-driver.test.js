import assert from 'assert'
import { makeFetchDriver } from './cycle-fetch-driver'
import fromDiagram from 'xstream/extra/fromDiagram'

describe('Cycle Fetch Driver', () => {
  const driver = makeFetchDriver()
  const fakeResponse = {}

  before(() => {
    global.fetch = mockFetch
  })

  it('should drop requests for the same url', (done) => {
    const request$ = fromDiagram('a--b---c|', {
      values: {
        a: {url: 'same', category: 'bar'},
        b: {url: 'same', category: 'dog'},
        c: {url: 'same', category: 'bar'}
      }
    })

    const expected = [fakeResponse]

    driver(request$).select('bar').flatten()
      .addListener(verifyNextResponses(expected, done))
  })

  it('should select responses by category', (done) => {
    const request$ = fromDiagram('a--b---c|', {
      values: {
        a: {url: 'same', category: 'bar'},
        b: {url: 'different', category: 'dog'},
        c: {url: 'similar', category: 'bar'}
      }
    })

    const expected = [fakeResponse, fakeResponse]

    driver(request$).select('bar').flatten()
      .addListener(verifyNextResponses(expected, done))
  })

  function verifyNextResponses (expected, done) {
    return {
      next: response => {
        assert(response === expected.shift())
        if (expected.length === 0) {
          done()
        }
      },
      error: () => done('Error should not be called'),
      complete: () => done('Complete should not be called')
    }
  }

  function mockFetch (url) {
    return Promise.resolve({
      url,
      status: 200,
      statusText: 'OK',
      ok: true,
      json: () => fakeResponse
    })
  }
})
