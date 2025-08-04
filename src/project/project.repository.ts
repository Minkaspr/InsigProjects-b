import { PrismaClient, Project, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class ProjectRepository {
  async getAll(): Promise<Project[]> {
    return await prisma.project.findMany();
  }

  async getMany(pagination: { skip: number; take: number }): Promise<Project[]> {
    return await prisma.project.findMany({
      skip: pagination.skip,
      take: pagination.take,
      orderBy: { createdAt: "desc" }, 
    });
  }

  async countAll(): Promise<number> {
    return await prisma.project.count();
  }

  async getById(id: string): Promise<Project | null> {
    return await prisma.project.findUnique({ where: { id } });
  }

  async getManyByUser(userId: number, options: { skip: number; take: number }): Promise<Project[]> {
    return prisma.project.findMany({
      where: { userId },
      skip: options.skip,
      take: options.take,
      orderBy: { startDate: "desc" },
    });
  }

  async countByUser(userId: number): Promise<number> {
    return prisma.project.count({
      where: { userId },
    });
  }


  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return await prisma.project.create({ data });
  }

  async update(id: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
    return await prisma.project.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Project> {
    return await prisma.project.delete({
      where: { id },
    });
  }
}
