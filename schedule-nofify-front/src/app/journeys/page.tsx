import JourneysHeader from "./_component/header";
import JourneysList from "./_component/list";




const JourneysPage = async () => {

    return (
        <>
            <section>
                <JourneysHeader />
            </section>
            <section>
                <JourneysList />
            </section>
        </>
    )
}

export default JourneysPage