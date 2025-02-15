import JobExecutionItem from "./list-item";

interface PageProps {
    page?: string;

}

export default async function RunJobsList({ page }: PageProps) {

    const response = await fetch(`http://localhost:3000/run-jobs?page=${page}`);


    const data = await response.json();

    console.log(data)

    return (
        <div className="space-y-4">
            {data.rows.map((item: any, i:number) => (
                <div key={i}>
                    <JobExecutionItem item={item} />
                    {/* {item.collaboratorName} */}
                    </div>
            ))}
        </div>
    )
}