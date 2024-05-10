import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { PrismaService } from '@project/prisma';
import { TagAccessEntity } from '../entities/tag-access.entity';
import { TagAccessFactory } from '../factories/tag-access.factory';

@Injectable()
export class TagAccessRepository extends BasePostgresRepository<TagAccessEntity> {
  constructor(entityFactory: TagAccessFactory, readonly dataSource: PrismaService) {
    super(entityFactory, dataSource);
  }

  public async save(entity: TagAccessEntity): Promise<TagAccessEntity> {
    return this.dataSource.tag
      .upsert({
        where: { name: entity.name },
        create: {
          name: entity.name,
        },
        update: {},
      })
      .then((tag) =>
        this.dataSource.tag.findUnique({ where: { name: tag.name } }).then((tags) => this.entityFactory.createEntity(tags)),
      );
  }

  public async findManyByIds(ids: string[]): Promise<TagAccessEntity[]> {
    return this.dataSource.tag
      .findMany({
        where: {
          id: {
            in: ids,
          },
        },
      })
      .then((tags) => tags.map((tag) => this.entityFactory.createEntity(tag)));
  }

  public async findManyByNames(names: string[]): Promise<TagAccessEntity[]> {
    return this.dataSource.tag
      .findMany({
        where: { name: { in: names } },
      })
      .then((tags) => tags.map((tag) => this.entityFactory.createEntity(tag)));
  }
}
