
// Unlikely candidates
const UNLIKELY = /com(bx|ment|munity)|dis(qus|cuss)|e(xtra|[-]?mail)|foot|header|menu|re(mark|ply)|rss|sh(are|outbox)|social|twitter|facebook|sponsora(d|ll|gegate|rchive|ttachment)|(pag(er|ination))|popup|print|login|si(debar|gn|ngle)|hinweis|expla(in|nation)?|metablock/

// Most likely positive candidates
const POSITIVE = /(^(body|content|h?entry|main|page|post|text|blog|story|haupt))|arti(cle|kel)|instapaper_body/

// Most likely negative candidates
const NEGATIVE = /nav($|igation)|user|com(ment|bx)|(^com-)|contact|foot|masthead|(me(dia|ta))|outbrain|promo|related|scroll|(sho(utbox|pping))|sidebar|sponsor|tags|tool|widget|player|disclaimer|toc|infobox|vcard/

export function extractContent(document, contentIndicator) {
  if (document === null) throw 'missing document'

  // mutates document
  prepareDocument(document)

  const nodes = selectImportantNodes(document)
  let maxWeight = 0
  let bestMatch = null

  nodes.forEach(element => {
    let currentWeight = getWeight(element, contentIndicator)
  })
}

function prepareDocument (document) {
  const elementsToRemove = ['select', 'option', 'script', 'noscript', 'style']
  document.querySelectorAll(elementsToRemove.join(', '))
    .forEach(element => element.remove())
}

function selectImportantNodes(document) {
  const likelyNodes = ['p', 'div', 'td', 'h1', 'h2', 'article', 'section']
  return document.querySelectorAll(likelyNodes.join(', '))
}

function getWeight(element, contentIndicator) {
  let weight = calcWeight(element)
  weight += Math.round(ownTextWeight(element) / 100 * 10)
  // weight += weightChildNodes(element, contentIndicator)
  return weight
}

function regexRule (element, regex, property) {
  return !!element[property] && regex.test(element[property])
}

function isJoomla (element) {
  return element.attributes['articleBody']
}

function isHidden (element) {
  const style = element.style

  return (/hidden/.test(style.visibility) ||
    /none/.test(style.display) ||
    /small/.test(style['font-size']))
}

function calcWeight (element) {
  const elementTest = regexRule.bind(null, element)

  const calculation = [
    [elementTest.bind(null, POSITIVE, 'className'), 35],
    [elementTest.bind(null, POSITIVE, 'id'), 40],
    [elementTest.bind(null, UNLIKELY, 'className'), -20],
    [elementTest.bind(null, UNLIKELY, 'id'), -20],
    [elementTest.bind(null, NEGATIVE, 'className'), -50],
    [elementTest.bind(null, NEGATIVE, 'id'), -50],
    [isJoomla.bind(null, element), 200],
    [isHidden.bind(null, element), -50]
  ]

  return calculation
    .reduce((total, [rule, weight]) => total + (rule() ? weight : 0), 0)
}

function ownTextWeight (element) {
  return Array.from(element.children)
    .reduce((weight, child) => weight - child.textContent.length, element.textContent.length)
}
