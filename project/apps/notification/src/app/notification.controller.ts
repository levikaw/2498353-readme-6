import { Controller, Get, HttpException, HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CheckGatewayRequestGuard, CurrentUserFromToken, JwtAuthGuard } from '@project/common';
import { RABBIT_EXCHANGES, RABBIT_QUEUES, RABBIT_ROUTS } from '@project/configuration';
import { TokenUserDto } from '@project/dtos/tokens-dto';
import { SendNotificationDto, RequestNotifyDto, GetLastNotifyDateDto } from '@project/dtos/notification-dto';

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
  public async sendNewPostToUser(body: SendNotificationDto<Omit<RequestNotifyDto, 'lastNotificationDate'>>): Promise<void> {
    try {
      const lastNotificationDate = await this.notificationService.getAndUpdateLastDatel(body.content.userId);

      return await this.notificationService.sendNotification<RequestNotifyDto>({
        ...body,
        content: { ...body.content, lastNotificationDate: lastNotificationDate.dateString },
      });
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot send notification', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard, CheckGatewayRequestGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get last notified date for current user',
    type: GetLastNotifyDateDto,
    isArray: false,
  })
  public async getLastNotifiedDateByUserId(@CurrentUserFromToken() user: TokenUserDto): Promise<GetLastNotifyDateDto> {
    try {
      return this.notificationService.getAndUpdateLastDatel(user.userId);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot get last notification date', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
