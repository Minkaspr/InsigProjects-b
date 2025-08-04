"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const error_types_1 = require("../utils/error-types");
const user_mapper_1 = require("./mapper/user.mapper");
const user_repository_1 = require("./user.repository");
class UserService {
    userRepository = new user_repository_1.UserRepository();
    async createUser(data) {
        const existingUser = await this.userRepository.getByEmail(data.email);
        if (existingUser) {
            throw new error_types_1.DuplicateResourceError("El correo ya está registrado.");
        }
        const user = await this.userRepository.create(data);
        return (0, user_mapper_1.toUserDetailRs)(user);
    }
    async getAllUsers() {
        return await this.userRepository.getAll();
    }
    async getUsersPaginated(page = 1, limit = 10, search = "") {
        const skip = (page - 1) * limit;
        const whereClause = search
            ? {
                OR: [
                    { firstName: { contains: search, mode: "insensitive" } },
                    { lastName: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                ],
            }
            : undefined;
        const [users, totalItems] = await Promise.all([
            this.userRepository.getMany({ skip, take: limit, where: whereClause }),
            this.userRepository.countAll(whereClause),
        ]);
        const userItems = users.map((user) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            createdAt: user.createdAt.toISOString(),
            projects: user._count.projects,
        }));
        const totalPages = Math.ceil(totalItems / limit);
        return {
            users: userItems,
            currentPage: page,
            totalPages,
            totalItems,
        };
    }
    async getUserById(id) {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new error_types_1.ResourceNotFoundError("Usuario no encontrado.");
        }
        return (0, user_mapper_1.toUserDetailRs)(user);
    }
    async updateUser(id, data) {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new error_types_1.ResourceNotFoundError("Usuario no encontrado.");
        }
        const userUpd = await this.userRepository.update(id, data);
        return (0, user_mapper_1.toUserDetailRs)(userUpd);
    }
    async deleteUser(id) {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new error_types_1.ResourceNotFoundError("Usuario no encontrado.");
        }
        const userDel = await this.userRepository.delete(id);
        return (0, user_mapper_1.toUserDetailRs)(userDel);
    }
}
exports.UserService = UserService;
