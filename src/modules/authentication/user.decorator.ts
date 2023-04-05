import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserModel } from './services/models/user.model';

const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as UserModel;
});

export default LoggedUser;
