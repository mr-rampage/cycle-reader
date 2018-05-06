export function isUrl (input) {
  const urlPattern = new RegExp('^(https?):\\/\\/[^\\s/$.?#].[^\\s]*$', 'i')
  return urlPattern.test(input)
}
