'use client'

import DebouncedInput from "@/app/components/common/debounce-input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Plus } from "lucide-react"
import { useState } from "react"
import JourneyForm from "./form"


export default function JourneysHeader() {

    const [searToken, setSearch] = useState('')

    return (

        <div className="flex justify-between gap-2 mt-8 py-3">
            <div>
                <DebouncedInput value={searToken} change={(e) => {
                    setSearch(e)
                    console.log(e)
                    }} />
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size={'icon'}><Plus /></Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetTitle>
                        Formuário de jornada
                    </SheetTitle>

                    <JourneyForm />
                </SheetContent>
            </Sheet>
   
        </div>
    )
}