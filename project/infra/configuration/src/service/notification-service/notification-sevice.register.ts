import { ConfigType, registerAs } from '@nestjs/config';
import { NOTIFY_DEFAULT_PORTS, NOTIFY_ALIAS } from './constants';
import { plainToClass } from 'class-transformer';
import { NotificationServiceConfiguration } from './notification-sevice.config';

async function getNotificationConfig(): Promise<NotificationServiceConfiguration> {
  const config = plainToClass(NotificationServiceConfiguration, {
    environment: process.env.NODE_ENV,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : NOTIFY_DEFAULT_PORTS.APP_PORT,
    smtpPort: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : NOTIFY_DEFAULT_PORTS.SMTP,
    webUIPort: process.env.WEBUI_PORT ? parseInt(process.env.WEBUI_PORT, 10) : NOTIFY_DEFAULT_PORTS.WEB_UI,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    host: process.env.SMTP_HOST,
    from: process.env.FROM_EMAIL,
  });

  try {
    await config.validate();
  } catch (error) {
    throw new Error(error);
  }

  return config;
}

export default registerAs(NOTIFY_ALIAS, async (): Promise<ConfigType<typeof getNotificationConfig>> => getNotificationConfig());
