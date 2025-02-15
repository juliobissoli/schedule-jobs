
'use client'


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formActionsSchema = z.object({
    trigger: z.string().min(2, {
        message: "Escolha uma trigger",
    }),
    payload: z.string().min(5, {
        message: "A mensagem deve ter pelo menos 5 caracteres.",
    }),
})


export interface ActionFormInterface extends z.infer<typeof formActionsSchema>  {}

interface JourneyActionFormProps {
    onSubmit: (value: z.infer<typeof formActionsSchema>) => void
}
export function JourneyActionForm({ onSubmit }: JourneyActionFormProps) {

    const form = useForm<z.infer<typeof formActionsSchema>>({
        resolver: zodResolver(formActionsSchema),
        defaultValues: {
            trigger: "",
            payload: "",
        },
    })

    return (
        <Form {...form}>
            <form className="space-y-4">
                <FormField
                    control={form.control}
                    name="trigger"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Trigger</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Escolha a trigguer" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        ['SEND_MESSAGE_EMAIL', 'SEND_MESSAGE_WHATSAPP'].map((s: string, i: number) => (
                                            <SelectItem key={i} value={s}>{s}</SelectItem>
                                        ))
                                    }

                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="payload"
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
                <Button type="submit"
                    onClick={(e) => {
                        e.preventDefault()
                        onSubmit(form.getValues())
                    }}
                    className="w-full"
                    variant={'outline'}
                    disabled={!form.formState.isValid}>
                    Adicionar
                </Button>
            </form>
        </Form>
    )

}