import { UserItemRs } from "./user-item-rs.js";

export interface UsersRs {
  users: UserItemRs[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}