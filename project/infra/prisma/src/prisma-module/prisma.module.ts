import { DynamicModule, Module } from '@nestjs/common';
// import { DATABASE_URL } from './constants';
import { ConfigurableModuleClass } from './prisma.module-definition';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule extends ConfigurableModuleClass {}
// export class PrismaModule {
//   static forRootAsync(datasourceUrl: string): DynamicModule {
//     return {
//       module: PrismaModule,
//       providers: [
//         {
//           provide: DATABASE_URL,
//           useValue: datasourceUrl,
//         },
//         PrismaService,
//       ],
//       exports: [PrismaService],
//     };
//   }
// }
