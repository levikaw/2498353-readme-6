import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubscriptionAccessEntity, Subscription } from '@project/subscription-access';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { QueryParamsDto, SuccessResponse } from '@project/common';

@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: [SubscriptionAccessEntity],
    isArray: true,
  })
  @Get('/:userId')
  public async getSubscriptionByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() params?: QueryParamsDto<Subscription>,
  ): Promise<SuccessResponse<Subscription[]>> {
    params.filter['userId'] = userId;
    return Promise.all([
      this.subscriptionService.findSubscriptionByUserId(params),
      this.subscriptionService.countBy(params?.filter),
    ]).then((resp) => new SuccessResponse(resp));
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SubscriptionAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @Post('create')
  public async createSubscription(@Body(new ValidationPipe()) dto: CreateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionService.createSubscription(dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  // TODO: сделать получение id текущего авторизованного пользователя
  @Delete('delete/:followedUserId/:userId')
  public async deleteSubscription(
    @Param('followedUserId', ParseUUIDPipe) followedUserId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    try {
      await this.subscriptionService.deleteSubscription(followedUserId, userId);
    } catch (error) {
      Logger.error(error, `deleteSubscription - followedUserId: ${followedUserId}, userId: ${userId}`);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
