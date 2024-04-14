import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { PostAccessEntity } from './post-access.entity';
import { PostAccessFactory } from './post-access.factory';
// import { PostType, Prisma } from '@prisma/client';
import { PrismaService } from '@project/prisma';
import { convertToPrismaFilter } from './post-access.filter';
import { CommonPost } from './types/common-post.interface';
import { UpdateCommonnPost } from './types/update-common-post.interface';

@Injectable()
export class PostAccessRepository extends BasePostgresRepository<PostAccessEntity> {
  constructor(entityFactory: PostAccessFactory, readonly dataSource: PrismaService) {
    super(entityFactory, dataSource);
  }

  public async save(entity: PostAccessEntity): Promise<PostAccessEntity> {
    return this.dataSource.post
      .create({
        data: entity.toObject(),
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }

  public async findById(id: string): Promise<PostAccessEntity> {
    return this.dataSource.post
      .findUnique({
        where: {
          id,
        },
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }

  public async deleteById(id: string): Promise<void> {
    await this.dataSource.post.delete({
      where: {
        id,
      },
    });
  }

  public async update(entity: UpdateCommonnPost): Promise<void> {
    await this.dataSource.post.update({
      where: { id: entity.id },
      data: entity,
    });
  }

  public async findManyBy(where?: Partial<CommonPost>, skip?: number, take?: number): Promise<PostAccessEntity[]> {
    return this.dataSource.post
      .findMany({
        where: convertToPrismaFilter(where),
        skip,
        take,
      })
      .then((resp) => resp.map((c) => this.entityFactory.createEntity(c)));
  }

  /*public async findByName(name: string): Promise<PostAccessEntity[]> {
    return Array.from(this.entities.values())
      .filter((entity) => new RegExp(`.*${name}.*`).test(entity.name) && !entity.deletedAt)
      .map((c) => this.entityFactory.createEntity(c));
  }

  public async findByType(type: PostType): Promise<PostAccessEntity[]> {
    return Array.from(this.entities.values())
      .filter((entity) => entity.type === type && !entity.deletedAt)
      .map((c) => this.entityFactory.createEntity(c));
  }

  public async findByStatus(status: PostStatus): Promise<PostAccessEntity[]> {
    return Array.from(this.entities.values())
      .filter((entity) => entity.status === status && !entity.deletedAt)
      .map((c) => this.entityFactory.createEntity(c));
  }

  public async findByTags(tags: string[]): Promise<PostAccessEntity[]> {
    return Array.from(this.entities.values())
      .filter((entity) => tags.some((tag) => entity.tags.includes(tag)) && !entity.deletedAt)
      .map((c) => this.entityFactory.createEntity(c));
  }

  public async findByUserId(userId: string): Promise<PostAccessEntity[]> {
    return Array.from(this.entities.values())
      .filter((entity) => entity.userId === userId && !entity.deletedAt)
      .map((c) => this.entityFactory.createEntity(c));
  }*/
}
