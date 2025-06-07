import { featuredItems } from "@/constants"
import { CustomButton } from "@/customs/Button"
import { useNavigate } from "react-router-dom"
import {motion} from 'motion/react'
import { useUserState } from "@/stores/user-store"
import { auth } from "@/firebase"
import { CgGym } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";

const Home = () => {

    const navigate = useNavigate()
    const {user, setUser} = useUserState()
    const onLogOut = () => {
        auth.signOut()
        .then(() => {
            setUser(null)
            navigate('/auth')
        })
    }
    return (
        <>
        <div className="w-full h-screen flex items-center">
            <motion.div 
                key={1}
                className="max-w-xl ml-60 flex h-full flex-col justify-center"
                initial = {{translateX: "-100%", opacity: 0}}
                animate = {{translateX: 0, opacity: 1}}
                transition={{duration: 0.7}}
            >
                <h1 className="text-9xl font-semibold uppercase">Workout with me</h1>
                <p className="text-muted-foreground mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo possimus ex laborum impedit provident numquam veniam vero temporibus eveniet sapiente ullam dolore accusamus dicta velit magnam eum quisquam, ducimus tempore.
                </p>

                {user ? (
                    <div className="flex gap-4">
                        <CustomButton 
                            title="Go to Gym" 
                            customType="first" 
                            onClick={() => navigate('/dashboard')} 
                            icon = {<CgGym className="w-5 h-5"/>}
                        />
                        <CustomButton 
                            title="Logout" 
                            customType="secondary" 
                            onClick={onLogOut} 
                            icon = {<LuLogOut className="w-5 h-5"/>}
                        />
                    </div>

                ) : (
                    <CustomButton title="Join us" customType="first" onClick={() => navigate('auth')} className="w-fit"/>
                )}

                <div className="flex gap-4 items-center mt-12">
                    {featuredItems.map((Icon, index) => (
                        <Icon key={index} className="w-12 h-12"/>
                    ))}
                </div>
            </motion.div>

            <motion.img 
                initial = {{translateX: "100%", opacity: 0}}
                animate = {{translateX: 0, opacity: 1}}
                transition={{duration: 0.7}}
                src="https://static.vecteezy.com/system/resources/thumbnails/049/957/728/small/athlete-ready-to-sprint-indoors-transparent-png.png" 
                alt="image" 
                className="w-2/5 object-cover"
            />
            
            
        </div>
        </>
    )
}

export default Home