'use client'

import JobExecutionItem from "./list-item";
import { useEffect, useState } from "react";
import { Config } from "@/config";


export default function RunJobsList() {

    useEffect(
        () => { getRunners() },
        []
    )

    const [runJobs, setRunJobs] = useState<any | null>(null)



    async function getRunners() {
        const response = await fetch(`${Config.apiUrl}/run-jobs`);
        const data = await response.json();
        setRunJobs(data.rows)

    }

    if (!runJobs) {
        return (
            <div className="w-full p-9 rounded-3xl bg-muted text-center">
                Obtendo dados...
            </div>
        )
    }


    return (
        <div className="space-y-4">
            {runJobs.map((item: any, i: number) => (
                <div key={i}>
                    <JobExecutionItem item={item} />
                    {/* {item.collaboratorName} */}
                </div>
            ))}
        </div>
    )
}