import { isEmptyNumber } from 'utils/number'
import { multiply10NthPower } from 'utils/math'

export const formEmptyNumber = (value) => (isEmptyNumber(value) ? null : value)

export const formatNumber = (value) => {
  if (isNaN(value)) {
    return ''
  }

  if (isEmptyNumber(value)) {
    return ''
  }

  return new Intl.NumberFormat().format(value)
}
export const yen = (value) => `${formatNumber(value)}円`

export const percentile = (value) =>
  String(isEmptyNumber(value) ? 0 : Math.round(multiply10NthPower(value, 2))) +
  '%'

export const presentNumber = (value) =>
  String(value > 0 ? '+' + value : '' + value)

export const leftPad = (value, pad, length) => {
  const cleanValue = String(value ?? '')

  const text = [...new Array(length)]
    .map(() => pad)
    .concat(cleanValue)
    .join('')

  return text.substring(text.length - length)
}
