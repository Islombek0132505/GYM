import { ButtonHTMLAttributes, ReactNode } from "react"
import { addTwoClass } from "@/constants"
import { cn } from "@/lib/utils"

type CustomBtnType = "first" | "secondary" 

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    title: string,
    icon?: ReactNode,
    customType: CustomBtnType,
}

export const CustomButton = ({icon, title, className, customType, ...props}: IButton) => {

    const defaultClass = 'group px-6 py-2 rounded bg-background w-fit font-medium text-white justify-center duration-200 cursor-ponter flex items-center gap-2'
    let finalClass = ''

    finalClass = customType == "first" 
    ? addTwoClass(defaultClass, "bg-primary")
    : addTwoClass(defaultClass, "bg-destructive")

    return (
        <button className={cn(finalClass, className)} {...props}>
            {icon} {title}
        </button>
    )
}

