import CollaboratorsList from "./_components/list";
import CollaboratorsHeader from "./_components/header";


const CollaboratorsPage = async () => {

    return (
        <>

            <div>
                <CollaboratorsHeader />
            </div>
            <section>
                <CollaboratorsList />
            </section>
        </>
    )
}

export default CollaboratorsPage