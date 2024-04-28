import { ConflictException, Injectable } from '@nestjs/common';
import { UserAccessRepository, UserAccessEntity } from '@project/user-access';
import { UserRole } from '@prisma/client';
import { AUTH_USER, NOTIFY_PARAMS } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RABBIT_ROUTS, RABBIT_EXCHANGES } from '@project/constants';
import { SendNotificationDto, PostsListDto, RequestNotifyDto } from '@project/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserAccessRepository, private readonly rabbitClient: AmqpConnection) {}

  public async register(user: CreateUserDto): Promise<UserAccessEntity> {
    const existUser = await this.userRepository.findOneByEmail(user.email);
    if (existUser) {
      throw new ConflictException(AUTH_USER.EXISTS);
    }

    return new UserAccessEntity({ role: UserRole.user, passwordHash: '', ...user })
      .createPassword(user.password)
      .then((userEntity) => {
        this.userRepository.save(userEntity);
        return userEntity;
      });
  }

  public async requestNewPublicationsForEmail(userId: string, posts: PostsListDto[]) {
    const existUser = await this.userRepository.findById(userId);

    if (!existUser) {
      throw new ConflictException(AUTH_USER.DOES_NOT_EXISTS);
    }

    this.rabbitClient.publish<SendNotificationDto<Omit<RequestNotifyDto, 'lastDateEmail'>>>(
      RABBIT_EXCHANGES.NOTIFICATION.NAME,
      RABBIT_ROUTS.SEND_NOTIFICATION,
      {
        template: NOTIFY_PARAMS.TEMPLATE,
        subject: NOTIFY_PARAMS.SUBJECT,
        targetEmail: existUser.email,
        content: { posts, login: existUser.login, userId },
      },
    );
  }
}
