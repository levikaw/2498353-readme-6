import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { CurrentUserFromToken, fillDto, JwtAuthGuard } from '@project/common';
import { TokenUserDto } from '@project/dtos/tokens-dto';
import { SubscriptionDto } from '@project/dtos/artefact-dto';
import { USER_EXCEPTION } from '@project/constants/exception-messages';

@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiOkResponse({
    description: 'Get subscriptions by user id',
    type: [SubscriptionDto],
    isArray: true,
  })
  @ApiParam({
    name: 'userId',
    type: String,
    required: true,
  })
  @Get('/:userId')
  public async getSubscriptionsByUserId(@Param('userId', ParseUUIDPipe) userId: string): Promise<SubscriptionDto[]> {
    try {
      const subscriptions = await this.subscriptionService.findSubscriptionsByUserId(userId);
      return subscriptions.map((subscription) => fillDto(SubscriptionDto, subscription.toObject()));
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }

  @ApiOkResponse({
    type: SubscriptionDto,
    isArray: false,
    description: 'create and return subscription',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':followingUserId')
  @ApiParam({
    name: 'followingUserId',
    type: String,
    required: true,
  })
  public async createSubscription(
    @Param('followingUserId', ParseUUIDPipe) followingUserId: string,
    @CurrentUserFromToken() user: TokenUserDto,
  ): Promise<SubscriptionDto> {
    try {
      const subscription = await this.subscriptionService.createSubscription(followingUserId, user.userId);
      return fillDto(SubscriptionDto, subscription.toObject());
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot create subscription', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOkResponse({
    description: 'Delete subscription by id',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiBearerAuth()
  public async deleteSubscription(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUserFromToken() user: TokenUserDto,
  ): Promise<void> {
    try {
      const sub = await this.subscriptionService.findSubscriptionById(id);
      if (sub.userId !== user.userId) {
        throw new HttpException(`${USER_EXCEPTION.NOT_OWN} subscription`, HttpStatus.FORBIDDEN);
      }
      await this.subscriptionService.deleteSubscription(id);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot delete subscription', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
