import xs from 'xstream'
import test from 'ava'
import { mockDOMSource } from '@cycle/dom'
import { mockTimeSource } from '@cycle/time'
import AddFeed from './add-feed'

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
