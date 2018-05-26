import assert from 'assert'
import rewire from 'rewire'
import { mockTimeSource } from '@cycle/time'
import { mockDOMSource } from '@cycle/dom'

describe('Add Feed', () => {
  const fixture = rewire('./add-feed.js')

  describe('Reducers', () => {
    let defaultReducer
    let uriReducer

    beforeEach(() => {
      defaultReducer = fixture.__get__('defaultReducer')
      uriReducer = fixture.__get__('uriReducer')
    })

    it('should have a default reducer', () => {
      assert.deepEqual(defaultReducer(), {uri: '', articles: []})
    })

    it('should merge in the previous state', () => {
      assert.deepEqual(defaultReducer({uri: 'default', articles: [1, 2, 3]}), {uri: 'default', articles: [1, 2, 3]})
    })

    it('should create a reducer from a viewing article', () => {
      const prevState = {uri: 'some url', articles: [1, 2, 3]}
      assert.deepEqual(uriReducer('proxied')(prevState), {uri: 'proxied', articles: [1, 2, 3]})
    })
  })

  describe('Model', () => {
    it('should return a stream of reduced uri\'s', done => {
      const Time = mockTimeSource()
      const actions = { addFeed$: Time.diagram('--a--b', {a: 'http://proxy.com', b: 'not-a-url'}) }
      const model = fixture.__get__('model')
      const expected$ = Time.diagram('a-b--b', { a: 'defaultReducer', b: 'uriReducer' })

      Time.assertEqual(model(actions).map(fn => fn.name), expected$)
      Time.run(done)
    })
  })

  describe('Intent', () => {
    it('should create a stream from article urls for each card click', done => {
      const Time = mockTimeSource()
      const dom = mockDOMSource({
        '.uk-search': {
          'submit': Time.diagram('----a--a', {a: {}})
        },
        '.uk-search-input': {
          'input': Time.diagram('---a--b', {a: fakeInput('http://feed.url'), b: fakeInput('not-a-url')})
        }
      })

      const intent = fixture.__get__('intent')
      const expected$ = Time.diagram('----a---', { a: 'http://feed.url' })

      Time.assertEqual(intent(dom).addFeed$, expected$)
      Time.run(done)
    })

    function fakeInput (value) {
      return {
        target: {
          value: value
        }
      }
    }
  })
})
