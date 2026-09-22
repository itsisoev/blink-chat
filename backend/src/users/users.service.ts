import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { publicUserSelect, authUserSelect } from './prisma/user.select';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findPublicUserByUuid(uuid: string) {
    return this.prisma.user.findUnique({
      where: { uuid },
      select: publicUserSelect,
    });
  }

  findPublicUserByUsername(userName: string) {
    return this.prisma.user.findUnique({
      where: { userName },
      select: publicUserSelect,
    });
  }

  findUserWithPasswordByUsername(userName: string) {
    return this.prisma.user.findUnique({
      where: { userName },
      select: authUserSelect,
    });
  }

  createUser(data: {
    userName: string;
    passwordHash: string;
    avatarUrl?: string;
  }) {
    return this.prisma.user.create({
      data: {
        userName: data.userName,
        passwordHash: data.passwordHash,
        avatarUrl: data.avatarUrl,
      },
      select: publicUserSelect,
    });
  }
}
