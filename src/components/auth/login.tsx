import { CustomButton } from "@/customs/Button"
import { useAuthState } from "@/stores/auth-store"
import { Input } from "../ui/input"
import SocialMedia from "./social-media"
import { motion } from 'motion/react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginScheme } from "@/lib/validation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "@/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import Alert from "@/customs/Alert"
import Loader from "@/customs/Loader"
import { useUserState } from "@/stores/user-store"


const Login = () => {
    
    const {setAuth} = useAuthState()
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const {setUser} = useUserState()

    const form = useForm<z.infer<typeof loginScheme>>({
        resolver: zodResolver(loginScheme),
        defaultValues: {email: "", password: ""}
    })

    const onSubmit = async (values: z.infer<typeof loginScheme>) => {
        const {email, password} = values
        setLoading(true)
        setError("")
        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
            setUser(res.user)
            navigate("/")
        } catch (error) {
            const rezult = error as Error
            setError(rezult.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div 
            className="flex flex-col"
            initial = {{opacity: 0, height: 0}}
            animate = {{opacity: 1, height: "auto"}}
            transition={{duration: 0.5}}
        >
            {isLoading && <Loader loaderType="spinner"/>}
            <h2 className="text-2xl">Login</h2>
            <p className="text-muted-foreground mb-4">
                Don't have any account? {" "}
                <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => setAuth("register")}>
                    Sign Up
                </span>
            </p>
            {error && <Alert title={error} alertType="error"/>}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                            <Input placeholder="example@gmail.com" {...field} disabled = {isLoading}/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="******" type="password" {...field} disabled = {isLoading}/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <CustomButton title="Submit" type="submit" customType="first" className="w-full" disabled = {isLoading}/>
                </form>
            </Form>
            <SocialMedia/>
        </motion.div>
    )
}

export default Login