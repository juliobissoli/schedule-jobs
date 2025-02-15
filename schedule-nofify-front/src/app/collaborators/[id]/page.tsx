'use client'

import { Button } from "@/components/ui/button";
import { Config } from "@/config";
import CollaboratorSheetAssociateForm from "./_components/sheet-associate-form";
import CollaboratorsJobsList from "./_components/jobs-list";
import { AppPageTitle } from "@/app/components/common/app-components-utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ICollaborator } from "@/interfaces/collaborator.interface";
import { ArrowLeft, User } from "lucide-react";
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
                <h1 className="text-3xl mb-2">{collaborator.name}</h1>
                <p className="text-xl text-muted-foreground mb-2">{collaborator.email}</p>
                <p className="text-xl text-muted-foreground mb-2">{collaborator.phone}</p>
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