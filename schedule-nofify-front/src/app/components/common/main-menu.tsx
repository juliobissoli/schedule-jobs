'use client'

import { History, TimerReset } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function MainMenu() {

    const pathname = usePathname(); // Obtendo a rota atual


    const routes = [
        { route: '/', label: 'Execuções' },
        { route: '/collaborators', label: 'Colaboradores' },
        { route: '/journeys', label: 'Jornadas' },
    ]
    return (
        <header className="sticky top-0 w-full flex justify-center p-2 ">
            <nav className="uppercase text-muted-foreground text-xs border border-border tracking-widest backdrop-blur-sm rounded-full mx-auto flex items-center justify-center gap-4 p-2 px-4 ">
               <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <History size={20} />
               </div>

                {
                    routes.map(el => (
                        <Link href={el.route} key={el.route} className={pathname === el.route ? 'font-semibold text-primary' : 'hover:text-primary'}>
                            {el.label}
                        </Link>
                    ))
                }

            </nav>
        </header>
    )
}