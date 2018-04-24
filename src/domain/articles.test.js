import { Articles$ } from './articles'
import assert from 'assert'
import xs from 'xstream'

describe('Article$', () => {
  it('should create a list of articles ordered by date from a feed', (done) => {
    const source = xs.of([{date: new Date('2017-01-01')}, {date: new Date('2017-01-02')}])
    const expected = [{date: new Date('2017-01-02')}, {date: new Date('2017-01-01')}]

    Articles$(source)
      .addListener({
        next: list => list.forEach((actual, index) => assert.deepEqual(actual, expected[index])),
        error: () => done('Error should not be called'),
        complete: done
      })
  })
})
