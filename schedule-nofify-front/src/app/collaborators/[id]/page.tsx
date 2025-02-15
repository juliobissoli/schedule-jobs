import { Button } from "@/components/ui/button";
import { Config } from "@/config";
import CollaboratorSheetAssociateForm from "./_components/sheet-associate-form";
import CollaboratorsJobsList from "./_components/jobs-list";


interface PageProps {
    params: {
        id: string;
    };
}

const CollaboratorDetailPage = async ({ params }: PageProps) => {

    if (!params.id) {
        return <h1>Error</h1>
    }
    const response = await fetch(`${Config.apiUrl}/collaborators/${params.id}`);

    const collaborator = await response.json();

    console.log(collaborator)

    if (!collaborator) {
        return (
            <div className="w-full p-9 rounded-3xl bg-muted text-center">
                Colaborador não encontrado
            </div>
        )
    }

    return (
        <>
            <section className="py-8">
                <h1 className="text-3xl mb-2">{collaborator.name}</h1>
                <p className="text-xl text-muted-foreground mb-2">{collaborator.email}</p>
                <p className="text-xl text-muted-foreground mb-2">{collaborator.phone}</p>
            </section>

            <section>
                <header className="flex py-2 justify-between border-b mb-2 border-border">
                    <h2 className="text-xl">Jornadas associadas ({collaborator.totalJobs}):</h2>
                </header>

                <CollaboratorSheetAssociateForm collaboratorId={params.id}>
                    <Button className="w-full py-8" variant={'outline'}>
                        Associar {collaborator.totalJobs > 0 ? 'nova' : "primeira"} jornada
                    </Button>
                </CollaboratorSheetAssociateForm>

                <CollaboratorsJobsList />

            </section>
        </>
    )
}


export default CollaboratorDetailPage