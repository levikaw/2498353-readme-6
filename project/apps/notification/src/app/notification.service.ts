import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { GetLastNotifyDateDto, SendNotificationDto } from '@project/dtos/notification-dto';
import { NotificationAccessRepository } from '@project/notification-access';
import dayjs from 'dayjs';
import { isNotEmptyObject } from 'class-validator';

@Injectable()
export class NotificationService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly notificationAccessRepository: NotificationAccessRepository,
  ) {}

  public async sendNotification<T>(data: SendNotificationDto<T>): Promise<void> {
    await this.mailerService.sendMail({
      to: data.targetEmail,
      subject: data.subject,
      template: data.template,
      context: data.content,
    });
  }

  public async getAndUpdateLastDatel(userId: string): Promise<GetLastNotifyDateDto> {
    const notification = await this.notificationAccessRepository.getNotificationByUserId(userId);

    await this.notificationAccessRepository.setNotifiedDate(userId);

    const rawDate = isNotEmptyObject(notification) ? notification.notifiedAt : new Date('1900-01-01');

    return { date: rawDate, dateString: dayjs(rawDate).format('DD.MM.YYYY') };
  }
}
