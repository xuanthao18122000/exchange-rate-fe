import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database.module';
import { RouterModule } from '@nestjs/core';
import { Routes } from './routes/route';
import { UserModule } from './modules/user/user.module';
import { ExchangeRateModule } from './modules/exchange-rate/exchange-rate.module';
import { AdvertisementModule } from './modules/advertisement/advertisement.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.register(Routes),
    DatabaseModule,
    AuthModule,
    UserModule,
    ExchangeRateModule,
    AdvertisementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
