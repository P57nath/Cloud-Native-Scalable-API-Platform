import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that uses the JWT strategy. Use with @UseGuards(JwtAuthGuard) on routes.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
