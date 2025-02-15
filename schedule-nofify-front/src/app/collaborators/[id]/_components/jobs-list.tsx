'use client'

import { Badge } from "@/components/ui/badge";
import { Config } from "@/config";
import { IJob, getJobStatusColor } from "@/interfaces/job.interface";
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale'
import { Calendar, CalendarCheck, CalendarSync, ListTodo } from "lucide-react";
import { useEffect, useState } from "react";


export default function CollaboratorsJobsList({ collaboratorId }: { collaboratorId: string }) {

    const [jobs, setJobs] = useState<IJob[]>([])

    useEffect(() => {
        getJob()
    }, [collaboratorId])

    async function getJob() {
        const response = await fetch(`${Config.apiUrl}/jobs?collaboratorId=${collaboratorId}`);
        const data = await response.json();

        console.log(data)

        setJobs(data.rows)
    }






    if (!jobs) {
        return <h1>Obtendo dados</h1>
    }


    return (
        <div className="mt-8 space-y-4">
            {jobs.map((item: IJob, i: number) => (
                <div key={i} className="p-4 rounded-2xl border border-border ">
                    <div className="flex justify-between">
                        {
                            item.daily ?
                                (
                                    <div className="flex items-center space-x-2">
                                        <CalendarSync className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">Executar todo dia as {item.hour} hrs | apartr de  {format(item.startDate, "dd/MM/yy", { locale: ptBR })}</span>
                                    </div>
                                )
                                : (
                                    <div className="flex items-center space-x-2">
                                        <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            Executar apenas em {format(item.startDate, "dd/MM/yy", { locale: ptBR })} as {item.hour} hrs
                                            {
                                                item.completedAt && (
                                                    <strong> (executado em:  {format(item.completedAt, "PPp", { locale: ptBR })})</strong>
                                                )
                                            }
                                        </span>
                                    </div>
                                )
                        }



                        <div className=" flex gap-2 items-center justify-between">
                            <Badge variant="secondary" className={getJobStatusColor(item.status)}>
                                {item.status.replace("_", " ").toUpperCase()}
                            </Badge>
                        </div>

                    </div>

                    <div className="mt-4">
                        <p className="text-sm text-muted-foreground">Jornada</p>
                        <p className="text-xl">{item?.journey?.name}</p>
                    </div>

                    <div className="flex justify-between">

                        <div className=" flex gap-2 items-center justify-between">
                            <ListTodo className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                                {item?.journey?.actions.length === 1 ? "ação" : "ações"} {item?.journey?.actions.length}
                            </span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">criado  {format(item.startDate, "PPp", { locale: ptBR })}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
