import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GATEWAY_ALIAS } from '@project/configuration';

import { FilePathWithEntityIdDto } from '@project/dtos/file-dto';
import { isNotEmpty } from 'class-validator';
import { FilesEntitesIds, FilesPathsWithBase } from '../types';
import { genAuthHeader, resolveData } from '../utils';

@Injectable()
export class FileService {
  private readonly fileBaseUrl: string;

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.fileBaseUrl = configService.get<string>(`${GATEWAY_ALIAS}.fileBaseUrl`);
  }
  public async getFilesPaths(filesIds: FilesEntitesIds): Promise<FilesPathsWithBase> {
    return this.httpService.axiosRef
      .get<FilePathWithEntityIdDto[]>(`${this.fileBaseUrl}/file`, {
        params: { filter: JSON.stringify(filesIds) },
      })
      .then(({ data }) => ({ data, baseUrl: this.fileBaseUrl }));
  }
  public async upload(file: Express.Multer.File, authHeader: string, id: string = null): Promise<string> {
    const formData = new FormData();

    formData.append(
      'file',
      new Blob([file.buffer], {
        type: file.mimetype,
      }),
    );

    let typeUload: string;
    if (isNotEmpty(id) && !isNotEmpty(authHeader)) {
      typeUload = `avatar/${id}`;
    } else if (!isNotEmpty(id) && isNotEmpty(authHeader)) {
      typeUload = `upload`;
    }

    return this.httpService.axiosRef
      .postForm<string>(`${this.fileBaseUrl}/file/${typeUload}`, formData, genAuthHeader(authHeader))
      .then(resolveData);
  }
}
