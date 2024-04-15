import { BaseEntityInterface } from './base-entity.interface';

export abstract class BaseEntity implements BaseEntityInterface {
  public id: string;
  public updatedAt: Date;
  public createdAt: Date;
}
