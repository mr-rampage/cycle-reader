import assert from 'assert'
import rewire from 'rewire'
import { mockTimeSource } from '@cycle/time'
import { mockDOMSource } from '@cycle/dom'

describe('Article List', () => {
  const fixture = rewire('./article-list.js')

  describe('Reducers', () => {
    let defaultReducer
    let articleReducer

    beforeEach(() => {
      defaultReducer = fixture.__get__('defaultReducer')
      articleReducer = fixture.__get__('articleReducer')
    })

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

  describe('Helpers', () => {
    it('should return true with articles', () => {
      const hasArticles = fixture.__get__('hasArticles')
      assert.equal(hasArticles({ articles: [] }), false)
      assert.equal(hasArticles({ articles: [{}, {}] }), true)
    })

    it('should sort the articles by index', () => {
      const sortArticles = fixture.__get__('sortArticles')
      const articles = { articles: [ {index: 1}, {index: 2} ] }
      assert.deepEqual(sortArticles(articles), [ { index: 2 }, { index: 1 } ])
    })
  })

  describe('Model', () => {
    it('should return a stream of reducers', done => {
      const Time = mockTimeSource()
      const actions = { request$: Time.diagram('--a--', {a: {}}) }
      const model = fixture.__get__('model')
      const expected$ = Time.diagram('a-b', { a: 'defaultReducer', b: 'viewingReducer' })

      Time.assertEqual(model(actions).map(fn => fn.name), expected$)
      Time.run(done)
    })
  })

  describe('Intent', () => {
    it('should create a stream from article urls for each card click', done => {
      const Time = mockTimeSource()
      const dom = mockDOMSource({
        '.uk-card': {
          'click': Time.diagram('---a--a', {a: fakeCardClickEvent()})
        }
      })

      const intent = fixture.__get__('intent')
      const expected$ = Time.diagram('---a--a', {a: 'http://article.url'})

      Time.assertEqual(intent(dom).request$, expected$)
      Time.run(done)
    })

    function fakeCardClickEvent () {
      return {
        currentTarget: {
          attributes: {
            getNamedItem: () => ({
              value: 'http://article.url'
            })
          }}}
    }
  })
})
