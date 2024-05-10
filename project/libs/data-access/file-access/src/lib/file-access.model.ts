import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FileInterface } from './types/file.interface';

@Schema({
  collection: 'files',
  timestamps: true,
})
export class FileAccessModel extends Document implements FileInterface {
  @Prop({
    required: true,
    type: String,
  })
  public name: string;

  @Prop({
    required: true,
    type: String,
  })
  public mimetype: string;

  @Prop({
    required: true,
    type: Number,
  })
  public size: number;

  @Prop({
    required: true,
    type: String,
  })
  public userId: string;

  @Prop({ type: Date, default: Date.now })
  public createdAt: Date;
}

export const fileAccessSchema = SchemaFactory.createForClass(FileAccessModel);

fileAccessSchema.virtual('id').get(function () {
  return this._id.toString();
});

fileAccessSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});
