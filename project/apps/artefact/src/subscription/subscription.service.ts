import { ConflictException, Injectable } from '@nestjs/common';
import { SubscriptionAccessEntity, SubscriptionAccessRepository } from '@project/subscription-access';
import { SUBSCRIPTION_EXCEPTION } from '@project/constants/exception-messages';

@Injectable()
export class SubscriptionService {
  constructor(private readonly subscriptionAccessRepository: SubscriptionAccessRepository) {}

  public async findSubscriptionsByUserId(userId: string): Promise<SubscriptionAccessEntity[]> {
    return this.subscriptionAccessRepository.findManyByUserId(userId);
  }

  public async createSubscription(followingUserId: string, userId: string): Promise<SubscriptionAccessEntity> {
    const existsSubscription = await this.subscriptionAccessRepository.findOneByUserIdFollowedUserId(followingUserId, userId);
    if (existsSubscription) {
      throw new ConflictException(SUBSCRIPTION_EXCEPTION.EXISTS);
    }
    return this.subscriptionAccessRepository.save(new SubscriptionAccessEntity({ followingUserId, userId }));
  }

  public async deleteSubscription(id: string): Promise<void> {
    await this.subscriptionAccessRepository.deleteById(id);
  }

  public async findSubscriptionById(id: string): Promise<SubscriptionAccessEntity> {
    return this.subscriptionAccessRepository.findById(id);
  }
}
