import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SubscriptionAccessEntity, Subscription } from '@project/subscription-access';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  /**
   * Получение подписок по идентификатору пользователя
   * @param {string} userId
   * @returns {Promise<SubscriptionAccessEntity[]>}
   */
  @ApiOkResponse({ type: [SubscriptionAccessEntity] })
  @Get(':userId')
  public async get(@Param('userId') userId: string): Promise<Subscription[]> {
    return await this.subscriptionService.find(userId);
  }

  /**
   * Создание подписки
   * @param {CreateSubscriptionDto} dto
   * @returns {Promise<Subscription>}
   */
  @ApiOkResponse({ type: SubscriptionAccessEntity })
  @Post('create')
  public async create(@Body(new ValidationPipe()) dto: CreateSubscriptionDto): Promise<Subscription> {
    return await this.subscriptionService.create(dto);
  }

  /**
   * Удаление подписки по идентификатору пользователя
   * @param {string} followUserId
   * @param {string} userId
   */
  // TODO: сделать получение id текущего авторизованного пользователя
  @Delete('delete/:followUserId/:userId')
  public async delete(@Param('followUserId') followUserId: string, @Param('userId') userId: string): Promise<void> {
    await this.subscriptionService.delete(followUserId, userId);
  }
}
