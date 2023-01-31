import { Injectable } from '@nestjs/common';
import code from '../../configs/code';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeRate } from '../../database/entities/exchange-rate.entity';
import { TopHighlight } from '../../database/entities/top-highlight.entity';
import { TopCryptoSpot } from '../../database/entities/top-crypto-spot.entity';
import { Column, IsNull, Like, Not, Repository } from 'typeorm';
import * as cheerio from 'cheerio';
import axios from 'axios';

@Injectable()
export class ExchangeRateService {
  constructor(
    @InjectRepository(ExchangeRate)
    private readonly exchangeRateRepo: Repository<ExchangeRate>,
    @InjectRepository(TopHighlight)
    private readonly topHighlightEntity: Repository<TopHighlight>,
    @InjectRepository(TopCryptoSpot)
    private readonly topCryptoSpot: Repository<TopCryptoSpot>,
  ) {}

  async listExchangeRate(query) {
    try {
      // eslint-disable-next-line prefer-const
      let { keyword, page, perPage, sort } = query;

      if (!page) {
        page = 1;
      }
      if (!perPage) {
        perPage = 10;
      }
      const exchangeRate = await this.exchangeRateRepo.findAndCount({
        skip: (page - 1) * perPage,
        take: perPage,
        order: { id: sort as SORT },
        where: [
          {
            name: keyword ? Like(`%${keyword}%`) : Not(IsNull()),
          },
        ],
      });
      return {
        list: exchangeRate[0],
        total: exchangeRate[1],
        perPage: parseInt(perPage),
        current_page: parseInt(page),
      };
    } catch (e) {
      throw e;
    }
  }

  async listTopCryptoSpot(query) {
    try {
      // eslint-disable-next-line prefer-const
      let { keyword, page, perPage, sort } = query;

      if (!page) {
        page = 1;
      }
      if (!perPage) {
        perPage = 10;
      }
      const exchangeRate = await this.topCryptoSpot.findAndCount({
        skip: (page - 1) * perPage,
        take: perPage,
        order: { id: sort as SORT },
        where: [
          {
            name: keyword ? Like(`%${keyword}%`) : Not(IsNull()),
          },
        ],
      });
      return {
        list: exchangeRate[0],
        total: exchangeRate[1],
        perPage: parseInt(perPage),
        current_page: parseInt(page),
      };
    } catch (e) {
      throw e;
    }
  }

  async crawlCoin() {
    try {
      const url = 'https://coinmarketcap.com/';
      const { data } = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 Edg/103.0.1264.77',
          'X-Requested-With': 'XMLHttpRequest',
          Host: 'coinmarketcap.com',
        },
      });
      const $ = cheerio.load(data);
      const list_coin = [];
      $('.cmc-table > tbody > tr ').each((index, element) => {
        if (index < 10) {
          // const swap_name = $(element).find('th > span.style25').text();
          let logo = $(element).find('.dWpTPk').html();
          const name = $(element).find('.ePTNty').text();
          const price = $(element).find('.hEduBL').text();
          let oneHour = $(element).find('.cYiHal').text();
          const indexOneHour = oneHour.indexOf('%');
          oneHour = oneHour.slice(0, indexOneHour + 1);
          let oneDay = $(element).find('.bQjSqS').text();
          const indexOneDay = oneDay.indexOf('%');
          oneDay = oneDay.slice(0, indexOneDay + 1);
          let oneWeek = $(element).find('.cYiHal').text();
          const indexOneWeek = oneWeek.lastIndexOf('%');
          oneWeek = oneWeek.slice(indexOneWeek - 4);
          const market_cap = $(element).find('.hHzHwP').text();
          let volume_24h = $(element).find('.gLNGkf').text();
          const indexVolume = volume_24h.lastIndexOf('$');
          volume_24h = volume_24h.slice(indexVolume);
          const circulating_supply = $(element).find('.izpQLd').text();
          let last_7days = $(element).find('td:nth-child(11)').html();
          logo = this.getUrlImage(logo);
          last_7days = this.getUrlImage(last_7days);
          list_coin.push({
            logo,
            name,
            price,
            oneHour,
            oneDay,
            oneWeek,
            market_cap,
            volume_24h,
            circulating_supply,
            last_7days,
          });
        }
      });
      const checkER = await this.exchangeRateRepo.find();
      if (checkER) {
        await this.exchangeRateRepo.clear();
      }
      const insertER = await this.exchangeRateRepo
        .createQueryBuilder()
        .insert()
        .into(ExchangeRate)
        .values(list_coin)
        .execute();

      return insertER;
    } catch (err) {
      console.log(err);
      console.log('Crawl failed');
    }
  }

  async crawlTopCryptocurrencySpot() {
    try {
      const url = 'https://coinmarketcap.com/rankings/exchanges/';
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const list_coin = [];
      // console.log($.html());
      $('.cmc-table > tbody > tr ').each((index, element) => {
        if (index < 10) {
          const name = $(element).find('td:nth-child(2)').text();
          let logoCoin = $(element).find('td:nth-child(2)').html();
          logoCoin = this.getUrlImage(logoCoin);
          const score = $(element).find('.score-label').text();
          let traddingVoLumn24h = $(element).find('td:nth-child(4)').text();
          const percent = $(element).find('td:nth-child(4) > div > p').text();
          traddingVoLumn24h = traddingVoLumn24h.split(percent)[0];
          const avgLiquidity = $(element).find('td:nth-child(5)').text();
          const weeklyVisits = $(element).find('td:nth-child(6)').text();
          const markets = $(element).find('td:nth-child(7)').text();
          const coins = $(element).find('td:nth-child(8)').text();
          const fiatSupported = $(element)
            .find('td:nth-child(9) > div > p')
            .text();
          const fiatMore = $(element)
            .find('td:nth-child(9) > div > div > div > p')
            .text();
          let volumeGraph7d = $(element).find('td:nth-child(10)').html();
          volumeGraph7d = this.getUrlImage(volumeGraph7d);
          list_coin.push({
            name: name,
            logo_coin: logoCoin,
            score: score,
            tradding_voLumn24h: traddingVoLumn24h,
            percent: percent,
            avg_liquidity: avgLiquidity,
            weekly_visits: weeklyVisits,
            markets: markets,
            coins: coins,
            fiat_supported: fiatSupported,
            fiat_more: fiatMore,
            volume_graph7d: volumeGraph7d,
          });
        }
      });
      const checkER = await this.topCryptoSpot.find();
      await this.topCryptoSpot.clear();
      const insertER = await this.topCryptoSpot
        .createQueryBuilder()
        .insert()
        .into(TopCryptoSpot)
        .values(list_coin)
        .execute();

      return insertER;
    } catch (err) {
      console.log(err);
      console.log('Crawl failed');
    }
  }

  sliceStringHours(string) {
    const indexVolume = string.lastIndexOf('$');
    string = string.slice(indexVolume);
    return string;
  }

  getUrlImage(string) {
    const indexSrc = string.indexOf('src');
    const sliceBeforeSrc = string.slice(indexSrc + 5);
    const indexAfterSrc = sliceBeforeSrc.indexOf(' ');
    const url = sliceBeforeSrc.slice(0, indexAfterSrc - 1);
    return url;
  }
}
