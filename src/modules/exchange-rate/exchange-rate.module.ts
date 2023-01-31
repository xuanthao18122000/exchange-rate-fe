import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateController } from './exchange-rate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRate } from '../../database/entities/exchange-rate.entity';
import { Account } from '../../database/entities/account.entity';
import { TopHighlight } from '../../database/entities/top-highlight.entity';
import { TopCryptoSpot } from '../../database/entities/top-crypto-spot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExchangeRate,
      TopHighlight,
      TopCryptoSpot,
      Account,
    ]),
  ],
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService],
  exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
