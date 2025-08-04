import { Status } from "@prisma/client";

export interface ProjectItemRs {
  id: string;
  title: string;
  status: Status;
  startDate: string; // formato ISO o YYYY-MM-DD
  endDate: string; // formato ISO o YYYY-MM-DD
  timeSpentHours: number
  teamSize: number
  techStack: string[]
  reason: string
  learnings: string
}
