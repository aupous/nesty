import { IsOptional, MaxLength, MinLength } from 'class-validator'

export class UpdateTaskDto {
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  title?: string

  @IsOptional()
  @MinLength(4)
  content?: string
}
