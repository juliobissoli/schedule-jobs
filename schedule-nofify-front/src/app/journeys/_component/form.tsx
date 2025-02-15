"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Config } from "@/config"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { ActionFormInterface, JourneyActionForm } from "./action-form"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
// import { toast } from "@/hooks/use-toast"



const formSchema = z.object({
    name: z.string().min(2, {
        message: "O nome deve ter pelo menos 2 caracteres.",
    }),
    description: z.string().min(5, {
        message: "A descrição deve ter pelo menos 5 caracteres.",
    }),
    isSequential: z.boolean().optional(),
})



export default function JourneyForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })
    const { toast } = useToast()

    const router = useRouter()

    const [actions, setActions] = useState<ActionFormInterface[]>([])



    async function onSubmit() {
        try {
            const values: z.infer<typeof formSchema> = form.getValues()


            const data = {
                ...values,
                actions: actions.map((a: ActionFormInterface) => ({
                    payload: a.payload,
                    trigger: a.trigger,
                    delay: 0,
                    mode: "sender",
                    maxAttempts: 3
                }))
            }

            const response = await fetch(`${Config.apiUrl}/journeys`, {
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


                toast({
                    title: 'Sucesso',
                    description: "Colaborador adicionado com sucesso!",
                })
            }

            router.refresh();

        } catch (error) {
            toast({
                title: 'Erro',
                description: "Erro ao adicionar colaborador",
                variant: 'destructive'
            })
        }
    }


    return (
        <ScrollArea className="p-4">
            <div className=" max-h-[90vh]">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite seu nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Digite a descrição" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isSequential"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-2xl border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Ações são sequenciais?
                                        </FormLabel>
                                        <FormDescription>
                                            Se essa opção estiver habilitada, significa que uma ação só será adicionada à fila de execução após a conclusão da ação anterior.
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



                    </form>
                </Form>

                <div className="space-y-2 mt-4">
                    <Separator />
                    <h3 className="font-semibold">Ações:</h3>

                    {
                        actions.map((action: any, i: number) => (
                            <div key={i} className="bg-muted p-4 rounded-2xl relative">
                                <div className="absolute top-0 right-0 m-1">
                                    <Button
                                        onClick={() => {
                                            const newActions = [...actions]
                                            newActions.splice(i, 1)
                                            setActions(newActions)
                                        }}
                                        size={'icon'} variant={'ghost'}><Trash size={'16'} /></Button>
                                </div>
                                <p className="text-sm">{action.trigger}</p>
                                <p className="text-muted-foreground text-sm">{action.payload}</p>
                            </div>
                        ))
                    }
                </div>



                <div className="border border-border rounded-2xl p-2 my-4">




                    <JourneyActionForm onSubmit={(action) => {
                        setActions([
                            ...actions,
                            action
                        ])
                    }} />
                </div>

                <Button onClick={() => onSubmit()} className="w-full" disabled={!form.formState.isValid || actions.length == 0 || form.formState.isSubmitting}>
                    Enviar
                    {
                        form.formState.isSubmitting &&
                        (
                            <Loader className="animate-spin" />
                        )
                    }
                </Button>
            </div>
        </ScrollArea>

    )
}

