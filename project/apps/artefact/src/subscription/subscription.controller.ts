import { Body, Controller, Delete, Get, HttpStatus, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiResponse({
    status: HttpStatus.OK,
    type: [SubscriptionAccessEntity],
    isArray: true,
  })
  @Get(':userId')
  public async get(@Param('userId') userId: string): Promise<Subscription[]> {
    return await this.subscriptionService.find(userId);
  }

  /**
   * Создание подписки
   * @param {CreateSubscriptionDto} dto
   * @returns {Promise<Subscription>}
   */
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SubscriptionAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @Post('create')
  public async create(@Body(new ValidationPipe()) dto: CreateSubscriptionDto): Promise<Subscription> {
    return await this.subscriptionService.create(dto);
  }

  /**
   * Удаление подписки по идентификатору пользователя
   * @param {string} followUserId
   * @param {string} userId
   */
  @ApiResponse({
    status: HttpStatus.OK,
  })
  // TODO: сделать получение id текущего авторизованного пользователя
  @Delete('delete/:followUserId/:userId')
  public async delete(@Param('followUserId') followUserId: string, @Param('userId') userId: string): Promise<void> {
    await this.subscriptionService.delete(followUserId, userId);
  }
}
