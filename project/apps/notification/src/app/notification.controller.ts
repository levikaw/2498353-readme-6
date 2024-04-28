import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RequestNotifyDto, SendNotificationDto } from '@project/common';
import { RABBIT_ROUTS, RABBIT_EXCHANGES, RABBIT_QUEUES } from '@project/constants';

@ApiTags('notify')
@Controller('notify')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @RabbitSubscribe({
    exchange: RABBIT_EXCHANGES.NOTIFICATION.NAME,
    routingKey: RABBIT_ROUTS.SEND_NOTIFICATION,
    queue: RABBIT_QUEUES.NOTIFICATION,
    createQueueIfNotExists: true,
  })
  public async sendNewPostToUser(data: SendNotificationDto<Omit<RequestNotifyDto, 'lastDateEmail'>>): Promise<void> {
    const lastDate = await this.notificationService.getAndUpdateLastDateEmail(data.content.userId);

    return await this.notificationService.sendNotification<RequestNotifyDto>({
      ...data,
      content: { ...data.content, lastDateEmail: lastDate },
    });
  }
}
