import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { LedgerService } from './ledger.service';

@Module({ controllers: [WalletController], providers: [LedgerService], exports: [LedgerService] })
export class WalletModule {}
