import { Injectable } from '@nestjs/common';
import { SubscriptionAccessEntity, SubscriptionAccessRepository, Subscription } from '@project/subscription-access';
import { SUBSCRIPTION_EXCEPTION_MESSAGES } from './constants';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(private readonly subscriptionAccessRepository: SubscriptionAccessRepository) {}

  public async findSubscriptionByUserId(userId: string): Promise<Subscription[]> {
    return this.subscriptionAccessRepository.findByUserId(userId).then((resp) => resp.map((c) => c.toObject()));
  }

  public async createSubscription(subscription: CreateSubscriptionDto): Promise<Subscription> {
    // TODO: Проверка при создании подписки (может быть только один лайк пользователя для публикации)
    return this.subscriptionAccessRepository.save(new SubscriptionAccessEntity(subscription)).then((resp) => resp.toObject());
  }

  // TODO: подумать над форматом
  public async deleteSubscription(followedUserId: string, userId: string): Promise<void> {
    const subscription = await this.subscriptionAccessRepository.findByUserIdFollowedUserId(followedUserId, userId);
    if (!subscription) {
      throw new Error(SUBSCRIPTION_EXCEPTION_MESSAGES.NotFound);
    }

    await this.subscriptionAccessRepository.deleteById(subscription.toObject().id);
  }
}
