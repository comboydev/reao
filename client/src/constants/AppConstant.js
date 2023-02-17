export const PaymentTypeKv = [
	{ value: 0, label: "銀行振込" },
	{ value: 1, label: "クレジットカード" },
	{ value: 2, label: "USDT送金" },
]

export const PaymentStatusKv = [
	{ label: 'Pending', color: 'warning' },
	{ label: 'Paid', color: 'success' },
	{ label: 'Expired', color: 'error' },
]

export const OrderStatusKv = [
	{ label: '申請中', color: 'volcano' },
	{ label: '支払い中', color: 'blue' },
	{ label: '完了', color: 'cyan' },
]

export const SOLD_STATUS = [
	{ label: '販売中', color: 'volcano' },
	{ label: '販売完了', color: 'cyan' },
]