import { FilePathWithEntityIdDto } from '@project/dtos/file-dto';

export type FilesPathsWithBase = { data: FilePathWithEntityIdDto[]; baseUrl: string };

export type FilesEntitesIds = Array<{ id: string; fileId: string }>;

export type ReducedTags = Array<{ name: string; id: string }>;
