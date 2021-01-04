import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { JwtPayload } from './dto/jwt.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRepository) private userRepo: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'hihi',
    })
  }

  async validate(payload: JwtPayload) {
    const { username } = payload
    const user = await this.userRepo.findOne({ username })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}