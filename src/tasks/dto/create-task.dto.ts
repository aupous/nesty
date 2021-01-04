import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreateTaskDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  title: string

  @IsNotEmpty()
  @MinLength(4)
  content: string
}
