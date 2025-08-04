"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const project_repository_1 = require("./project.repository");
const project_mapper_1 = require("./mapper/project.mapper");
const error_types_1 = require("../utils/error-types");
const date_1 = require("../utils/date");
class ProjectService {
    projectRepository = new project_repository_1.ProjectRepository();
    async createProject(data) {
        const project = await this.projectRepository.create({
            ...data,
            startDate: (0, date_1.parseDateToDateTime)(data.startDate),
            endDate: (0, date_1.parseDateToDateTime)(data.endDate),
        });
        return (0, project_mapper_1.toProjectDetailRs)(project);
    }
    async getAllProjects() {
        return await this.projectRepository.getAll();
    }
    async getProjectsPaginated(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [projects, totalItems] = await Promise.all([
            this.projectRepository.getMany({ skip, take: limit }),
            this.projectRepository.countAll(),
        ]);
        const projectItems = projects.map(project_mapper_1.toProjectItemRs);
        const totalPages = Math.ceil(totalItems / limit);
        return {
            projects: projectItems,
            currentPage: page,
            totalPages,
            totalItems,
        };
    }
    async getProjectById(id) {
        const project = await this.projectRepository.getById(id);
        if (!project) {
            throw new error_types_1.ResourceNotFoundError("Proyecto no encontrado.");
        }
        return (0, project_mapper_1.toProjectItemRs)(project);
    }
    async getProjectsByUserPaginated(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [projects, totalItems] = await Promise.all([
            this.projectRepository.getManyByUser(userId, { skip, take: limit }),
            this.projectRepository.countByUser(userId),
        ]);
        return {
            projects: projects.map(project_mapper_1.toProjectItemRs),
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
            totalItems,
        };
    }
    async updateProject(id, data) {
        const existing = await this.projectRepository.getById(id);
        if (!existing) {
            throw new error_types_1.ResourceNotFoundError("No se puede actualizar un proyecto inexistente.");
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
        return (0, project_mapper_1.toProjectDetailRs)(update);
    }
    async deleteProject(id) {
        const existing = await this.projectRepository.getById(id);
        if (!existing) {
            throw new error_types_1.ResourceNotFoundError("No se puede eliminar un proyecto inexistente.");
        }
        const deleted = await this.projectRepository.delete(id);
        return (0, project_mapper_1.toProjectDetailRs)(deleted);
    }
}
exports.ProjectService = ProjectService;
