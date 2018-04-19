import * as xml2js from 'xml2js'
import xsFromCallback from 'xstream-from-callback'

const xmlParser = new xml2js.Parser({trim: false, normalize: true, mergeAttrs: true})

export function atomToJson (response) {
  return xsFromCallback(xmlParser.parseString)(response.body.body)
    .map(normalize)
}

function normalize (json) {
  var channel = json.rss.channel
  var rss = { items: [] }

  if (Array.isArray(json.rss.channel))
    channel = json.rss.channel[0]

  if (channel.title) {
    rss.title = channel.title[0]
  }
  if (channel.description) {
    rss.description = channel.description[0]
  }
  if (channel.link) {
    rss.url = channel.link[0]
  }

  // add rss.image via @dubyajaysmith
  if (channel.image) {
    rss.image = channel.image[0].url
  }

  rss.image = rss.image && Array.isArray(rss.image) ? rss.image[0] : ''

  if (channel.item) {
    if (!Array.isArray(channel.item)) {
      channel.item = [channel.item]
    }
    channel.item.forEach(function (val) {
      var obj = {}
      obj.title = !isNullOrUndefined(val.title) ? val.title[0] : ''
      obj.description = !isNullOrUndefined(val.description) ? val.description[0] : ''
      obj.url = obj.link = !isNullOrUndefined(val.link) ? val.link[0] : ''

      if (val.pubDate) {
        //lets try basis js date parsing for now
        obj.created = Date.parse(val.pubDate[0])
      }
      if (val['media:content']) {
        obj.media = val.media || {}
        obj.media.content = val['media:content']
      }
      if (val['media:thumbnail']) {
        obj.media = val.media || {}
        obj.media.thumbnail = val['media:thumbnail']
      }
      if (val.enclosure) {
        obj.enclosures = []
        if (!Array.isArray(val.enclosure)) {
          val.enclosure = [val.enclosure]
        }
        val.enclosure.forEach(function (enclosure) {
          var enc = {}
          for (var x in enclosure) {
            enc[x] = enclosure[x][0]
          }
          obj.enclosures.push(enc)
        })

      }
      rss.items.push(obj)

    })

  }
  return rss
}

function isNullOrUndefined (value) {
  return value === null || value === undefined
}
