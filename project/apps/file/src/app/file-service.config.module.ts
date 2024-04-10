import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { fileServiceRegister, getMongooseOptions, mongoRegister } from '@project/configuration';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileServiceRegister, mongoRegister],
      envFilePath: 'apps/file/.env',
    }),
  ],
})
export class FileModuleConfig {}
