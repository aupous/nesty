import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto) {
    return this.userRepo.signUp(authCredentialDto)
  }
  
  async signIn(authCredentialDto: AuthCredentialDto) {
    // throw new UnauthorizedException()
    return this.userRepo.signIn(authCredentialDto)
  }

}
