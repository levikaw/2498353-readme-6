import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import {
  TagAccessFactory,
  TagAccessRepository,
  LinkPostTagAccessFactory,
  LinkPostTagAccessRepository,
} from '@project/tag-access';
import { PrismaDataAccessModule } from '@project/prisma';

@Module({
  imports: [
    PrismaDataAccessModule.register(
      [TagAccessFactory, LinkPostTagAccessFactory],
      [TagAccessRepository, LinkPostTagAccessRepository],
    ),
  ],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
