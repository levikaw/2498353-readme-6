import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillDto<T, K>(toClass: ClassConstructor<T>, fromObject: K) {
  return plainToInstance<T, K>(toClass, fromObject, { excludeExtraneousValues: true });
}
