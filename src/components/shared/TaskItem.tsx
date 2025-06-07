import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { HiOutlineSignal } from "react-icons/hi2";
import { CiPlay1 } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { ITask, ITaskData } from "@/types";
import { IoRefreshOutline } from "react-icons/io5";
import { IoPause } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";
import { QueryObserverResult } from "@tanstack/react-query";
import Loader from "@/customs/Loader";

interface Props {
    task: ITask
    onStartEditing: () => void
    onDelete: () => void
    refetch: () => Promise<QueryObserverResult<ITaskData, Error>>
}

const TaskItem = ({task, onStartEditing, onDelete, refetch}: Props) => {

    const [isLoading, setLoading] = useState(false)

    const onStart = async () => {

        setLoading(true)
        const ref = doc(db, 'tasks', task.id)
        try {
            await updateDoc(ref, {
                status: "started",
                startTime: Date.now(),
            })
            refetch()
        } catch {
            toast.error("Something went wrong!!!")
        } finally {
            setLoading(false)
        }

    }
    const onPause = async () => {
        setLoading(true)
        const ref = doc(db, 'tasks', task.id)
        try {
            await updateDoc(ref, {
                status: "paused",
                startTime: Date.now(),
                endTime: Date.now(),
                totalTime: Date.now()
            })
            refetch()
        } catch {
            toast.error("Something went wrong!!!")
        } finally {
            setLoading(false)
        }
    }

    const renderStatusBtn = () => {
        switch(task.status) {
            case "unstarted":
                return (
                    <button className="p-2 rounded border border-gray-600" onClick={onStart}>
                        <CiPlay1 className="w-5 h-5"/>
                    </button>
                )
            case "paused":
                return (
                    <button className="p-2 rounded border border-blue-500">
                        <IoRefreshOutline className="w-5 h-5 text-blue-500" onClick={onStart}/>
                    </button>
                )
            case "started":
                return (
                    <button className="p-2 rounded border border-green-500">
                        <IoPause className="w-5 h-5 text-green-500" onClick={onPause}/>
                    </button>
                )
        }
    }


    return (
        <>
        <div className="grid grid-cols-4 relative items-center justify-between w-full p-3 bg-slate-800 rounded shadow-md shadow-gray-700">
            {isLoading && <Loader loaderType="spinner"/>}
            <div className="col-span-2 flex gap-2 w-full items-center">
                <IoCheckmarkCircleOutline className="w-6 h-6 text-blue-600"/>
                <p className="text-white">{task.title}</p>
            </div>
            <div className="flex items-center w-full gap-2 col-span-1">
                <HiOutlineSignal 
                    className={cn(
                        task.status === "unstarted" && "text-blue-500",
                        task.status === "started" && "text-green-500",
                        task.status === "paused" && "text-red-500",
                    )}
                />
                <p>{task.status}</p>
            </div>
            <div className="flex col-span-1 w-full items-center gap-1 justify-end">
                {renderStatusBtn()}
                <button className="p-2 bg-blue-800 rounded" onClick={onStartEditing}>
                    <MdEdit className="w-5 h-5"/>
                </button>
                <button className="p-2 bg-red-800 rounded" onClick={onDelete}>
                    <MdDelete className="w-5 h-5"/>
                </button>
            </div>
        </div>
        </>
    )
}
export default TaskItem