export const createDict = (items, keyPropName = 'id') =>
  items.reduce((dict, item) => {
    return Object.assign(
      dict,
      typeof item === 'object'
        ? { [item[keyPropName]]: item }
        : { [item]: item }
    )
  }, {})

export const groupBy = (items, groupingKey) =>
  items.reduce((group, item) => {
    const key = item[groupingKey]

    if (!group[key]) {
      group[key] = []
    }

    group[key].push(item)

    return group
  }, {})

export const createOptions = (items) =>
  items.map(({ id, name }) => ({
    value: id,
    label: name,
  }))

export const createCodeOptions = (items) =>
  items.map(({ id, code }) => ({
    value: id,
    label: code,
  }))

export const createCodeNameOptions = (items) =>
  items.map(({ id, code, name }) => ({
    value: id,
    label: `${code} ${name}`,
  }))

export const range = (start, end, step = 1) => {
  const range = []

  for (let i = start; i < end; i += step) {
    range.push(i)
  }

  return range
}

export const transpose = (array) =>
  array[0].map((_, colIndex) => array.map((row) => row[colIndex]))

/**
 *
 * @param {Array} array
 * @returns {Array}
 */
export const flatten = (array) =>
  array.reduce(
    (sqeezed, element) =>
      sqeezed.concat(Array.isArray(element) ? flatten(element) : element),
    []
  )

export const unwrap = (array) => (Array.isArray(array) ? array[0] : array)
