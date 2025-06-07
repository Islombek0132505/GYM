// import { data } from "react-router-dom"
import { z } from "zod"

export const loginScheme = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const registerScheme = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
}).refine(data => data.confirmPassword === data.password, {
    message: "Password don't match",
    path: ["confirmPassword"]
})

export const taskScheme = z.object({
    title: z.string().min(5),
})