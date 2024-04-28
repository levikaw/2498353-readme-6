import { ConfigService } from '@nestjs/config';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { resolve } from 'node:path';
import { NOTIFY_ALIAS } from './constants';

export function getMailerOptions(): MailerAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        transport: {
          host: config.get<string>(`${NOTIFY_ALIAS}.host`),
          port: config.get<number>(`${NOTIFY_ALIAS}.smtpPort`),
          secure: false,
          auth: {
            user: config.get<string>(`${NOTIFY_ALIAS}.user`),
            pass: config.get<string>(`${NOTIFY_ALIAS}.password`),
          },
        },
        defaults: {
          from: config.get<string>(`${NOTIFY_ALIAS}.from`),
        },
        template: {
          dir: resolve(__dirname, 'assets'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      };
    },
    inject: [ConfigService],
  };
}
