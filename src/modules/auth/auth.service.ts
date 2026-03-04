import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<{ user: Omit<User, 'password'>; accessToken: string }> {
    const existing = await this.userService.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already registered');
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.create({
      email: dto.email,
      password: hashed,
    });
    const accessToken = this.jwtService.sign({ sub: user.id, email: user.email });
    return { user: this.omitPassword(user), accessToken };
  }

  async login(dto: LoginDto): Promise<{ user: Omit<User, 'password'>; accessToken: string }> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid email or password');
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid email or password');
    const accessToken = this.jwtService.sign({ sub: user.id, email: user.email });
    return { user: this.omitPassword(user), accessToken };
  }

  async validateUserById(id: string): Promise<User | null> {
    return this.userService.findById(id);
  }

  getPublicProfile(user: User): Omit<User, 'password'> {
    return this.omitPassword(user);
  }

  private omitPassword(user: User): Omit<User, 'password'> {
    const { password: _, ...rest } = user;
    return rest;
  }
}
