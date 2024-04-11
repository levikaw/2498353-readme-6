import { Body, Controller, Delete, Get, HttpStatus, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubscriptionAccessEntity, Subscription } from '@project/subscription-access';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: [SubscriptionAccessEntity],
    isArray: true,
  })
  @Get(':userId')
  public async getSubscriptionByUserId(@Param('userId') userId: string): Promise<Subscription[]> {
    return this.subscriptionService.findSubscriptionByUserId(userId);
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
    @Param('followedUserId') followedUserId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    this.subscriptionService.deleteSubscription(followedUserId, userId);
  }
}
