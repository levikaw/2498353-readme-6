import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '@project/core';
import { isNotEmpty } from 'class-validator';
import { TagAccessEntity } from '../entities/tag-access.entity';
import { TagInterface } from '../types/tag.interface';

@Injectable()
export class TagAccessFactory implements EntityFactoryInterface<TagAccessEntity> {
  public createEntity(entityPlainData: TagInterface): TagAccessEntity {
    return isNotEmpty(entityPlainData) ? new TagAccessEntity(entityPlainData) : null;
  }
}
