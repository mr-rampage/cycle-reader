import assert from 'assert'
import xs from 'xstream'
import { Url$ } from './urls'

describe('Urls', () => {
  it('should filter out invalid urls', (done) => {
    const source = xs.of('foo', 'bar', 'http://www.google.ca', 'https://www.yahoo.com', 'baz')
    const expected = ['http://www.google.ca', 'https://www.yahoo.com']

    let stream = Url$(source)

    const listener = {
      next: url => {
        assert.equal(url, expected.shift())
        if (expected.length === 0) {
          stream.removeListener(listener)
          done()
        }
      },
      error: () => done('error should not be called'),
      complete: () => done('complete should not be called')
    }

    stream.addListener(listener)
  })
})
