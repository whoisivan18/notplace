import { Injectable } from '@nestjs/common';

export type BalanceBucket = 'AVAILABLE' | 'HELD' | 'REFUND';

export interface WalletBalance {
  available: number;
  held: number;
  refund: number;
}

@Injectable()
export class LedgerService {
  applyEntry(balance: WalletBalance, bucket: BalanceBucket, amount: number, direction: 'DEBIT' | 'CREDIT'): WalletBalance {
    const sign = direction === 'CREDIT' ? 1 : -1;
    const next = { ...balance };

    if (bucket === 'AVAILABLE') next.available += sign * amount;
    if (bucket === 'HELD') next.held += sign * amount;
    if (bucket === 'REFUND') next.refund += sign * amount;

    if (next.available < 0 || next.held < 0 || next.refund < 0) throw new Error('Negative bucket is forbidden');
    return next;
  }

  buyerCheckout(total: number) {
    const buyerFee = Math.round(total * 0.03 * 100) / 100;
    return { total, buyerFee, toEscrow: total };
  }

  sellerPayout(netEscrow: number) {
    const payoutFee = Math.round(netEscrow * 0.05 * 100) / 100;
    return { payoutFee, receive: netEscrow - payoutFee };
  }
}
