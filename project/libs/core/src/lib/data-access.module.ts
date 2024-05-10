import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PrismaModule } from '@project/prisma';
import { getPostgresOptions } from '@project/configuration';

@Module({})
export class PrismaDataAccessModule {
  static register(factory: Provider, repository: Provider): DynamicModule {
    return {
      module: PrismaDataAccessModule,
      imports: [PrismaModule.registerAsync(getPostgresOptions())],
      providers: [factory, repository],
      exports: [repository],
    };
  }
}
