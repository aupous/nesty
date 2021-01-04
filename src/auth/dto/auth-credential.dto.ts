import { IsNotEmpty, Matches, Min, MinLength } from "class-validator"

export class AuthCredentialDto {
  @IsNotEmpty()
  @MinLength(6)
  username: string

  @IsNotEmpty()
  @MinLength(6)
  // @Matches(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/)
  password: string
}