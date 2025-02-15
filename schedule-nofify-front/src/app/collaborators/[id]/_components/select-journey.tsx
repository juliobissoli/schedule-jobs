'use client'

import DebouncedInput from "@/app/components/common/debounce-input";
import { Config } from "@/config";
import { IJourney } from "@/interfaces/journey.interface";
import { useState } from "react";


interface CollaboratorSelectJourneyProps {
    onSelect: (journey: any) => void
}

export default function CollaboratorSelectJourney({ onSelect }: CollaboratorSelectJourneyProps) {

    const [token, setToken] = useState('')

    const [journeys, setJourneys] = useState<IJourney[]>([])


    async function getJourneys(str: string) {

        setToken(str)

        if (str != token) {


            const response = await fetch(`${Config.apiUrl}/journeys`);


            const data = await response.json();

            setJourneys(data.rows)
        }



    }

    return (
        <div className="relative">
            <DebouncedInput value={token} placeholder="Procurar jornada" change={getJourneys} />

            {
                journeys.length > 0 && (
                    <div className="space-y-4 mt-2 p-4 bg-muted rounded-2xl max-h-60 overflow-auto">
                        {journeys.map((el: IJourney, i: number) => (
                            <div key={i}
                                onClick={() => onSelect(el)}
                                className={`w-full border cursor-pointer hover:border-primary bg-background  rounded-2xl p-3 border-border`}>
                                <p className="text-sm">{el.name} </p>
                                <p className="text-xs text-muted-foreground h-4 line-clamp-1">{el.description}</p>
                            </div>
                        ))}
                    </div>

                )
            }
        </div>
    )
}