import { addTwoClass } from "@/constants"
import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"
import { TbLoader2 } from "react-icons/tb";

type TLoader = "skaleton" | "spinner"

interface ILoader extends HTMLAttributes<HTMLDivElement>{
    loaderType: TLoader
    className?: string
}

const Loader = ({className, loaderType}: ILoader) => {
    
    let basicClass = 'absolute left-0 top-0 w-full h-full bg-gray-800 flex items-center justify-center'

    basicClass = loaderType === "skaleton" 
    ? addTwoClass(basicClass, "animate-pulse opacity-20")
    : addTwoClass(basicClass, "opacity-60")

    return (
        <div className={cn(className, basicClass)}>
            {loaderType === "spinner" && <TbLoader2 className="animate-spin text-2xl"/>}
        </div>
    )
}

export default Loader