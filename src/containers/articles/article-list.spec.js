import assert from 'assert'
import rewire from 'rewire'

describe('Article List', () => {
  const fixture = rewire('./article-list.js')

  describe('Reducers', () => {
    const defaultReducer = fixture.__get__('defaultReducer')
    const articleReducer = fixture.__get__('articleReducer')
    it('should have a default reducer', () => {
      assert.deepEqual(defaultReducer(), {viewing: '', articles: []})
    })

    it('should merge in the previous state', () => {
      assert.deepEqual(defaultReducer({viewing: 'default'}), {viewing: 'default', articles: []})
    })

    it('should create a reducer from a viewing article', () => {
      const prevState = {viewing: 'some url', articles: [1, 2, 3]}
      assert.deepEqual(articleReducer('article url')(prevState), {viewing: 'article url', articles: [1, 2, 3]})
    })
  })
})
