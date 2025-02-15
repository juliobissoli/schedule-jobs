import CollaboratorsList from "./_components/list";
import CollaboratorsHeader from "./_components/header";

interface PageProps {
    params: {
        page: string;
    };
}


const CollaboratorsPage = async ({ params }: PageProps) => {

    return (
        <>

            <div>
                <CollaboratorsHeader />
            </div>
            <section>
                <CollaboratorsList page={params.page} />
            </section>
        </>
    )
}

export default CollaboratorsPage