import type { Prisma } from '../../generated/prisma/client';

export const publicUserSelect = {
  uuid: true,
  userName: true,
  avatarUrl: true,
  isOnline: true,
  createdAt: true,
} satisfies Prisma.UserSelect;

export const authUserSelect = {
  ...publicUserSelect,
  passwordHash: true,
} satisfies Prisma.UserSelect;
