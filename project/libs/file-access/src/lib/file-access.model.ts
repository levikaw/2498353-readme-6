import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserFile } from './types/file.interface';
import { FILES_ALIAS } from '@project/constants';

@Schema({
  collection: FILES_ALIAS,
  timestamps: true,
})
export class FileAccessModel extends Document implements UserFile {
  @Prop({
    required: true,
    type: String,
  })
  public name: string;

  @Prop({
    required: true,
    type: String,
  })
  public content: string;

  @Prop({
    required: true,
    type: String,
  })
  public userId: string;
}

export const FileAccessSchema = SchemaFactory.createForClass(FileAccessModel);
