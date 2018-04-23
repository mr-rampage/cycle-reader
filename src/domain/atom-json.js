import * as xml2js from 'xml2js'
import xsFromCallback from 'xstream-from-callback'

const xmlParser = new xml2js.Parser({trim: false, normalize: true, mergeAttrs: true})

export function atomToJson (response) {
  return xsFromCallback(xmlParser.parseString)(response.body.body)
    .map(normalize)
}

function normalize (json) {
  const channel = head(json.rss.channel)
  return {
    ...extractFields(channel, 'title', 'description', 'link'),
    items: channel.item.map(item => extractFields(item, 'pubDate', 'title', 'description', 'content:encoded', 'link')),
    channel: head(channel)
  }
}

function extractFields (metadata, ...fields) {
  return fields
    .filter(key => isValidProperty(metadata[key]))
    .reduce((result, key) => ({...result, [key]: head(metadata[key])}), {})
}

function head (list) {
  return list[0]
}

function isValidProperty (value) {
  return Array.isArray(value) && value !== null
}
