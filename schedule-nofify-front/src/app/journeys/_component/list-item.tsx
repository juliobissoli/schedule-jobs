"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


interface IJourneyAction {
    delay: number;
    maxAttempts: number;
    mode: string;
    payload: string;
    trigger: string;
}

interface JourneyI {
    description: string
    name: string
    status: string
    totalJobs: number
    actions: IJourneyAction[]
}

interface JobExecutionItemProps {
    item: JourneyI
}

export default function JobExecutionItem({ item }: JobExecutionItemProps) {



    const getStatusColor = (status: JourneyI["status"]) => {
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
    return (

        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm ">
            <div className="p-6">


                <div className="mt-4">
                    <p className="text-xl">{item.name} </p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
            </div>
            <Accordion type="single" collapsible className=" border-t">
                <AccordionItem value="logs" className="border-none">
                    <AccordionTrigger className="px-6 border-none">Ações</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 px-6 pb-6">
                            {item.actions.map((action: IJourneyAction, i: number) => (
                                <div key={i} className="rounded-2xl border bg-muted/50 p-4 text-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-muted-foreground">{action.trigger}</span>
                                    </div>
                                    <p className="text-sm">{action.payload}</p>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
