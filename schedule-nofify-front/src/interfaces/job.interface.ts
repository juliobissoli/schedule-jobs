import { z } from "zod";

export const JobFormSchema =  z.object({
    date: z.date(),
    hour: z.number().min(0),
    daily: z.boolean().default(false).optional(),
})


interface IAction {
    payload: string;
    delay: number;
    mode: string;
    trigger: string;
    maxAttempts: number;
    _id: string;
}

interface IJourney {
    _id: string;
    name: string;
    description: string;
    status: string;
    actions: IAction[];
    totalJobs: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IJob {
    _id: string;
    hour: number;
    journey?: IJourney;
    collaborator: string;
    collaboratorName: string;
    collaboratorPhone: string;
    collaboratorEmail: string;
    status: string;
    startDate: string;
    daily: boolean;
    completedAt: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export const getJobStatusColor = (status: IJob["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500/15 text-green-700 dark:text-green-400"
      case "failed":
        return "bg-red-500/15 text-red-700 dark:text-red-400"
      case "in_progress":
        return "bg-blue-500/15 text-blue-700 dark:text-blue-400"
      case "pending":
        return "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400"
      default:
        return "bg-gray-500/15 text-gray-700 dark:text-gray-400"
    }
  }
