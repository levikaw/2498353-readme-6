import { Injectable } from '@nestjs/common';
import { SubscriptionAccessEntity, SubscriptionAccessRepository, Subscription } from '@project/subscription-access';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(private readonly subscriptionAccessRepository: SubscriptionAccessRepository) {}

  /**
   * Получение подписок по идентификатору пользователя
   * @param {string} userId
   * @returns {Promise<Subscription[]>}
   */
  public async find(userId: string): Promise<Subscription[]> {
    return (await this.subscriptionAccessRepository.findByUserId(userId)).map((c) => c.toObject());
  }

  /**
   * Создание подписки
   * @param {CreateSubscriptionDto} dto
   * @returns {Promise<Subscription>}
   */
  public async create(dto: CreateSubscriptionDto): Promise<Subscription> {
    // TODO: Проверка при создании лайка (может быть только один лайк пользователя для публикации)
    return (await this.subscriptionAccessRepository.save(new SubscriptionAccessEntity(dto))).toObject();
  }

  /**
   * Удаление подписки по идентификатору пользователя
   * @param {string} followUserId
   * @param {string} userId
   */
  public async delete(followUserId: string, userId: string): Promise<any> {
    const subscription = await this.subscriptionAccessRepository.findByFollowUserIdUserId(followUserId, userId);
    if (!subscription) {
      throw new Error('Подписка не найдена!');
    }

    await this.subscriptionAccessRepository.deleteById(subscription.toObject().id);
  }
}
