import test from 'ava'
import { proxied } from './proxy-request'

test('my passing test', t => {
  t.is(proxied('http://foo'), 'http://localhost:8080/http://foo')
})
