import { ConfigService } from '@nestjs/config';
import { ServeStaticModuleAsyncOptions } from '@nestjs/serve-static';
import { FILES_ALIAS } from './constants';

export function getStaticOptions(): ServeStaticModuleAsyncOptions {
  return {
    useFactory: (config: ConfigService) => {
      const rootPath = config.get<string>(`${FILES_ALIAS}.rootPath`);
      const serveRoot = config.get<string>(`${FILES_ALIAS}.serveRoot`);
      return [
        {
          rootPath,
          serveRoot: '/api' + serveRoot,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          },
        },
      ];
    },
    inject: [ConfigService],
  };
}
