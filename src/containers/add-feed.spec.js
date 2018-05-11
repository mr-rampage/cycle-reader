import xs from 'xstream'
import test from 'ava'
import { mockDOMSource } from '@cycle/dom'
import { mockTimeSource } from '@cycle/time'
import AddFeed from './add-feed'
import rewire from 'rewire'

test.beforeEach(t => {
  t.context.module = rewire('./add-feed')
})

test.cb('onion has a defaultReducer and uriReducer', t => {
  const Time = mockTimeSource()
  const reducer$ = AddFeed(fakeSources(Time))
  const expected$ = Time.diagram('a--b', {a: 'defaultReducer', b: 'uriReducer'})
  Time.assertEqual(reducer$.onion.map(reducer => reducer.name), expected$)
  Time.run(t.end)
})

test.cb('onion state should contain the search input upon submit', t => {
  const Time = mockTimeSource()
  const reducer$ = AddFeed(fakeSources(Time))
  const prevStates = [null, {uri: 'foo', articles: [1, 2, 3]}]

  const expected$ = Time.diagram('a--b', {a: {uri: '', articles: []}, b: {uri: 'http://www.feed.com/rss', articles: [1, 2, 3]}})
  Time.assertEqual(reducer$.onion.map(reducer => reducer(prevStates.shift())), expected$)
  Time.run(t.end)
})

test('defaultReducer should take the previous state', t => {
  const defaultReducer = t.context.module.__get__('defaultReducer')
  const prevState = {}
  t.true(defaultReducer(prevState) === prevState)
})

test('defaultReducer should provide a default state', t => {
  const defaultReducer = t.context.module.__get__('defaultReducer')
  t.deepEqual(defaultReducer(), {uri: '', articles: []})
})

test('uriReducer should only update the uri property', t => {
  const uriReducer = t.context.module.__get__('uriReducer')
  const prevState = {uri: 'foo', articles: [1, 2, 3]}
  t.deepEqual(uriReducer('bar')(prevState), {uri: 'bar', articles: [1, 2, 3]})
})

function fakeSources (Time) {
  return {
    DOM: mockDOMSource({
      '.uk-search': {
        'submit': Time.diagram('---x')
      },
      '.uk-search-input': {
        'input': Time.diagram('e---', {e: {target: {value: 'http://www.feed.com/rss'}}})
      }
    }),
    onion: {
      state$: xs.create()
    }
  }
}
