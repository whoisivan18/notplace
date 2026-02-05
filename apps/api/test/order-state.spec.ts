import { describe, expect, it } from 'vitest';
import { OrderStatus, transitionOrderStatus } from '../src/orders/order-state';

describe('Order state machine', () => {
  it('handles happy path with auto confirm', () => {
    let state = OrderStatus.CREATED;
    state = transitionOrderStatus(state, 'PAY');
    state = transitionOrderStatus(state, 'BUYER_DATA_SUBMITTED');
    state = transitionOrderStatus(state, 'SELLER_DELIVERED');
    state = transitionOrderStatus(state, 'TIMEOUT_2H');
    expect(state).toBe(OrderStatus.COMPLETED);
  });

  it('throws on invalid transition', () => {
    expect(() => transitionOrderStatus(OrderStatus.CREATED, 'SELLER_DELIVERED')).toThrow();
  });
});
