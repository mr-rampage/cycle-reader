import assert from 'assert'
import rewire from 'rewire'
import { mockTimeSource } from '@cycle/time'
import { mockDOMSource } from '@cycle/dom'

describe('Settings', () => {
  const fixture = rewire('./settings.js')

  describe('Reducers', () => {
    let defaultReducer
    let articleReducer

    beforeEach(() => {
      defaultReducer = fixture.__get__('defaultReducer')
      articleReducer = fixture.__get__('settingsReducer')
    })

    it('should have a default reducer', () => {
      assert.deepEqual(defaultReducer(), {proxy: ''})
    })

    it('should merge in the previous state', () => {
      assert.deepEqual(defaultReducer({proxy: 'default'}), {proxy: 'default'})
    })

    it('should create a reducer from a viewing article', () => {
      const prevState = {proxy: 'some url', other: 'foo'}
      assert.deepEqual(articleReducer({proxy: 'proxy-settings'})(prevState), {proxy: 'proxy-settings', other: 'foo'})
    })
  })

  describe('Model', () => {
    it('should return a stream of reducers', done => {
      const Time = mockTimeSource()
      const actions = { updateSetting$: Time.diagram('--a--', {a: {}}) }
      const model = fixture.__get__('model')
      const expected$ = Time.diagram('a-b', { a: 'defaultReducer', b: 'settingsReducer' })

      Time.assertEqual(model(actions).map(fn => fn.name), expected$)
      Time.run(done)
    })
  })

  describe('Intent', () => {
    it('should create a stream from article urls for each card click', done => {
      const Time = mockTimeSource()
      const dom = mockDOMSource({
        '.uk-input': {
          'change': Time.diagram('---a--a', {a: fakeProxyChangeEvent()})
        }
      })

      const intent = fixture.__get__('intent')
      const expected$ = Time.diagram('---a--a', { a: { 'proxy': 'http://proxy.url' } })

      Time.assertEqual(intent(dom).updateSetting$, expected$)
      Time.run(done)
    })

    function fakeProxyChangeEvent () {
      return {
        target: {
          name: 'proxy',
          value: 'http://proxy.url'
        }
      }
    }
  })
})
