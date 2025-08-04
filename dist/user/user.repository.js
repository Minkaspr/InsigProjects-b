"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserRepository {
    async getAll() {
        return await prisma.user.findMany();
    }
    async getMany(params) {
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
    async countAll(where) {
        return await prisma.user.count({ where });
    }
    async getById(id) {
        return await prisma.user.findUnique({
            where: { id },
            include: { projects: false },
        });
    }
    async create(data) {
        return await prisma.user.create({
            data,
        });
    }
    async update(id, data) {
        return await prisma.user.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return await prisma.user.delete({
            where: { id },
        });
    }
    async getByEmail(email) {
        return await prisma.user.findUnique({
            where: { email },
        });
    }
}
exports.UserRepository = UserRepository;
