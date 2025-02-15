import { ILogRunJob } from "../entities/run-job.entity";

export class CreateRunJobDto {
    job: string;
    dateInit: Date;
    status: string;
    totalActions: number;
    collaboratorName: String;
    journeyName: String
    log: ILogRunJob[];
    isSequential: boolean;
}
