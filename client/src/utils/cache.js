export const KEY_ACCOUNT_LINE_CHART = 'accontLineChart'
export const KEY_ACCONT_RANK = 'accontRank'

export default {
  cache: {},

  set(key, value, keepSeconds = 1800) {
    if (!keepSeconds || keepSeconds <= 0) {
      return this
    }

    this.cache[key] = value

    setTimeout(() => {
      delete this.cache[key]
    }, keepSeconds * 1000)

    return this
  },

  get(key) {
    return this.cache[key]
  },

  async wrap(key, process, keepSeconds = 1800) {
    const cached = this.get(key)

    if (cached !== undefined) {
      return cached
    }

    const newValue = await process()

    this.set(key, newValue, keepSeconds)

    return this.get(key)
  },
}
