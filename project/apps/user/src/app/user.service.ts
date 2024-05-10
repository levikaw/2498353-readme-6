import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserAccessRepository, UserAccessEntity } from '@project/user-access';
import { UserRoleEnum } from '@project/user-access';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { NOTIFY_PARAMS } from '@project/constants/user-constant';
import { AUTH_EXCEPTION, USER_EXCEPTION } from '@project/constants/exception-messages';
import { ChangePasswordDto, CreateUserDto } from '@project/dtos/user-dto';
import { NotificationPostsListDto } from '@project/dtos/post-dto';
import { RequestNotifyDto, SendNotificationDto } from '@project/dtos/notification-dto';
import { RABBIT_EXCHANGES, RABBIT_ROUTS } from '@project/configuration';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserAccessRepository, private readonly rabbitClient: AmqpConnection) {}

  public async register(user: CreateUserDto): Promise<UserAccessEntity> {
    const existUser = await this.userRepository.findOneByEmail(user.email);
    if (existUser) {
      throw new ConflictException(USER_EXCEPTION.EXISTS);
    }

    return new UserAccessEntity({ role: UserRoleEnum.UserInterface, passwordHash: '', ...user })
      .createPassword(user.password)
      .then((userEntity) => this.userRepository.save(userEntity));
  }

  public async changePassword(userId: string, passwordCreadential: ChangePasswordDto): Promise<UserAccessEntity> {
    const user = await this.userRepository.findById(userId);
    const isPasswordsValid = await user.comparePassword(passwordCreadential.oldPassword);

    if (isPasswordsValid) {
      return user
        .createPassword(passwordCreadential.newPassword)
        .then(({ passwordHash }) => this.userRepository.changePassword(userId, passwordHash));
    } else {
      throw new UnauthorizedException(AUTH_EXCEPTION.WRONG_PASSWORD);
    }
  }

  public async requestNewPublicationsForEmail(userId: string, posts: NotificationPostsListDto[]) {
    const existUser = await this.userRepository.findById(userId);

    if (!existUser) {
      throw new NotFoundException(USER_EXCEPTION.DOES_NOT_EXISTS);
    }

    this.rabbitClient.publish<SendNotificationDto<Omit<RequestNotifyDto, 'lastNotificationDate'>>>(
      RABBIT_EXCHANGES.NOTIFICATION.NAME,
      RABBIT_ROUTS.SEND_NOTIFICATION,
      {
        template: NOTIFY_PARAMS.TEMPLATE,
        subject: NOTIFY_PARAMS.SUBJECT,
        targetEmail: existUser.email,
        content: { posts, userName: existUser.userName, userId },
      },
    );
  }
  public async findById(id: string): Promise<UserAccessEntity> {
    return this.userRepository.findById(id);
  }
}
