import test from 'ava'
import { mockDOMSource } from '@cycle/dom'
import { mockTimeSource } from '@cycle/time'
import { defaultReducer, intent, model, uriReducer } from './add-feed'

test.cb('DOM actions to produce actions', t => {
  const Time = mockTimeSource()

  const actions = intent(mockDOMSource({
    '.uk-search': {
      'submit': Time.diagram('--x|')
    },
    '.uk-search-input': {
      'input': Time.diagram('e--|', { e: { target: { value: 'http://www.feed.com/rss' } } })
    }
  }))

  const expected$ = Time.diagram('--x|', {x: 'http://www.feed.com/rss'})

  Time.assertEqual(actions.addFeed$, expected$)
  Time.run(t.end)
})

test.cb('reducer should filter urls', t => {
  const Time = mockTimeSource()

  const reducer$ = model({
    addFeed$: Time.diagram('--a--b--|', {a: 'invalid', b: 'http://www.feed.com/rss'})
  })
  const expected$ = Time.diagram('a----b--|', {a: defaultReducer, b: uriReducer('http://www.feed.com/rss')})

  Time.assertEqual(reducer$, expected$, sameSource)
  Time.run(t.end)

  function sameSource (actual, expected) {
    return JSON.stringify(actual) === JSON.stringify(expected)
  }
})

test('default reducer should take the parent state', t => {
  const parentState = {}
  t.is(defaultReducer(parentState), parentState)
})

test('default reducer should provide a default state', t => {
  t.deepEqual(defaultReducer(), {uri: '', articles: []})
})

test('uriReducer should merge the uri into the previous state', t => {
  const reducer = uriReducer('new')
  const prevState = {uri: 'previous', articles: [1, 2, 3]}
  t.deepEqual(reducer(prevState), {uri: 'new', articles: [1, 2, 3]})
})
