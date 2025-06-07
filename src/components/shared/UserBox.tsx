import { useUserState } from "@/stores/user-store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { TbLoader2 } from "react-icons/tb";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";

const UserBox = () => {
    const {user, setUser} = useUserState()
    const navigate = useNavigate()
    
    if(!user) return <TbLoader2 className="animate-spin w-6 h-6"/>
    
    const onLogOut = () => {
        auth.signOut()
        .then(() => {
            setUser(null)
            navigate('/auth')
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="flex items-center justify-center bg-gray-700 font-semibold">
                    <AvatarImage src={user.photoURL!} />
                    <AvatarFallback className="uppercase">{user.email![0]}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-80 bg-gray-800 border-gray-600"
                align="center"
                alignOffset={1}
                forceMount
                
            >
                <div className="flex flex-col p-2 text-sm space-y-2">
                    <div className="flex gap-2 items-center cursor-pointer">
                        <Avatar className="flex items-center justify-center bg-gray-700 font-semibold">
                            <AvatarImage src={user.photoURL!} />
                            <AvatarFallback className="uppercase">{user.email![0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="line-clamp-1 text-sm">{user.displayName ?? user.email}</p>
                            <p className="text-xs">{user.email}</p>
                        </div>
                    </div>
                    <span className="w-full h-[2px] bg-gray-600"></span>
                </div>

                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/dashboard')}>Gym</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer bg-destructive" onClick={onLogOut}>Logout</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserBox