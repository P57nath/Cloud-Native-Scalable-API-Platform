import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

/**
 * User controller — registration is in AuthController; here you can add profile/update later.
 */
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
