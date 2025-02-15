'use client'

import DebouncedInput from "@/app/components/common/debounce-input"
import CollaboratorsSheetForm from "./scheet-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"


export default function CollaboratorsHeader() {

    const [searToken, setSearch] = useState('')

    return (

        <div className="flex justify-between gap-2 mt-8 py-3">
            <div>
                <DebouncedInput value={searToken} change={(e) => {
                    setSearch(e)
                    console.log(e)
                    }} />
            </div>
            <CollaboratorsSheetForm>
                <Button size={'icon'}><Plus /></Button>
            </CollaboratorsSheetForm>
        </div>
    )
}