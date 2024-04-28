import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendNotificationDto<T> {
  @IsEmail()
  @IsNotEmpty()
  public targetEmail: string;

  @IsNotEmpty()
  @IsString()
  public subject: string;

  @IsNotEmpty()
  @IsString()
  public template: string;

  @IsNotEmpty()
  public content: T;
}
