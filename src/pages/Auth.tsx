import Login from "@/components/auth/login"
import Register from "@/components/auth/register"
import { useAuthState } from "@/stores/auth-store"
import {motion} from 'motion/react'

const Auth = () => {

    const {authState} = useAuthState()

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <motion.div 
                className="p-8 w-1/3 rounded-lg bg-gray-950 shadow-xl shadow-gray-800 overflow-hidden relative">
                {authState === "login" && <Login/>}
                {authState === "register" && <Register/>}
            </motion.div>
        </div>
    )
}

export default Auth