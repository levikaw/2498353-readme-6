import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserFile } from './types/file.interface';

@Schema({
  collection: 'files',
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

export const fileAccessSchema = SchemaFactory.createForClass(FileAccessModel);
