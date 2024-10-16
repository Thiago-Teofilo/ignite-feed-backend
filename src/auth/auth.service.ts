import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { prisma } from 'src/_integrations/prisma';
import { JwtService } from '@nestjs/jwt';
import { HTTPSession } from 'src/_utils/mappers';
import { hash, compare } from 'bcrypt';
import { RegisterUserDto } from './dto/request/create-user.dto';
import { AuthenticateUserDto } from './dto/request/authenticate-user.dto';
import { sessionSelect } from 'src/_utils/entities-select-templates';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register({
    email,
    name,
    password,
    role,
  }: RegisterUserDto): Promise<HTTPSession> {
    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException('Email já está em uso');
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: await hash(password, 8),
        role,
      },
    });

    const session = await prisma.session.create({
      data: {
        userId: newUser.id,
        token: await this.jwtService.signAsync({
          sub: newUser.id,
          username: newUser.name,
        }),
      },
      select: sessionSelect,
    });

    return session;
  }

  async authenticate({ email, password }: AuthenticateUserDto) {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    const isPasswordValid = user
      ? await compare(password, user.passwordHash)
      : false;

    if (!isPasswordValid) {
      throw new BadRequestException();
    }

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        token: await this.jwtService.signAsync({
          sub: user.id,
          username: user.name,
        }),
      },
      select: sessionSelect,
    });

    return session;
  }
}
