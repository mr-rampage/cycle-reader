import { mockTimeSource } from '@cycle/time'
import rewire from 'rewire'

describe('Article Service', () => {
  const fixture = rewire('./article-service.js')

  it('should return a stream of reduced uri\'s', done => {
    const Time = mockTimeSource()
    const actions = Time.diagram('--a-a', {a: {}})
    const model = fixture.__get__('model')
    const expected$ = Time.diagram('--a-a', {a: 'articleReducer'})

    Time.assertEqual(model(actions).map(fn => fn.name), expected$)
    Time.run(done)
  })
})
