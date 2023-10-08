import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from 'src/services/app.service';
import { AppController } from 'src/controllers/app.controller';

import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'simple-nest',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
