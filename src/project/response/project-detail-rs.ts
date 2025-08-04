import { Status } from "@prisma/client";

export interface ProjectDetailRs {
  id: string;
  title: string;
  status: Status;
  startDate: string; // formato ISO o YYYY-MM-DD
  timeSpentHours: number;
  teamSize: number;
}
