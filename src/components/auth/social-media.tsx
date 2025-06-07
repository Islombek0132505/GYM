import Alert from "@/customs/Alert";
import { CustomButton } from "@/customs/Button"
import Loader from "@/customs/Loader";
import { auth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const SocialMedia = () => {
    const [isLoading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)
    const navigate = useNavigate()

    const onGoogle = async () => {
        setLoading(true)
        const googleProvider = new GoogleAuthProvider()

        signInWithPopup(auth, googleProvider)
            .then(() => {navigate("/")})
            .finally(() => setLoading(false))
    }

    const onGitHub = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000);
    }

    return (
        <>
        {alert && 
            <Alert
            title="This service some time don't work. Sorry!!!" 
            alertType="warning"
            /> 
        }
        <div className="grid grid-cols-2 gap-2">
            {isLoading && <Loader loaderType="spinner"/>}
            <CustomButton 
                icon={<FcGoogle className="text-xl"/>} 
                title="Sign in with Google" 
                customType="first"
                onClick={onGoogle}
            />
            <CustomButton 
                icon={<FaGithub className="text-xl"/>} 
                title="Sign in with GitHub" 
                customType="first"
                onClick={onGitHub}
            />
        </div>
        </>
    )
}

export default SocialMedia