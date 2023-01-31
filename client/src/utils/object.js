import decamelize from 'decamelize'
import camelcase from './camelcase'

const objectKeyProcessor = (strategy, params, depth = 10, count = 0) => {
  if (count > depth) {
    return params
  }

  if (!isObject(params)) {
    return params
  }

  return Object.keys(params).reduce((processed, key) => {
    let value

    if (isObject(params[key])) {
      value = objectKeyProcessor(strategy, params[key], depth, count + 1)
    } else if (Array.isArray(params[key])) {
      value = params[key].map((value) =>
        isObject(value)
          ? objectKeyProcessor(strategy, value, depth, count + 1)
          : value
      )
    } else {
      value = params[key]
    }

    return {
      ...processed,
      [strategy(key)]: value,
    }
  }, {})
}

export const decamelizeKeys = (params, depth = 10) =>
  objectKeyProcessor(decamelize, params, depth)

export const camelizeKeys = (params, depth = 10) =>
  objectKeyProcessor(camelcase, params, depth)

export const arr2Kv = (srcArray, options = {}) => {
  const { valueName = 'value', keyName = 'key' } = options

  return srcArray.reduce(
    (kv, item) => ({
      ...kv,
      [camelcase(item[keyName])]: item[valueName],
    }),
    {}
  )
}

export const isObject = (value) =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * @param {Object} object1
 * @param {Object} object2
 *
 * @returns {Object}
 */
export const assign = (object1, object2) => {
  Object.keys(object1).forEach((key) => {
    object1[key] = object2[key]
  })

  return object1
}

export const empty = (object) => !object || Object.keys(object).length === 0
