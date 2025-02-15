import { Config } from "@/config";
import JobExecutionItem from "./list-item";


interface ListProps {
    page?: string;

}

export default async function JourneysList({ page }: ListProps) {
    const response = await fetch(`${Config.apiUrl}/journeys?page=${page}`);


    const data = await response.json();

    console.log(data)

    if (!data || !data.rows || data.rows.length == 0) {
        return (
            <div className="w-full p-9 rounded-3xl bg-muted text-center">
                Sem dados
            </div>
        )
    }

    return (
        <section className="space-y-4">
            {data.rows.map((item: any, i: number) => (
                <div key={i} className="">
                    <JobExecutionItem item={item} />
                </div>
            ))}
        </section>
    )
}