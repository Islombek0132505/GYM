import { cn } from "@/lib/utils"
import { addTwoClass } from "@/constants";
import { HTMLAttributes } from "react";

// import { FaCircleCheck } from "react-icons/fa6";
// import { CgDanger } from "react-icons/cg";
// import { FiAlertTriangle } from "react-icons/fi";

type alertType = "success" | "error" | "warning"

interface IAlert extends HTMLAttributes<HTMLDivElement>{
    title: string,
    desc?: string,
    alertType: alertType,
    className?: string
}

const Alert = ({title, desc, alertType, className, ...props}: IAlert) => {

    const mainClass = "rounded-lg p-4 flex items-center gap-2 border-2 bg-transparent my-2"
    let finalClass = ""
    if (alertType === "success" ) {
        finalClass = addTwoClass(mainClass, "border-green-800 text-green-800")
    }
    if (alertType === "error" ) {
        finalClass = addTwoClass(mainClass, "border-red-800 text-red-800")
    }
    if (alertType === "warning" ) {
        finalClass = addTwoClass(mainClass, "border-amber-800 text-amber-800")
    }
    
    return (
        <div className={cn(finalClass, className)} {...props}>
            <p className="text-inherit">{title}</p>
            <p className="text-inherit">{desc}</p>
        </div>
    )
}

export default Alert