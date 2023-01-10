export const _PAYMENT_TYPE = [
      { value: 0, type: "銀行振込"},
      { value: 1, type: "クレジットカード"},
      { value: 2, type: "USDT送金"},
]

export const _PAYMENT_STATUS = [
      { value: 'Pending', color: 'warning' },
      { value: 'Paid', color: 'success' },
      { value: 'Expired', color: 'error' },
]

export const _ORDER_STATUS = [
      { value: '申請中', color: 'volcano' },
      { value: '支払い中', color: 'blue' },
      { value: '完了', color: 'cyan' },
]