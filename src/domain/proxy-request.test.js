import assert from 'assert'
import { proxied } from './proxy-request'

describe('Proxy', () => {
  it('should append the proxy to a url', () => {
    assert.equal(proxied('http://foo'), 'http://cors-proxy.htmldriven.com/?url=http://foo')
  })
})
