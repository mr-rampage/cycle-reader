
export function extractContent (document, contentIndicator) {
  if (document === null) throw new Error('missing document')

  // do I even need to strip elements?
  const stripped = stripElements(document, 'select', 'option', 'script', 'noscript', 'style')
  console.log(stripped)
  const importantElements = selectElements(stripped, 'p', 'div', 'td', 'h1', 'h2', 'article', 'section')

  const bestMatchTuple = Array.from(importantElements)
    .reduce(findBestMatch.bind(null, contentIndicator), [null, 0])

  return bestMatchTuple[0]
}

function findThumbnail (document) {
  const thumbnail = document.querySelector('meta[property="og:image"]')
  return thumbnail ? thumbnail.attributes['content'] : ''
}

function findBestMatch (contentIndicator, [bestMatch, maxWeight], element) {
  let currentWeight = getWeight(element, contentIndicator)
  if (currentWeight > maxWeight && maxWeight < 300) {
    return [element, currentWeight]
  } else {
    return [bestMatch, maxWeight]
  }
}

function stripElements (document, ...elementsToRemove) {
  const stripped = document.cloneNode(true)

  stripped.querySelectorAll(elementsToRemove.join(', '))
    .forEach(element => element.remove())

  return stripped
}

function selectElements (document, ...likelyNodes) {
  return document.querySelectorAll(likelyNodes.join(', '))
}

function getWeight (element, contentIndicator) {
  let weight = calcWeight(rootElementWeightRules(element))
  weight += Math.round(ownTextWeight(element) / 100 * 10)
  weight += calcChildWeight(element, contentIndicator)
  return weight
}

function isJoomla (element) {
  return element.attributes['articleBody'] !== undefined
}

function isHidden (element) {
  const style = element.style

  return (/hidden/.test(style.visibility) ||
    /none/.test(style.display) ||
    /small/.test(style['font-size']))
}

function calcWeight (weightRules) {
  return weightRules
    .reduce((total, [rule, weight]) => total + (rule() ? weight : 0), 0)
}

function ownTextWeight (element) {
  return Array.from(element.children)
    .reduce((weight, child) => weight - child.textContent.length, element.textContent.length)
}

function rootElementWeightRules (element) {
  // Unlikely candidates
  const UNLIKELY = /com(bx|ment|munity)|dis(qus|cuss)|e(xtra|[-]?mail)|foot|header|menu|re(mark|ply)|rss|sh(are|outbox)|social|twitter|facebook|sponsora(d|ll|gegate|rchive|ttachment)|(pag(er|ination))|popup|print|login|si(debar|gn|ngle)|hinweis|expla(in|nation)?|metablock/

  // Most likely positive candidates
  const POSITIVE = /(^(body|content|h?entry|main|page|post|text|blog|story|haupt))|arti(cle|kel)|instapaper_body/

  // Most likely negative candidates
  const NEGATIVE = /nav($|igation)|user|com(ment|bx)|(^com-)|contact|foot|masthead|(me(dia|ta))|outbrain|promo|related|scroll|(sho(utbox|pping))|sidebar|sponsor|tags|tool|widget|player|disclaimer|toc|infobox|vcard/

  return [
    [() => POSITIVE.test(element.className), 35],
    [() => POSITIVE.test(element.id), 40],
    [() => UNLIKELY.test(element.className), -20],
    [() => UNLIKELY.test(element.id), -20],
    [() => NEGATIVE.test(element.className), -50],
    [() => NEGATIVE.test(element.id), -50],
    [isJoomla.bind(null, element), 200],
    [isHidden.bind(null, element), -50]
  ]
}

function calcChildWeight (element, contentIndicator) {
  return Array.from(element.children)
    .map(calcChild.bind(null, contentIndicator))
    .reduce((total, weight) => total + weight, 0) +
    addCaptionWeight(element) +
    addHeaderWeight(element)
}

function calcChild (contentIndicator, element) {
  if (element.textContent.length < 20) {
    return 0
  } else {
    return calcWeight(childElementWeightRules(element, contentIndicator))
  }
}

function childElementWeightRules (element, contentIndicator) {
  return [
    [() => !!contentIndicator && element.textContent.indexOf(contentIndicator) > -1, 100],
    [() => ownTextWeight(element) > 200, Math.max(50, ownTextWeight(element) / 10)],
    [() => /h1|h2/i.test(element.tagName), 30],
    [() => /div|p/i.test(element.tagName), ownTextWeight(element) / 25]
  ]
}

function addCaptionWeight (element) {
  return element.querySelector('.caption') ? 30 : 0
}

function addHeaderWeight (element) {
  const subHeader = 'h1, h2, h3, h4, h5, h6'
  return Array.from(element.children)
    .filter(element => /p/i.test(element.tagName) && element.textContent.length > 50)
    .filter(paragraph => paragraph.querySelector(subHeader) !== null)
    .reduce((weight) => weight + 20, 0)
}
