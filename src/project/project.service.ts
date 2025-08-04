import { ProjectRepository } from "./project.repository";
import { Prisma, Project } from "@prisma/client";
import { ProjectItemRs } from "./response/project-item-rs";
import { toProjectDetailRs, toProjectItemRs } from "./mapper/project.mapper";
import { ResourceNotFoundError } from "../utils/error-types";
import { ProjectsRs } from "./response/projects-rs";
import { parseDateToDateTime } from "../utils/date";
import { ProjectDetailRs } from "./response/project-detail-rs";

export class ProjectService {
  private projectRepository = new ProjectRepository();

  async createProject(data: Prisma.ProjectCreateInput): Promise<ProjectDetailRs> {
    const project = await this.projectRepository.create(
      {
        ...data,
        startDate: parseDateToDateTime(data.startDate),
        endDate: parseDateToDateTime(data.endDate),
      }
    );
    return toProjectDetailRs(project);
  }

  async getAllProjects(): Promise<Project[]> {
    return await this.projectRepository.getAll();
  }

  async getProjectsPaginated(page = 1, limit = 10): Promise<ProjectsRs> {
    const skip = (page - 1) * limit;

    const [projects, totalItems] = await Promise.all([
      this.projectRepository.getMany({ skip, take: limit }),
      this.projectRepository.countAll(),
    ]);

    const projectItems: ProjectItemRs[] = projects.map(toProjectItemRs);
    const totalPages = Math.ceil(totalItems / limit);

    return {
      projects: projectItems,
      currentPage: page,
      totalPages,
      totalItems,
    };
  }

  async getProjectById(id: string): Promise<ProjectItemRs> {
    const project = await this.projectRepository.getById(id);
    if (!project) {
      throw new ResourceNotFoundError("Proyecto no encontrado.");
    }
    return toProjectItemRs(project);
  }

  async getProjectsByUserPaginated(userId: number, page = 1, limit = 10): Promise<ProjectsRs> {
    const skip = (page - 1) * limit;

    const [projects, totalItems] = await Promise.all([
      this.projectRepository.getManyByUser(userId, { skip, take: limit }),
      this.projectRepository.countByUser(userId),
    ]);

    return {
      projects: projects.map(toProjectItemRs),
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    };
  }


  async updateProject(id: string, data: Prisma.ProjectUpdateInput): Promise<ProjectDetailRs> {
    const existing = await this.projectRepository.getById(id);
    if (!existing) {
      throw new ResourceNotFoundError("No se puede actualizar un proyecto inexistente.");
    }
      // Transformar las fechas de string a DateTime
    const transformedData = {
      ...data,
      // Si startDate existe y es string, convertirlo a DateTime
      ...(data.startDate && typeof data.startDate === 'string' && {
        startDate: new Date(`${data.startDate}T00:00:00.000Z`)
      }),
      // Si endDate existe y es string, convertirlo a DateTime  
      ...(data.endDate && typeof data.endDate === 'string' && {
        endDate: new Date(`${data.endDate}T23:59:59.999Z`)
      })
    };

    const update = await this.projectRepository.update(id, transformedData);
    return toProjectDetailRs(update);
  }

  async deleteProject(id: string): Promise<ProjectDetailRs> {
    const existing = await this.projectRepository.getById(id);
    if (!existing) {
      throw new ResourceNotFoundError("No se puede eliminar un proyecto inexistente.");
    }
    const deleted = await this.projectRepository.delete(id);
    return toProjectDetailRs(deleted);
  }
}
