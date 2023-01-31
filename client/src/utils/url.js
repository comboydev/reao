import decamelize from 'decamelize'

export const route = (template, params) =>
  '/' +
  Object.keys(params).reduce(
    (url, key) => url.replace(`{${decamelize(key)}}`, params[key]),
    template
  )
