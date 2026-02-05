export enum OrderStatus {
  CREATED = 'CREATED',
  PAID_WAITING_BUYER_DATA = 'PAID_WAITING_BUYER_DATA',
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED_PENDING_CONFIRMATION = 'DELIVERED_PENDING_CONFIRMATION',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  DISPUTED = 'DISPUTED',
  REFUNDED = 'REFUNDED',
}

export function transitionOrderStatus(current: OrderStatus, event: string): OrderStatus {
  const transitions: Record<OrderStatus, Record<string, OrderStatus>> = {
    [OrderStatus.CREATED]: { PAY: OrderStatus.PAID_WAITING_BUYER_DATA, CANCEL: OrderStatus.CANCELLED },
    [OrderStatus.PAID_WAITING_BUYER_DATA]: { BUYER_DATA_SUBMITTED: OrderStatus.IN_PROGRESS, TIMEOUT_5M: OrderStatus.CANCELLED },
    [OrderStatus.IN_PROGRESS]: { SELLER_DELIVERED: OrderStatus.DELIVERED_PENDING_CONFIRMATION, DISPUTE: OrderStatus.DISPUTED, TIMEOUT_7D: OrderStatus.CANCELLED },
    [OrderStatus.DELIVERED_PENDING_CONFIRMATION]: { BUYER_CONFIRMED: OrderStatus.COMPLETED, TIMEOUT_2H: OrderStatus.COMPLETED, DISPUTE: OrderStatus.DISPUTED },
    [OrderStatus.DISPUTED]: { RESOLVE_BUYER_REFUND: OrderStatus.REFUNDED, RESOLVE_SELLER_WIN: OrderStatus.COMPLETED },
    [OrderStatus.COMPLETED]: {},
    [OrderStatus.CANCELLED]: {},
    [OrderStatus.REFUNDED]: {},
  };

  const next = transitions[current]?.[event];
  if (!next) throw new Error(`Invalid transition ${current} -> ${event}`);
  return next;
}
