import { z } from "zod";

export interface IAction {
    payload: string;
    delay: number;
    mode: string;
    trigger: string;
    maxAttempts: number;
    _id: string;
}

export interface IJourney {
    _id: string;
    name: string;
    description: string;
    status: string;
    actions: IAction[];
    totalJobs: number;
    createdAt: string;
    updatedAt: string;
}


