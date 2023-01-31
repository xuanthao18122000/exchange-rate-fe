import { AuthModule } from 'src/modules/auth/auth.module';
import { ExchangeRateModule } from 'src/modules/exchange-rate/exchange-rate.module';
import { AdvertisementModule } from 'src/modules/advertisement/advertisement.module';

export const Routes = [
  {
    path: 'api',
    children: [
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'exchange-rate',
        module: ExchangeRateModule,
      },
      {
        path: 'advertisement',
        module: AdvertisementModule,
      },
    ],
  },
];
