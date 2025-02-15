

export default async function CollaboratorsJobsList() {

    const response = await fetch(`http://localhost:3000/jobs`);


    const data = await response.json();

    console.log(data)


    if(!data ) {
        return <h1>Error</h1>
    }


    return (
        <div className="mt-8 space-y-4">
            {data.rows.map((item: any, i:number) => (
                <div key={i}>
                    {item.startDate}
                    {/* {item.collaboratorName} */}
                    </div>
            ))}
        </div>
    )
}
