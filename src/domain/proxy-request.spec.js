import test from 'ava'
import { proxied } from './proxy-request'

test('my passing test', t => {
  t.is(proxied('http://foo'), 'http://cors-proxy.htmldriven.com/?url=http://foo')
})
