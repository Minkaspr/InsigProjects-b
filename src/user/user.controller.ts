import { Request, Response, NextFunction, Router } from "express";
import { UserService } from "./user.service";
import { Prisma } from "@prisma/client";
import { ApiResponse } from "../utils/api-response";
import { validateRequest } from "../utils/validate-request";
import { userCreateRq } from "./request/user-create-rq";
import { userUpdateRq } from "./request/user-update-rq";
import { UsersRs } from "./response/users-rs";
import { ProjectsRs } from "../project/response/projects-rs";
import { ProjectService } from "../project/project.service";
import { UserDetailRs } from "./response/user-detail-rs";
import { UserItemRs } from "./response/user-item-rs";

const router = Router();
const userService = new UserService();
const projectService = new ProjectService()

// POST /users - Crear nuevo usuario
router.post(
  "/",
  userCreateRq(),         
  validateRequest("Datos inválidos"),  
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const newUser = await userService.createUser(data);

      const response: ApiResponse<UserDetailRs> = {
        status: "success",
        message: "Usuario creado exitosamente",
        data: newUser,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error); 
    }
  }
);

// GET /users - Obtener todos los usuarios
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    const response: ApiResponse<typeof users> = {
      status: "success",
      message: "Usuarios obtenidos correctamente",
      data: users,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET /users/paginated?page=1&limit=10
router.get("/paginated", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string)?.trim() || "";

    const paginatedUsers = await userService.getUsersPaginated(page, limit, search);

    const response: ApiResponse<UsersRs> = {
      status: "success",
      message: "Usuarios paginados obtenidos correctamente",
      data: paginatedUsers,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET /users/:id - Obtener un usuario por ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);

    const response: ApiResponse<UserDetailRs> = {
      status: "success",
      message: "Usuario encontrado",
      data: user,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET /users/:id/projects?page=1&limit=10 - Obtener proyectos de un usuario
router.get("/:id/projects", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.id);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const userProjects = await projectService.getProjectsByUserPaginated(userId, page, limit);

    const response: ApiResponse<ProjectsRs> = {
      status: "success",
      message: "Proyectos del usuario obtenidos correctamente",
      data: userProjects,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});


// PUT /users/:id - Actualizar un usuario
router.put(
  "/:id",
  userUpdateRq(),
  validateRequest("Datos inválidos"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data: Prisma.UserUpdateInput = req.body;
      const updatedUser = await userService.updateUser(id, data);

      const response: ApiResponse<UserDetailRs> = {
        status: "success",
        message: "Usuario actualizado correctamente",
        data: updatedUser,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /users/:id - Eliminar usuario
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const deletedUser = await userService.deleteUser(id);

    const response: ApiResponse<UserDetailRs> = {
      status: "success",
      message: "Usuario eliminado correctamente",
      data: deletedUser,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
