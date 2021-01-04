import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {

  }

  @Post('/sign-up')
  signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return this.authService.signUp(authCredentialDto)
  }


  @Post('/sign-in')
  signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return this.authService.signIn(authCredentialDto)
  }


  @Get('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user, @Req() req) {
    return {
      user
    }
  }
}
