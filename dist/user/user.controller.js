"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("./user.service");
const validate_request_1 = require("../utils/validate-request");
const user_create_rq_1 = require("./request/user-create-rq");
const user_update_rq_1 = require("./request/user-update-rq");
const project_service_1 = require("../project/project.service");
const router = (0, express_1.Router)();
const userService = new user_service_1.UserService();
const projectService = new project_service_1.ProjectService();
// POST /users - Crear nuevo usuario
router.post("/", (0, user_create_rq_1.userCreateRq)(), (0, validate_request_1.validateRequest)("Datos inválidos"), async (req, res, next) => {
    try {
        const data = req.body;
        const newUser = await userService.createUser(data);
        const response = {
            status: "success",
            message: "Usuario creado exitosamente",
            data: newUser,
        };
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
});
// GET /users - Obtener todos los usuarios
router.get("/", async (_req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        const response = {
            status: "success",
            message: "Usuarios obtenidos correctamente",
            data: users,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
// GET /users/paginated?page=1&limit=10
router.get("/paginated", async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search?.trim() || "";
        const paginatedUsers = await userService.getUsersPaginated(page, limit, search);
        const response = {
            status: "success",
            message: "Usuarios paginados obtenidos correctamente",
            data: paginatedUsers,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
// GET /users/:id - Obtener un usuario por ID
router.get("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const user = await userService.getUserById(id);
        const response = {
            status: "success",
            message: "Usuario encontrado",
            data: user,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
// GET /users/:id/projects?page=1&limit=10 - Obtener proyectos de un usuario
router.get("/:id/projects", async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const userProjects = await projectService.getProjectsByUserPaginated(userId, page, limit);
        const response = {
            status: "success",
            message: "Proyectos del usuario obtenidos correctamente",
            data: userProjects,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
// PUT /users/:id - Actualizar un usuario
router.put("/:id", (0, user_update_rq_1.userUpdateRq)(), (0, validate_request_1.validateRequest)("Datos inválidos"), async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updatedUser = await userService.updateUser(id, data);
        const response = {
            status: "success",
            message: "Usuario actualizado correctamente",
            data: updatedUser,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
// DELETE /users/:id - Eliminar usuario
router.delete("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const deletedUser = await userService.deleteUser(id);
        const response = {
            status: "success",
            message: "Usuario eliminado correctamente",
            data: deletedUser,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
