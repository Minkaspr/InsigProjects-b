import { Request, Response, NextFunction, Router } from "express";
import { ProjectService } from "./project.service";
import { ApiResponse } from "../utils/api-response";
import { projectCreateRq } from "./request/project-create-rq";
import { validateRequest } from "../utils/validate-request";
import { projectUpdateRq } from "./request/project-update-rq";
import { ProjectItemRs } from "./response/project-item-rs";
import { ProjectsRs } from "./response/projects-rs";
import { ProjectDetailRs } from "./response/project-detail-rs";

const router = Router();
const projectService = new ProjectService();

// POST /projects
router.post("/", 
  projectCreateRq(),
  validateRequest("Datos inválidos"),
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProject = await projectService.createProject(req.body);

    const response: ApiResponse<ProjectDetailRs> = {
      status: "success",
      message: "Proyecto creado exitosamente",
      data: newProject,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// GET /projects
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await projectService.getAllProjects();

    const response: ApiResponse<typeof projects> = {
      status: "success",
      message: "Proyectos obtenidos correctamente",
      data: projects,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET /projects/paginated?page=1&limit=10
router.get("/paginated", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const paginatedProjects = await projectService.getProjectsPaginated(page, limit);

    const response: ApiResponse<ProjectsRs> = {
      status: "success",
      message: "Proyectos paginados obtenidos correctamente",
      data: paginatedProjects,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET /projects/:id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await projectService.getProjectById(req.params.id);

    const response: ApiResponse<ProjectItemRs> = {
      status: "success",
      message: "Proyecto encontrado",
      data: project,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// PUT /projects/:id
router.put("/:id", 
  projectUpdateRq(),
  validateRequest("Datos inválidos"),
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await projectService.updateProject(req.params.id, req.body);

    const response: ApiResponse<ProjectDetailRs> = {
      status: "success",
      message: "Proyecto actualizado correctamente",
      data: updated,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// DELETE /projects/:id
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await projectService.deleteProject(req.params.id);

    const response: ApiResponse<ProjectDetailRs> = {
      status: "success",
      message: "Proyecto eliminado correctamente",
      data: deleted,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;