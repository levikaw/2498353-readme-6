import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendNotificationDto } from '@project/common';
import { NotificationAccessRepository } from '@project/notification-access';
import dayjs from 'dayjs';

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

  public async getAndUpdateLastDateEmail(userId: string): Promise<string> {
    const { notifiedAt } = await this.notificationAccessRepository.getNotificationByUserId(userId);

    await this.notificationAccessRepository.updateNotifiedDate(userId);
    return dayjs(notifiedAt).format('DD.MM.YYYY');
  }
}
