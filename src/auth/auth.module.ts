import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { JwtModule, } from '@nestjs/jwt'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'hihi',
      signOptions: {
        expiresIn: 3600,
      }
    }),
    TypeOrmModule.forFeature([
    UserRepository
  ])],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
