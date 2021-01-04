import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetUser = createParamDecorator((data: unknown, req: any) => {
  return req.user;
  // return return req.user;
})