import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CollaboratorForm from "./form";

interface CollaboratorsSheetFormProps {
    children: React.ReactNode
}

export default function CollaboratorsSheetForm({ children }: CollaboratorsSheetFormProps) {

    return (

        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>

            <SheetContent>
                <SheetTitle>
                    Formulário de Colaborador
                </SheetTitle>

                <CollaboratorForm />
            </SheetContent>
        </Sheet>
    )
}