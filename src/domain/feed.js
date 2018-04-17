export function feed (response) {
  const source = response.rss.channel.title

  return response.rss.channel.item.map(item => (
    {
      source: source._text,
      guid: item.guid._text,
      title: item.title._text,
      link: item.link._text,
      thumbnail: extractThumbnail(getDescription(item)),
      description: stripHtmlTags(item.description._cdata),
      date: new Date(item.pubDate._text).toISOString()
    }
  ))
}

function extractThumbnail (htmlString) {
  const matches = htmlString.match(/<img .*?>/)
  return matches ? matches[0] : ''
}

function stripHtmlTags (htmlString) {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html')
  return doc.body.textContent || ''
}

function getDescription (item) {
  return (item['content:encoded'] || item.description)._cdata
}
