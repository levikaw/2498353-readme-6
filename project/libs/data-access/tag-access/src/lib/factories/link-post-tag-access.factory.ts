import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '@project/core';
import { isNotEmpty } from 'class-validator';
import { LinkPostTagAccessEntity } from '../entities/link-post-tag-access.entity';
import { LinkPostTagInterface } from '../types/link-post-tag.interface';

@Injectable()
export class LinkPostTagAccessFactory implements EntityFactoryInterface<LinkPostTagAccessEntity> {
  public createEntity(entityPlainData: LinkPostTagInterface): LinkPostTagAccessEntity {
    return isNotEmpty(entityPlainData) ? new LinkPostTagAccessEntity(entityPlainData) : null;
  }
}
