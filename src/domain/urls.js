const isUrl = new RegExp('^(https?):\\/\\/[^\\s/$.?#].[^\\s]*$', 'i')

export function Url$ (string$) {
  return string$.filter(input => isUrl.test(input))
}
