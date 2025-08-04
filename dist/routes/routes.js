"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../user/user.controller"));
const project_controller_1 = __importDefault(require("../project/project.controller"));
const router = (0, express_1.Router)();
router.use("/users", user_controller_1.default);
router.use("/projects", project_controller_1.default);
exports.default = router;
