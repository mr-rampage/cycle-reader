import assert from 'assert'
import { isUrl } from './urls'

describe('isUrl', () => {
  it('should return true for strings that match urls', () => {
    assert.equal(isUrl('http://www.google.ca'), true)
  })

  it('should return false for strings that don\'t match urls', () => {
    assert.equal(isUrl('not a url'), false)
  })
})
