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
import { AdvertisementService } from './advertisement.service';
import { SendResponse } from '../../utils/send-response';
import { JwtAuthGuard } from '../../guard/jwt.guard';
import { Auth } from 'src/decorators/auth.decorator';
import code from '../../configs/code';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Cron } from '@nestjs/schedule';
import { LessThan } from 'typeorm';
import { Account } from '../../database/entities/account.entity';

@ApiTags('advertisement')
@Controller()
export class AdvertisementController {
  constructor(
    private readonly advertisementServiceRepo: AdvertisementService,
  ) {}

  @Cron('* * * * *')
  // @UseGuards(JwtAuthGuard)
  // @Auth({ roles: ['ADMIN'] })
  @ApiBearerAuth()
  async crawlCoin() {
    try {
      const crawl = this.advertisementServiceRepo.crawlAdvertisement();
      return SendResponse.success([], 'Logout user successful!');
    } catch (err) {
      console.log(err);
    }
  }

  @Get('list')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async listAdvertisement(@Query() query) {
    try {
      const result = await this.advertisementServiceRepo.listAdv(query);
      return SendResponse.success(result, 'Get list advertisement success!');
    } catch (err) {
      return SendResponse.error(err);
    }
  }
}
