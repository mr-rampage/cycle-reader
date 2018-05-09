import test from 'ava'
import { isUrl } from './urls'

test('should filter out invalid urls', t => {
  const source = ['foo', 'bar', 'http://www.google.ca', 'https://www.yahoo.com', 'baz']
  const expected = ['http://www.google.ca', 'https://www.yahoo.com']

  t.deepEqual(source.filter(isUrl), expected)
})
