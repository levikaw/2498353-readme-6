import { Injectable } from '@nestjs/common';
import { SubscriptionAccessEntity, SubscriptionAccessRepository, Subscription } from '@project/subscription-access';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(private readonly subscriptionAccessRepository: SubscriptionAccessRepository) {}

  public async findSubscriptionByUserId(userId: string): Promise<Subscription[]> {
    return (await this.subscriptionAccessRepository.findByUserId(userId)).map((c) => c.toObject());
  }

  public async createSubscription(subscription: CreateSubscriptionDto): Promise<Subscription> {
    // TODO: Проверка при создании подписки (может быть только один лайк пользователя для публикации)
    return (await this.subscriptionAccessRepository.save(new SubscriptionAccessEntity(subscription))).toObject();
  }

  // TODO: подумать над форматом
  public async deleteSubscription(followedUserId: string, userId: string): Promise<any> {
    const subscription = await this.subscriptionAccessRepository.findByUserIdFollowedUserId(followedUserId, userId);
    if (!subscription) {
      throw new Error('Subscription not found!');
    }

    await this.subscriptionAccessRepository.deleteById(subscription.toObject().id);
  }
}
