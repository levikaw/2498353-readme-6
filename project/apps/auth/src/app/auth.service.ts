import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthUserInterface, UserAccessRepository } from '@project/user-access';
import { AUTH_EXCEPTION } from '@project/constants/exception-messages';
import { LoginUserDto } from '@project/dtos/user-dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserAccessRepository) {}

  public async authUser(user: LoginUserDto): Promise<AuthUserInterface> {
    const existUser = await this.userRepository.findOneByEmail(user.email);

    if (!existUser) {
      throw new NotFoundException(AUTH_EXCEPTION.NOT_FOUND);
    }

    if (!(await existUser.comparePassword(user.password))) {
      throw new UnauthorizedException(AUTH_EXCEPTION.WRONG_PASSWORD);
    }

    return existUser.toObject();
  }
}
