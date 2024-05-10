import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileAccessModule } from '@project/file-access';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  authServiceRegister,
  fileServiceRegister,
  getMongooseOptions,
  getStaticOptions,
  mongoRegister,
  postgresRegister,
} from '@project/configuration';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TokenAccessModule } from '@project/token-access';

@Module({
  imports: [
    FileAccessModule,
    ServeStaticModule.forRootAsync(getStaticOptions()),
    MongooseModule.forRootAsync(getMongooseOptions()),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileServiceRegister, mongoRegister, authServiceRegister, postgresRegister],
      envFilePath: 'apps/file/.env',
    }),
    TokenAccessModule,
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
