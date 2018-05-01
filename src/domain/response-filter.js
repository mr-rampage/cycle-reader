export function byCategory (category, response) {
  return response.request && response.request.category === category
}
