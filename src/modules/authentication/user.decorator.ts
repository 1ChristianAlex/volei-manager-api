import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserOutputDto } from '../user/controllers/DTOs/user.dto';

const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as UserOutputDto;
});

export default LoggedUser;
