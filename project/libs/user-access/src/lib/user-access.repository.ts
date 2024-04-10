import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { UserAccessEntity } from './user-access.entity';
import { UserAccessFactory } from './user-access.factory';

@Injectable()
export class UserAccessRepository extends BaseMemoryRepository<UserAccessEntity> {
  constructor(entityFactory: UserAccessFactory) {
    super(entityFactory);
  }

  public async findByEmail(email: string): Promise<UserAccessEntity> {
    const user = Array.from(this.entities.values()).find((entity) => entity.email === email && !entity.deletedAt);
    return !!user ? this.entityFactory.createEntity(user) : null;
  }
}
