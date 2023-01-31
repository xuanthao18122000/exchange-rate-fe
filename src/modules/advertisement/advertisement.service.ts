import { Injectable } from '@nestjs/common';
import code from '../../configs/code';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeRate } from '../../database/entities/exchange-rate.entity';
import { Advertisement } from '../../database/entities/advertisement.entity';
import { Column, IsNull, Like, Not, Repository } from 'typeorm';
import * as cheerio from 'cheerio';
import axios from 'axios';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectRepository(ExchangeRate)
    private readonly exchangeRateRepo: Repository<ExchangeRate>,
    @InjectRepository(Advertisement)
    private readonly advertisementRepo: Repository<Advertisement>,
  ) {}

  async listAdv(query) {
    try {
      // eslint-disable-next-line prefer-const
      let { keyword, page, perPage, sort } = query;

      if (!page) {
        page = 1;
      }
      if (!perPage) {
        perPage = 10;
      }
      const exchangeRate = await this.advertisementRepo.findAndCount({
        skip: (page - 1) * perPage,
        take: perPage,
        order: { id: sort as SORT },
        where: [
          {
            title: keyword ? Like(`%${keyword}%`) : Not(IsNull()),
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

  async crawlAdvertisement() {
    try {
      const url = 'https://chogia.vn/tin-tuc-coin/';
      const { data } = await axios.get(url);

      const $ = cheerio.load(data);

      const list_adv = [];
      // console.log($.html());

      $('.uk-grid-column-medium > div').each((index, element) => {
        const title = $(element).find('.el-title').text().trim();
        let image = $(element).find('.uk-child-width-expand > div').html();
        image = this.getUrlImage(image);
        const date = $(element).find('.el-meta').text();
        const description = $(element).find('.el-content').text();
        list_adv.push({
          title,
          image,
          date,
          description,
        });
      });

      const checkER = await this.advertisementRepo.find();
      if (checkER) {
        await this.advertisementRepo.clear();
      }
      const insertER = await this.advertisementRepo
        .createQueryBuilder()
        .insert()
        .into(Advertisement)
        .values(list_adv)
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
    return 'https://chogia.vn/' + url;
  }
}
