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
    const fifty = 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'

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

    it('should weight elements containing a caption class by 30 points', () => {
      const element = createElement('<div>Hello<span class="caption">Wor<span>ld</span></span></div>')
      assert.equal(30, calcWeight(rootElementWeightRules(element)))
    })

    it('should weight only child paragraphs with headers', () => {
      const element = createElement(`<div><h1></h1><h2></h2><p>${fifty}</p><p>${fifty}</p></div>`)
      assert.equal(40, calcWeight(rootElementWeightRules(element)))
    })
  })

  describe('child weights', () => {
    const calcWeight = fixture.__get__('calcWeight')
    const childElementWeightRules = fixture.__get__('childElementWeightRules')

    it('should weight elements when a contentIndicator is defined', () => {
      const element = createElement('<h3>Hello</h3>')
      assert.equal(100, calcWeight(childElementWeightRules('Hello', element)))
    })

    it('should weight h1,h2 elements by 30 points', () => {
      const element = createElement('<h1>Hello</h1><h2>World</h2>')
      assert.equal(30, calcWeight(childElementWeightRules(null, element)))
    })

    it('should weight div,p elements relative to its text length', () => {
      const element = createElement('<p>Hello</p>')
      assert.equal(0.2, calcWeight(childElementWeightRules(null, element)))
    })

    it('should weight by text content up to a min of 50 points', () => {
      const twoHundredChars = 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'
      const element = createElement(`<h3>${twoHundredChars}</h3>`)
      assert.equal(50, calcWeight(childElementWeightRules(null, element)))
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
