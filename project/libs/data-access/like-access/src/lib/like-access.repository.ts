import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { PrismaService } from '@project/prisma';
import { LikeAccessEntity } from './like-access.entity';
import { LikeAccessFactory } from './like-access.factory';

@Injectable()
export class LikeAccessRepository extends BasePostgresRepository<LikeAccessEntity> {
  constructor(entityFactory: LikeAccessFactory, readonly dataSource: PrismaService) {
    super(entityFactory, dataSource);
  }

  public async save(entity: LikeAccessEntity): Promise<LikeAccessEntity> {
    return this.dataSource.like
      .create({
        data: entity.toObject(),
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }

  public async deleteById(id: string): Promise<void> {
    await this.dataSource.like.delete({
      where: {
        id,
      },
    });
  }

  public async findByPostId(postId: string, skip?: number, take?: number): Promise<LikeAccessEntity[]> {
    return this.dataSource.like
      .findMany({
        where: {
          postId,
        },
        skip,
        take,
      })
      .then((resp) => resp.map((c) => this.entityFactory.createEntity(c)));
  }

  public async findByPostIdUserId(postId: string, userId: string): Promise<LikeAccessEntity> {
    return this.dataSource.like
      .findFirst({
        where: {
          userId,
          postId,
        },
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }
}
