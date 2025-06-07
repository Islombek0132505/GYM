import Loader from "@/customs/Loader"
import { auth } from "@/firebase"
import { useUserState } from "@/stores/user-store"
import { ReactNode, useEffect } from "react"


const AuthProvider = ({children}: {children: ReactNode}) => {

    const {setUser, isLoading, setLoading} = useUserState()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) setUser(user)
            if(!user) setLoading(false)
        })
    }, [])

    return isLoading ? <Loader loaderType="spinner"/> : <>{children}</>
}

export default AuthProvider