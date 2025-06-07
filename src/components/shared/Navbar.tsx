import { CustomButton } from "@/customs/Button"
import { NavLink, useNavigate } from "react-router-dom"
import { FaSignInAlt } from "react-icons/fa";
import { useUserState } from "@/stores/user-store";
import UserBox from "./UserBox";
// import { ModeToggle } from "./Mode-toggle";

const Navbar = () => {
    const navigate = useNavigate()
    const {user} = useUserState()
    
    return (
        <div className="w-full h-[10vh] bg-background fixed border-b flex items-center z-50">
            <div className="container max-w-6xl mx-auto flex justify-between">
                <NavLink to={'/'} className="text-2xl uppercase font-semibold">workout</NavLink>
                <div className="flex items-center gap-4">
                    {/* <ModeToggle/> */}
                    {user ? (
                        <UserBox/>
                    ) : (
                        <CustomButton icon = {<FaSignInAlt className="font-2xl"></FaSignInAlt>} title="Sign in" customType="first" onClick={() => navigate("/auth")} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar