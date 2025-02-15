'use client'

import { Button } from "@/components/ui/button";
import { Config } from "@/config";
import CollaboratorSheetAssociateForm from "./_components/sheet-associate-form";
import CollaboratorsJobsList from "./_components/jobs-list";
import { AppPageTitle } from "@/app/components/common/app-components-utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ICollaborator } from "@/interfaces/collaborator.interface";
import { ArrowLeft, Phone, Send, User, UserCircle2Icon } from "lucide-react";
import Link from "next/link";




const CollaboratorDetailPage = () => {
    const params = useParams(); // Atribuindo o resultado de useParams a uma variável

    useEffect(
        () => {
            getCollaborator()
        },
        []
    )


    const [collaborator, setCollaborator] = useState<ICollaborator | null>(null)

    if (!params?.id) {
        return <h1>Loading..</h1>
    }

    async function getCollaborator() {
        const response = await fetch(`${Config.apiUrl}/collaborators/${params.id}`);

        const data = await response.json();

        setCollaborator(data)

    }

    if (!collaborator) {
        return (
            <div className="w-full p-9 rounded-3xl bg-muted text-center">
                Obtendo dados...
            </div>
        )
    }

    return (
        <>
            <section className="py-8 ">
                <Link href={'/collaborators'}>
                    <Button size={'sm'} variant={'ghost'} className="my-8">
                        <ArrowLeft size={14} />
                        Voltar
                    </Button>
                </Link>

                <div className="flex items-center gap-3 bg-muted p-4 rounded-3xl">
                <UserCircle2Icon size={38} />
                <div className="">
                    <h1 className="text-3xl mb-2">{collaborator.name}</h1>
                    <div className=" space-x-4 text-lg">
                        <span className="text-muted-foreground inline-flex gap-2 items-center">
                            <Send size={14} /> {collaborator.email} </span>
                        <span className="text-muted-foreground inline-flex gap-2 items-center">
                            <Phone size={14} />
                            {collaborator.phone ? `+${collaborator.phone.slice(0, 2)} (${collaborator.phone.slice(2, 4)}) ${collaborator.phone.slice(4, 9)}-${collaborator.phone.slice(9)}` : 'N/A'}
                        </span>
                    </div>
                </div>
                </div>
            </section>

            <section>
                <div className="flex py-2 justify-between border-b mb-2 border-border">
                    <AppPageTitle className="">Jornadas associadas ({collaborator.totalJobs}):</AppPageTitle>
                </div>


                <CollaboratorsJobsList collaboratorId={collaborator._id} />

            </section>
        </>
    )
}


export default CollaboratorDetailPage