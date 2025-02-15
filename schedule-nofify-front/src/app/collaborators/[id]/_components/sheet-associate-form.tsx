'use client'
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Config } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CollaboratorSelectJourney from "./select-journey";
import { CalendarIcon, Trash } from "lucide-react";
import { IJourney } from "@/interfaces/journey.interface";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ptBR } from 'date-fns/locale';
import { formatDate, format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { JobFormSchema } from "@/interfaces/job.interface";


interface CollaboratorSheetAssociateFormProps {
    children: React.ReactNode,
    collaboratorId: string,
    onSuccess: () => void
}
export default function CollaboratorSheetAssociateForm({ children, collaboratorId, onSuccess }: CollaboratorSheetAssociateFormProps) {

    const { toast } = useToast()

    const [isOpen, setIsOpen] = useState(false);



    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const [journeySelected, selectJourney] = useState<IJourney | null>()

    const form = useForm({
        resolver: zodResolver(JobFormSchema),
        defaultValues: {
            date: new Date(),
            hour: '7',
            daily: false
        }
    })

    async function onSubmit() {
        if (!journeySelected) {
            return
        }

        const formData = form.getValues()

        try {

            const data = {
                collaborator: collaboratorId,
                journey: journeySelected._id,
                startDate: formData?.date.toISOString() ?? new Date().toISOString(),
                daily: formData?.daily ?? false,
                hour: parseInt(formData.hour)
            }

            const response = await fetch(`${Config.apiUrl}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                toast({
                    title: 'Erro',
                    description: "Erro ao adicionar colaborador",
                    variant: 'destructive'
                })
            }
            else {

                setIsOpen(false)
                onSuccess()
                toast({
                    title: 'Sucesso',
                    description: "Colaborador adicionado com sucesso!",
                })
            }
            // router.refresh();

        } catch (error) {
            toast({
                title: 'Erro',
                description: "Erro ao adicionar colaborador",
                variant: 'destructive'
            })
        }
    }

    return (

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>

            <SheetContent>
                <SheetTitle>
                    Associar Jornada
                </SheetTitle>

                <div className="my-4 space-y-6">
                    {
                        !journeySelected
                            ? (
                                <div>
                                    <Label>Selecione a jornada</Label>
                                    <CollaboratorSelectJourney onSelect={selectJourney} />
                                </div>
                            )
                            : (<div className="p-3 bg-muted rounded-2xl flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-muted-foreground">Jornada selecinada:</p>
                                    <p>{journeySelected.name}</p>
                                </div>
                                <Button onClick={() => { selectJourney(null) }} variant={'outline'} size={'icon'}><Trash size={16} /></Button>
                            </div>)
                    }

                    <Separator />


                    <Form {...form}>
                        <form className="space-y-4">

                            <div className="flex gap-2">
                                <div className="w-3/5">

                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Data de inicio</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl className="rounded-xl">
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(!field.value && "text-muted-foreground")}
                                                            >
                                                                {field.value
                                                                    ? (formatDate(field.value, "dd/MM/yyyy"))
                                                                    : (<span>Escolha a data</span>)}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            locale={ptBR}
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) => date < yesterday}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-2/5">
                                    <FormField
                                        control={form.control}
                                        name="hour"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Hora de execução</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl className=" rounded-xl">
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                            [...(Array(24))].map((_, i) => (
                                                                <SelectItem key={i} value={i.toString()}>
                                                                    {i}
                                                                </SelectItem>
                                                            ))
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div>
                                <FormField
                                    control={form.control}
                                    name="daily"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-2xl border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">
                                                    Execução diária?
                                                </FormLabel>
                                                <FormDescription>
                                                    Se essa opção estiver habilitada, essa jornada será executada diariamente no horário indicado para esse colaborador.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                        </form>
                    </Form>




                </div>

                <Button className="mt-4" onClick={onSubmit} disabled={!journeySelected}>
                    Salvar
                </Button>


            </SheetContent>
        </Sheet>
    )
}