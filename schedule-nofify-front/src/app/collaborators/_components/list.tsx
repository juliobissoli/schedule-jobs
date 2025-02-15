import { Config } from "@/config";
import { Phone, Send } from "lucide-react";
import Link from "next/link";

interface PageProps {
    page?: string;

}

export default async function CollaboratorsList({ page }: PageProps) {
    const response = await fetch(`${Config.apiUrl}/collaborators?page=${page}`);


    const data = await response.json();

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
                <Link href={`collaborators/${item._id}`} key={i} className=" p-4 border flex justify-between items-center border-border rounded-2xl overflow-auto hover:border-primary highlight-hover ">
                    <div className="">
                        <p className="text-xl">{item.name}</p>
                        <div className=" space-x-4">
                            <span className="text-muted-foreground inline-flex gap-2 items-center text-sm">
                                <Send size={14} /> {item.email} </span>
                            <span className="text-muted-foreground inline-flex gap-2 items-center text-sm">
                                <Phone size={14} />
                                {item.phone ? `+${item.phone.slice(0, 2)} (${item.phone.slice(2, 4)}) ${item.phone.slice(4, 9)}-${item.phone.slice(9)}` : 'N/A'}
                            </span>
                        </div>
                    </div>
                    <div className=" text-muted-foreground ">
                        jornadas associadas: {item.totalJobs}
                    </div>

                </Link>
            ))}
        </section>
    )
}