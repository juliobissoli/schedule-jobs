"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Config } from "@/config"
import { useRouter } from "next/navigation"
// import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "O nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor, insira um endereço de e-mail válido.",
    }),
    phone: z.string().min(10, {
        message: "Por favor, insira um número de telefone válido.",
    }),
})

export default function CollaboratorForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })
    const { toast } = useToast()

    const router = useRouter()


    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch(`${Config.apiUrl}/collaborators`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    phone: '55' + values.phone.replace(/\D/g, '')
                }),
            });

            if (!response.ok) {
                toast({
                    title: 'Erro',
                    description: "Erro ao adicionar colaborador",
                    variant: 'destructive'
                })
            }

            toast({
                title: 'Sucesso',
                description: "Colaborador adicionado com sucesso!",
            })

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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Digite seu e-mail" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="Digite seu número de telefone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                    Enviar
                    {
                        form.formState.isSubmitting &&
                        (
                            <Loader className="animate-spin" />
                        )
                    }
                </Button>
            </form>
        </Form>
    )
}
