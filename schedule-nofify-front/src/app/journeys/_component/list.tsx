'use client'

import { Config } from "@/config";
import JobExecutionItem from "./list-item";
import { useEffect, useState } from "react";
import { IJourney } from "@/interfaces/journey.interface";



export default function JourneysList() {
    useEffect(
        () => { getJourneys() },
        []
    )

    const [journeys, setJourneys] = useState<IJourney[] | null>(null)



    async function getJourneys() {
        const response = await fetch(`${Config.apiUrl}/journeys`);
        const data = await response.json();
        setJourneys(data.rows)

    }




    if (!journeys) {
        return (
            <div className="w-full p-9 rounded-3xl bg-muted text-center">
                Obtendo dados...
            </div>
        )
    }

    return (
        <section className="space-y-4">
            {journeys.map((item: any, i: number) => (
                <div key={i} className="">
                    <JobExecutionItem item={item} />
                </div>
            ))}
        </section>
    )
}