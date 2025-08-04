import { User } from "@prisma/client";
import { UserDetailRs } from "../response/user-detail-rs";

export function toUserDetailRs(user: User): UserDetailRs {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    createdAt: user.createdAt.toISOString().split("T")[0],
  };
}
