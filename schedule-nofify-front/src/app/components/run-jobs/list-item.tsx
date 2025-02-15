"use client"

import { format } from "date-fns"
import { ptBR } from 'date-fns/locale'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Calendar, Briefcase, ListTodo, User } from "lucide-react" // Importando os ícones necessários

interface Log {
  id: string
  date: Date
  status: "success" | "error" | "warning" | "info"
  payload: string
}

interface RumJobI {
  actionsCompleted: string,
  collaboratorName: string,
  createdAt: string,
  dateInit: string,
  job: string,
  journeyName: string,
  status: string,
  totalActions: number,
  totalAttempts: string,
  log: Log[]
}

interface JobExecutionItemProps {
  item: RumJobI
}

export default function JobExecutionItem({ item }: JobExecutionItemProps) {



  const getStatusColor = (status: RumJobI["status"]) => {
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

  const getLogStatusColor = (status: Log["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-500/15 text-green-700 dark:text-green-400"
      case "error":
        return "bg-red-500/15 text-red-700 dark:text-red-400"
      case "warning":
        return "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400"
      case "info":
        return "bg-blue-500/15 text-blue-700 dark:text-blue-400"
      default:
        return "bg-gray-500/15 text-gray-700 dark:text-gray-400"
    }
  }

  return (

    <div className="rounded-2xl border bg-card text-card-foreground shadow-sm ">
      <div className="p-6">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{format(item.dateInit, "PPp", { locale: ptBR })}</span>
          </div>

          <div className=" flex gap-2 items-center justify-between">
            <ListTodo className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {item.totalActions === 1 ? "ação" : "ações"} {item.totalActions} / {item.actionsCompleted}
            </span>

            <Badge variant="secondary" className={getStatusColor(item.status)}>
              {item.status.replace("_", " ").toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Jornada → Colaborador</p>
          <p className="text-xl">{item.journeyName} → {item.collaboratorName}</p>
        </div>

        {/* <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{item.totalActions}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ListTodo className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {item.totalActions} {item.totalActions === 1 ? "action" : "actions"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{item.collaboratorName}</span>
            </div>
          </div>
        </div> */}

      </div>
      <Accordion type="single" collapsible className=" border-t">
        <AccordionItem value="logs" className="border-none">
          <AccordionTrigger className="px-6 border-none">View Logs</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 px-6 pb-6">
              {item.log.reverse().map((log: Log, i: number) => (
                <div key={i} className="rounded-lg border bg-muted/50 p-4 text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">{format(log.date, "HH:mm:ss")}</span>
                    <Badge variant="secondary" className={getLogStatusColor(log.status)}>
                      {log.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm">{log.payload}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
