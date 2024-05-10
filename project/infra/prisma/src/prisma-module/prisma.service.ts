import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN, Options } from './prisma.module-definition';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) protected readonly options: Options) {
    super(options);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
