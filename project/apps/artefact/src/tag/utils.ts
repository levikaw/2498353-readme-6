import { TagNameDto } from '@project/dtos/artefact-dto';

export const transformTagsNames = (rawNames: TagNameDto[]): string[] => [
  ...new Set(rawNames.map(({ name }) => name.toLowerCase())),
];
