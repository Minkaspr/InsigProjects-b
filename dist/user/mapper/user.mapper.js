"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserDetailRs = toUserDetailRs;
function toUserDetailRs(user) {
    return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        createdAt: user.createdAt.toISOString().split("T")[0],
    };
}
