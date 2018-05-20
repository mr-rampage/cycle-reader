import assert from 'assert'
import { ProxyRequest } from './proxy-request'

describe('Proxy request', () => {
  let proxiedRequest

  before(() => {
    const settings = { proxy: 'proxy-url' }
    const request = { uri: 'request-url' }
    proxiedRequest = ProxyRequest([request, settings])
  })

  it('should send the request with cors', () => {
    assert.equal(proxiedRequest.options.mode, 'cors')
  })

  it('should send an accept header of text/xml', () => {
    assert.equal(proxiedRequest.options.headers['ACCEPT'], 'text/xml')
  })

  it('should append the url to the proxy', () => {
    assert.equal(proxiedRequest.url, 'proxy-urlrequest-url')
  })
})
