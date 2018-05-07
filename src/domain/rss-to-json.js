import Parser from 'rss-parser'
import xs from 'xstream'

export function unmarshal (response) {
  return xs.fromPromise(new Parser().parseString(response.body))
    .map(extractArticles)
}

function extractArticles (feed) {
  const source = feed.title

  return feed.items.map(item => (
    {
      source,
      ...item,
      thumbnail: extractThumbnail(item['content:encoded'], item.content),
      description: enrich(item.content),
      index: new Date(item.pubDate).getTime()
    }
  ))
}

function extractThumbnail (...sources) {
  const htmlString = sources.filter(x => x)[0]
  const matches = htmlString.match(/<img .*?>/)
  return matches ? extractUrl(matches[0]) : ''
}

function extractUrl (image) {
  const matches = image.match(/src="(.*?)"/)
  return matches.length > 1 ? matches[1] : ''
}

function enrich (rawHtml) {
  const pipeline = [
    stripHtmlTags,
    stripReadMore
  ]

  return pipeline.reduce((text, enrich) => enrich(text), rawHtml)
}

function stripHtmlTags (htmlString) {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html')
  return doc.body.textContent || ''
}

function stripReadMore (content) {
  return content.replace(/Read More.../i, '')
}
