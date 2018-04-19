export function articles (feed) {
  const source = feed.title

  return feed.items.map(item => (
    {
      source,
      ...item,
      thumbnail: extractThumbnail(item.description),
      description: enrich(item.description),
      created: new Date(item.pubDate).toISOString()
    }
  ))
}

function extractThumbnail (htmlString) {
  const matches = htmlString.match(/<img .*?>/)
  return matches ? matches[0] : ''
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
