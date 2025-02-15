import JourneysHeader from "./_component/header";
import JourneysList from "./_component/list";


interface PageProps {
    params: {
        page: string;
    };
}


const JourneysPage = async ({ params }: PageProps) => {

    return (
        <>
            <section>
                <JourneysHeader />
            </section>
            <section>
                <JourneysList page={params.page} />
            </section>
        </>
    )
}

export default JourneysPage