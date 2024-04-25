import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileAccessModule } from '@project/file-access';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { fileServiceRegister, getMongooseOptions, getStaticOptions, mongoRegister } from '@project/configuration';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    FileAccessModule,
    ServeStaticModule.forRootAsync(getStaticOptions()),
    MongooseModule.forRootAsync(getMongooseOptions()),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileServiceRegister, mongoRegister],
      envFilePath: 'apps/file/.env',
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
