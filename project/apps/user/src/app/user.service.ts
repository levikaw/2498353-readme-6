import { ConflictException, Injectable } from '@nestjs/common';
import { UserAccessRepository, UserAccessEntity } from '@project/user-access';
import { UserRole } from '@prisma/client';
import { AUTH_USER_EXISTS } from './constants';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserAccessRepository) {}

  public async register(user: CreateUserDto): Promise<UserAccessEntity> {
    const existUser = await this.userRepository.findByEmail(user.email);
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    // TODO: for avatar /api/upload -> fileid
    return new UserAccessEntity({ role: UserRole.user, passwordHash: '', ...user })
      .createPassword(user.password)
      .then((userEntity) => {
        this.userRepository.save(userEntity);
        return userEntity;
      });
  }
}
