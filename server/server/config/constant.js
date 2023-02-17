export const Role = {
      user: 'user',
      admin: 'admin',
}

export const IdentityStatus = {
      default: -1,
      applying: 0,
      verified: 1
};

export const OrderStatus = {
      applying: 0,
      paying: 1,
      complete: 2
}

export const PaymentType = {
      bank: 0,
      card: 1,
      crypto: 2
}

export const PaymentStatus = {
      pending: 0,
      paid: 1,
      expired: 2
}