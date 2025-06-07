import { taskScheme } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { CustomButton } from "@/customs/Button"
import { useState } from "react"
import { useUserState } from "@/stores/user-store"
import { toast } from "sonner"
import Loader from "@/customs/Loader"

interface Props {
    title?: string,
    isEdit?: boolean
    onClose?: () => void,
    handler: (values: z.infer<typeof taskScheme>) => Promise<void | null>
}

const TaskForm = ({title = '', handler, isEdit, onClose}: Props) => {

    const [isLoading, setLoading] = useState(false)
    const {user} = useUserState()

    const form = useForm<z.infer<typeof taskScheme>>({
        resolver: zodResolver(taskScheme),
        defaultValues: {title}
    })

    const onSubmit = async (values: z.infer<typeof taskScheme>) => {
        if(!user) return null
        setLoading(true)
        const promise = handler(values).finally(() => setLoading(false))

        toast.promise(promise, {
            loading: 'Loading...',
            success: "Successfull",
            error: "Error"
        })
    }
    
    return (
        <>
        {isLoading && <Loader loaderType="spinner"/>}
        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Input placeholder="example@gmail.com" {...field} disabled = {isLoading}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                { isEdit ?   
                    <div className="flex items-center gap-2 justify-end">
                        <CustomButton title="Cancel" customType="secondary" disabled = {isLoading} onClick={onClose}/>
                        <CustomButton title="Change" type="submit" customType="first" disabled = {isLoading}/>
                    </div> :  
                    <CustomButton title="Add" type="submit" customType="first" className="ml-auto" disabled = {isLoading}/>
                }
            </form>
        </Form>
        </>
    )
}


export default TaskForm