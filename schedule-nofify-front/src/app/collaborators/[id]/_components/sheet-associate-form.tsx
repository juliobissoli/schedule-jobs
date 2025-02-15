'use client'

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Config } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface CollaboratorSheetAssociateFormProps {
    children: React.ReactNode,
    collaboratorId: string
}
export default function CollaboratorSheetAssociateForm({ children, collaboratorId}: CollaboratorSheetAssociateFormProps) {

    const { toast } = useToast()

    const router = useRouter()


    const [journeys, setJourneys] = useState([])
    const [journeySelectedId, selectJourney] = useState()

    useEffect(() => {
        getJourneys()
    }, [])


    async function getJourneys() {
        const response = await fetch(`${Config.apiUrl}/journeys`);


        const data = await response.json();

        console.log(data)

        setJourneys(data.rows)
    }

    async function onSubmit() {
        try {

            const data = {
                collaborator: collaboratorId,
                journey: journeySelectedId,
                startDate: new Date().toISOString(),
                daily: false
            }
            console.log(data, Config.apiUrl)

            const response = await fetch(`${Config.apiUrl}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                toast({
                    title: 'Erro',
                    description: "Erro ao adicionar colaborador",
                    variant: 'destructive'
                })
            }
            else {


                toast({
                    title: 'Sucesso',
                    description: "Colaborador adicionado com sucesso!",
                })
            }

            router.refresh();

        } catch (error) {
            toast({
                title: 'Erro',
                description: "Erro ao adicionar colaborador",
                variant: 'destructive'
            })
        }
    }

    return (

        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>

            <SheetContent>
                <SheetTitle>
                    Associar Jornaad
                </SheetTitle>

                <div className="space-y-4">
                    {journeys.map((el: any, i: number) => (
                        <div key={i}
                            onClick={() => {
                                selectJourney(journeySelectedId === el._id ? undefined : el._id)
                            }}
                            className={`w-full border cursor-pointer  rounded-3xl p-3 ${journeySelectedId === el._id ? 'border-primary' : 'border-border'}`}>
                            <p>{el.name} </p>
                            <p className="text-sm text-muted-foreground h-10 line-clamp-2">{el.description}</p>
                        </div>
                    ))}
                </div>

                <Button className="mt-4" onClick={onSubmit} disabled={!journeySelectedId}>
                    Salvar
                </Button>


            </SheetContent>
        </Sheet>
    )
}