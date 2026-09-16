import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByUsername(userName: string) {
    return this.prisma.user.findUnique({
      where: {
        userName,
      },
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
      select: {
        uuid: true,
        userName: true,
        avatarUrl: true,
        isOnline: true,
        createdAt: true,
      },
    });
  }
}
