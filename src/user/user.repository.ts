import { PrismaClient, User, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  async getAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async getMany(params: { skip: number; take: number;  where?: Prisma.UserWhereInput }): Promise<(User & { _count: { projects: number } })[]> {
    return await prisma.user.findMany({
      skip: params.skip,
      take: params.take,
      where: params.where,
      orderBy: { id: "desc" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });
  }

  async countAll(where?: Prisma.UserWhereInput): Promise<number> {
    return await prisma.user.count({ where });
  }

  async getById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
      include: { projects: false }, 
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<User> {
    return await prisma.user.delete({
      where: { id },
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }  
}
