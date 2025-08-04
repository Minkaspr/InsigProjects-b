import { Project } from "@prisma/client";
import { ProjectDetailRs } from "../response/project-detail-rs";
import { ProjectItemRs } from "../response/project-item-rs";

export function toProjectDetailRs(project: Project): ProjectDetailRs {
  return {
    id: project.id,
    title: project.title,
    status: project.status,
    startDate: project.startDate.toISOString().split("T")[0],
    timeSpentHours: project.timeSpentHours,
    teamSize: project.teamSize,
  };
}

export function toProjectItemRs(project: Project): ProjectItemRs {
  return {
    id: project.id,
    title: project.title,
    status: project.status,
    startDate: project.startDate.toISOString().split("T")[0],
    endDate: project.endDate.toISOString().split("T")[0],
    timeSpentHours: project.timeSpentHours,
    teamSize: project.teamSize,
    techStack: project.techStack,
    reason: project.reason,
    learnings: project.learnings,
  };
}