import { Prisma } from '@prisma/client';
import { NullableEnum } from '@project/common';
import { isDate, isDateString, isNotEmpty } from 'class-validator';
import { PostFilterInterface } from '../types/post-filter.interface';

const PRISMA_NULLABLE = {
  [NullableEnum.IsNull]: null,
  [NullableEnum.IsNotNull]: {
    not: null,
  },
} as const;

export function convertToPrismaFilter(where: PostFilterInterface): Prisma.PostWhereInput {
  return isNotEmpty(where)
    ? Object.entries(where).reduce((acc, [key, value]) => {
        switch (key) {
          case 'name':
            acc[key] = {
              contains: where.name,
            };
            break;

          case 'type':
            acc[key] = value;
            break;

          case 'userId':
            acc[key] = { in: where.userId };
            break;

          case 'publishedAt':
            acc[key] =
              isDateString(where.publishedAt) || isDate(where.publishedAt)
                ? { gt: where.publishedAt }
                : PRISMA_NULLABLE[String(where.publishedAt)];
            break;

          case 'tags':
            acc[key] = {
              hasSome: where.tags,
            };
            break;

          default:
            throw new Error('Filter does not supported');
        }
        return acc;
      }, {} as Prisma.PostWhereInput)
    : undefined;
}
