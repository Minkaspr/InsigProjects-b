import { ProjectItemRs } from "./project-item-rs";

export interface ProjectsRs {
  projects: ProjectItemRs[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}