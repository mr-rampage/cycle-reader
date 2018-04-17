import { xml2js } from 'xml-js'

const XML2JS_CONFIG = {compact: true, ignoreAttributes: true, ignoreDeclaration: true, ignoreDoctype: true}

export function xmlResponseAdapter (response) {
  return xml2js(JSON.parse(response.text).body, XML2JS_CONFIG)
}
