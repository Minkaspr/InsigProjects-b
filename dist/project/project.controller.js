"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_service_1 = require("./project.service");
const project_create_rq_1 = require("./request/project-create-rq");
const validate_request_1 = require("../utils/validate-request");
const project_update_rq_1 = require("./request/project-update-rq");
const router = (0, express_1.Router)();
const projectService = new project_service_1.ProjectService();
// POST /projects
router.post("/", (0, project_create_rq_1.projectCreateRq)(), (0, validate_request_1.validateRequest)("Datos inválidos"), async (req, res, next) => {
    try {
        const newProject = await projectService.createProject(req.body);
        const response = {
            status: "success",
            message: "Proyecto creado exitosamente",
            data: newProject,
        };
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
});
// GET /projects
router.get("/", async (_req, res, next) => {
    try {
        const projects = await projectService.getAllProjects();
        const response = {
            status: "success",
            message: "Proyectos obtenidos correctamente",
            data: projects,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
// GET /projects/paginated?page=1&limit=10
router.get("/paginated", async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const paginatedProjects = await projectService.getProjectsPaginated(page, limit);
        const response = {
            status: "success",
            message: "Proyectos paginados obtenidos correctamente",
            data: paginatedProjects,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
// GET /projects/:id
router.get("/:id", async (req, res, next) => {
    try {
        const project = await projectService.getProjectById(req.params.id);
        const response = {
            status: "success",
            message: "Proyecto encontrado",
            data: project,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
// PUT /projects/:id
router.put("/:id", (0, project_update_rq_1.projectUpdateRq)(), (0, validate_request_1.validateRequest)("Datos inválidos"), async (req, res, next) => {
    try {
        const updated = await projectService.updateProject(req.params.id, req.body);
        const response = {
            status: "success",
            message: "Proyecto actualizado correctamente",
            data: updated,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
// DELETE /projects/:id
router.delete("/:id", async (req, res, next) => {
    try {
        const deleted = await projectService.deleteProject(req.params.id);
        const response = {
            status: "success",
            message: "Proyecto eliminado correctamente",
            data: deleted,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
