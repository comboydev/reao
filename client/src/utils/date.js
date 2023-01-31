import moment from 'moment'

export const between = (target, [from, to]) =>
  moment(target).diff(from) >= 0 && moment(target).diff(to) <= 0

export const computeAge = (date, basisDate = moment()) => {
  const totalMonths = moment(basisDate).diff(date, 'month')
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  return { years, months }
}

export const formatAge = ({ years, months }) => `${years}年${months}ヶ月`

export const computeFormattedAge = (date, basisDate = moment()) =>
  formatAge(computeAge(date, basisDate))
