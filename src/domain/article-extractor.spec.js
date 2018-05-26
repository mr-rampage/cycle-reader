import assert from 'assert'
import rewire from 'rewire'
import { extractContent } from './article-extractor'
import { JSDOM } from 'jsdom'

describe('Article extractor', () => {
  const fixture = rewire('./article-extractor.js')
  it('should throw exception on falsy documents', () => {
    assert.throws(() => extractContent(null))
  })

  describe('Calculate weighting', () => {
    const calcWeight = fixture.__get__('calcWeight')
    const rootElementWeightRules = fixture.__get__('rootElementWeightRules')

    it('should weight POSITIVE class names by 35 points', () => {
      const element = createElement('<div class="body"></div>')
      assert.equal(35, calcWeight(rootElementWeightRules(element)))
    })

    it('should weight POSITIVE ids by 40 points', () => {
      const element = createElement('<div id="body"></div>')
      assert.equal(40, calcWeight(rootElementWeightRules(element)))
    })

    it('should weight JOOMLA elements by 200 points', () => {
      const element = createElement('<div articleBody></div>')
      assert.equal(200, calcWeight(rootElementWeightRules(element)))
    })

    it('should weight UNLIKELY class names by -20 points', () => {
      const element = createElement('<div class="discuss"></div>')
      assert.equal(-20, calcWeight(rootElementWeightRules(element)))
    })

    it('should weight UNLIKELY ids by -20 points', () => {
      const element = createElement('<div id="discuss"></div>')
      assert.equal(-20, calcWeight(rootElementWeightRules(element)))
    })

    it('should weight NEGATIVE class names by -50 points', () => {
      const element = createElement('<div class="nav"></div>')
      assert.equal(-50, calcWeight(rootElementWeightRules(element)))
    })

    it('should weight NEGATIVE ids by -50 points', () => {
      const element = createElement('<div id="nav"></div>')
      assert.equal(-50, calcWeight(rootElementWeightRules(element)))
    })

    it('should weight hidden elements by -50 points', () => {
      const element = createElement('<div style="display: none"></div>')
      assert.equal(-50, calcWeight(rootElementWeightRules(element)))
    })
  })

  describe('ownText', () => {
    const ownTextWeight = fixture.__get__('ownTextWeight')

    it('should get the child text nodes only', () => {
      const element = createElement('<div>Hello<span>Wor<span>ld</span></span></div>')
      assert.equal(5, ownTextWeight(element))
    })
  })
})

function createElement (html) {
  const dom = new JSDOM(`<!DOCTYPE html><div>${html}</div>`)
  const element = dom.window.document.querySelector('div')
  return element.firstChild
}
