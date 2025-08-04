"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProjectRepository {
    async getAll() {
        return await prisma.project.findMany();
    }
    async getMany(pagination) {
        return await prisma.project.findMany({
            skip: pagination.skip,
            take: pagination.take,
            orderBy: { createdAt: "desc" },
        });
    }
    async countAll() {
        return await prisma.project.count();
    }
    async getById(id) {
        return await prisma.project.findUnique({ where: { id } });
    }
    async getManyByUser(userId, options) {
        return prisma.project.findMany({
            where: { userId },
            skip: options.skip,
            take: options.take,
            orderBy: { startDate: "desc" },
        });
    }
    async countByUser(userId) {
        return prisma.project.count({
            where: { userId },
        });
    }
    async create(data) {
        return await prisma.project.create({ data });
    }
    async update(id, data) {
        return await prisma.project.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return await prisma.project.delete({
            where: { id },
        });
    }
}
exports.ProjectRepository = ProjectRepository;
