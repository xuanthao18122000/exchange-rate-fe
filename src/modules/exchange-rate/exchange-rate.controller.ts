import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { SendResponse } from '../../utils/send-response';
import { JwtAuthGuard } from '../../guard/jwt.guard';
import { Auth } from 'src/decorators/auth.decorator';
import code from '../../configs/code';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Cron } from '@nestjs/schedule';
import { LessThan } from 'typeorm';
import { Account } from '../../database/entities/account.entity';

@ApiTags('exchange-rate')
@Controller()
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Get('crawlCoin')
  @UseGuards(JwtAuthGuard)
  @Auth({ roles: ['ADMIN'] })
  @ApiBearerAuth()
  async crawlCoin() {
    try {
      const crawl = await this.exchangeRateService.crawlTopCryptocurrencySpot();
      return SendResponse.success([], 'Logout user successful!');
    } catch (err) {
      console.log(err);
    }
  }

  // @Cron('01 * * * * *')
  @Cron('* * * * *')
  async cronCoin() {
    console.log('crawl');
    try {
      const crawl = this.exchangeRateService.crawlCoin();
      return SendResponse.success([], 'Logout user successful!');
    } catch (err) {
      console.log(err);
    }
  }

  @Cron('* * * * *')
  async cronTopSpot() {
    console.log('Crawl listTopCryptoSpot');
    try {
      const crawl = this.exchangeRateService.crawlTopCryptocurrencySpot();
      return SendResponse.success([], 'Logout user successful!');
    } catch (err) {
      console.log(err);
    }
  }

  @Get('list')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async listExchangeRate(@Query() query) {
    try {
      const result = await this.exchangeRateService.listExchangeRate(query);
      return SendResponse.success(result, 'Get list server success!');
    } catch (err) {
      return SendResponse.error(err);
    }
  }

  @Get('top-crypto-spot/list')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async listTopCryptoSpot(@Query() query) {
    try {
      const result = await this.exchangeRateService.listTopCryptoSpot(query);
      return SendResponse.success(result, 'Get list server success!');
    } catch (err) {
      return SendResponse.error(err);
    }
  }
}
