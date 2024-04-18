import { Prisma } from '@prisma/client';
import { isNotEmpty } from 'class-validator';
import { CommonPost } from './types/common-post.interface';

export function convertToPrismaFilter(where: Partial<CommonPost>): Prisma.PostWhereInput {
  return isNotEmpty(where)
    ? Object.entries(where).reduce((acc, [key, value]) => {
        switch (key) {
          case 'name':
            acc[key] = {
              contains: where.name,
            };
            break;

          case 'tags':
            acc[key] = {
              hasSome: where.tags,
            };
            break;

          default:
            acc[key] = value;
            break;
        }
        return acc;
      }, {} as Prisma.PostWhereInput)
    : undefined;
}
