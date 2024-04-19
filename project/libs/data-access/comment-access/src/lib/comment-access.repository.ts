import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { PrismaService } from '@project/prisma';
import { CommentAccessEntity } from './comment-access.entity';
import { CommentAccessFactory } from './comment-access.factory';
import { calculateSkip, QueryParamsDto } from '@project/common';

@Injectable()
export class CommentAccessRepository extends BasePostgresRepository<CommentAccessEntity> {
  constructor(entityFactory: CommentAccessFactory, readonly dataSource: PrismaService) {
    super(entityFactory, dataSource);
  }

  public async save(entity: CommentAccessEntity): Promise<CommentAccessEntity> {
    return this.dataSource.comment
      .create({
        data: entity.toObject(),
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }

  public async deleteById(id: string): Promise<void> {
    await this.dataSource.comment.delete({
      where: {
        id,
      },
    });
  }

  public async findManyBy(query?: QueryParamsDto<CommentAccessEntity>): Promise<CommentAccessEntity[]> {
    return this.dataSource.comment
      .findMany({
        where: query.filter,
        skip: calculateSkip(query.page, query.limit),
        take: query.limit,
        orderBy: query.sort,
      })
      .then((resp) => resp.map((c) => this.entityFactory.createEntity(c)));
  }

  public async countBy(where?: QueryParamsDto<CommentAccessEntity>['filter']): Promise<number> {
    return this.dataSource.comment.count({ where });
  }
}
