"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProjectDetailRs = toProjectDetailRs;
exports.toProjectItemRs = toProjectItemRs;
function toProjectDetailRs(project) {
    return {
        id: project.id,
        title: project.title,
        status: project.status,
        startDate: project.startDate.toISOString().split("T")[0],
        timeSpentHours: project.timeSpentHours,
        teamSize: project.teamSize,
    };
}
function toProjectItemRs(project) {
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
