import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { AuthCredentialDto } from './dto/auth-credential.dto'
import { JwtPayload } from './dto/jwt.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto) {
    return this.userRepo.signUp(authCredentialDto)
  }

  async signIn(authCredentialDto: AuthCredentialDto) {
    const user = await this.userRepo.signIn(authCredentialDto)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: JwtPayload = { username: user.username }

    const accessToken = await this.jwtService.sign(payload)

    return { accessToken }
  }
}
