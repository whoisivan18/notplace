import { describe, expect, it } from 'vitest';
import { LedgerService } from '../src/wallet/ledger.service';

describe('Ledger', () => {
  const ledger = new LedgerService();

  it('calculates buyer fee and payout fee', () => {
    expect(ledger.buyerCheckout(1000).buyerFee).toBe(30);
    expect(ledger.sellerPayout(1000).receive).toBe(950);
  });

  it('forbids negative balances', () => {
    expect(() => ledger.applyEntry({ available: 0, held: 0, refund: 0 }, 'AVAILABLE', 1, 'DEBIT')).toThrow();
  });
});
