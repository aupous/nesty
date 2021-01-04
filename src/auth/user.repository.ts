import { EntityRepository, Repository } from "typeorm";
import { hash } from 'bcrypt'
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import { BadRequestException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto
    const user = new User()
    user.username = username
    user.password = await this.hashPassword(password)
    try {
      await user.save()
      return user
    } catch (e) {
      if (e.code === '23505') {
        throw new BadRequestException(`Username "${username}" is already existed.`)
      }
      throw new InternalServerErrorException()
    }
  }

  async signIn(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto
    const user = await this.findOne({
      where: {
        username
      }
    })

    if (user && await user.validatePassword(password)) {
      return user
    }

    throw new UnauthorizedException()
  }

  private hashPassword(pwd: string): Promise<string> {
    return hash(pwd, 10)
  }
}