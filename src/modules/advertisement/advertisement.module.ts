import { Module } from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementController } from './advertisement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRate } from '../../database/entities/exchange-rate.entity';
import { Account } from '../../database/entities/account.entity';
import { TopHighlight } from '../../database/entities/top-highlight.entity';
import { Advertisement } from '../../database/entities/advertisement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExchangeRate,
      TopHighlight,
      Account,
      Advertisement,
    ]),
  ],
  controllers: [AdvertisementController],
  providers: [AdvertisementService],
  exports: [AdvertisementService],
})
export class AdvertisementModule {}
