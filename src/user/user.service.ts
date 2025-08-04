import { DuplicateResourceError, ResourceNotFoundError } from "../utils/error-types";
import { toUserDetailRs } from "./mapper/user.mapper";
import { UserDetailRs } from "./response/user-detail-rs";
import { UserItemRs } from "./response/user-item-rs";
import { UsersRs } from "./response/users-rs";
import { UserRepository } from "./user.repository";
import { Prisma } from "@prisma/client";

export class UserService {
  private userRepository = new UserRepository();

  async createUser(data: Prisma.UserCreateInput): Promise<UserDetailRs> {
    const existingUser = await this.userRepository.getByEmail(data.email);
    if (existingUser) {
      throw new DuplicateResourceError("El correo ya está registrado.");
    }
    const user = await this.userRepository.create(data);
    return toUserDetailRs(user);
  }

  async getAllUsers() {
    return await this.userRepository.getAll();
  }

  async getUsersPaginated(page = 1, limit = 10, search = ""): Promise<UsersRs> {
    const skip = (page - 1) * limit;

    const whereClause = search
      ? {
          OR: [
            { firstName: { contains: search, mode: "insensitive" as const } },
            { lastName: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : undefined;

    const [users, totalItems] = await Promise.all([
      this.userRepository.getMany({ skip, take: limit, where: whereClause}),
      this.userRepository.countAll(whereClause),
    ]);

    const userItems: UserItemRs[] = users.map((user) => ({
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

  async getUserById(id: number): Promise<UserDetailRs> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new ResourceNotFoundError("Usuario no encontrado.");
    }
    return toUserDetailRs(user);
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<UserDetailRs> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new ResourceNotFoundError("Usuario no encontrado.");
    }
    const userUpd = await this.userRepository.update(id, data);
    return toUserDetailRs(userUpd);
  }

  async deleteUser(id: number): Promise<UserDetailRs> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new ResourceNotFoundError("Usuario no encontrado.");
    }
    const userDel = await this.userRepository.delete(id);
    return toUserDetailRs(userDel);
  }
}
