export function feed (response) {
  return response.rss.channel.item.map(item => (
    {
      guid: item.guid._text,
      title: item.title._text,
      link: item.link._text,
      thumbnail: extractThumbnail(item.description._cdata),
      description: stripHtmlTags(item.description._cdata),
      date: item.pubDate._text
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
