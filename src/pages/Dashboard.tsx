import TaskForm from "@/components/shared/AddTaskForm";
import TaskItem from "@/components/shared/TaskItem"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Alert from "@/customs/Alert";
import Loader from "@/customs/Loader";
import { db } from "@/firebase";
import { taskScheme } from "@/lib/validation";
import { TaskService } from "@/service/task.service";
import { useUserState } from "@/stores/user-store";
import { ITask } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { toast } from "sonner";
import { z } from "zod";

const Dashboard = () => {

    const [open, setOpen] = useState(false)
    const [isEditing, setEditing] = useState(false)
    const [isDeleting, setDeleting] = useState(false)

    const [currentTask, setCurrentTask] = useState<ITask | null>(null)

    const {user} = useUserState()

    const {isPending, data, error, refetch} = useQuery({
        queryKey: ["tasks-data"],
        queryFn: TaskService.getTasks,
    })

    const onAdd = async ({title}: z.infer<typeof taskScheme>) => {
        if(!user) return null
        return addDoc(collection(db, 'tasks'), {
            title,
            status: "unstarted",
            startTime: null,
            endTime: null,
            userID: user.uid
        })
        .then(() => setOpen(false))
        .finally(() => refetch())
    }

    const onUpdate = async ({title}: z.infer<typeof taskScheme>) => {
        if(!currentTask) return null
        if(!user) return null

        const ref = doc(db, 'tasks', currentTask.id)

        return updateDoc(ref, {title})
            .then(() => refetch())
            .finally(() => setEditing(false))
    }

    const onDelete = async (id: string) => {
        setDeleting(true)

        const ref = doc(db, 'tasks', id)

        const promise = deleteDoc(ref)
            .then(() => refetch())
            .finally(() => setDeleting(false))

        toast.promise(promise, {
            loading: "Loading...",
            error: "Something went wrong!!!",
            success: "Successfully deleted."
        })
    }

    const onStartEditing = (task: ITask) => {
        setEditing(true)
        setCurrentTask(task)
    }

    return (
        <>
        <div className="h-screen w-full max-w-6xl relative flex items-center justify-center mx-auto">
            <div className="grid grid-cols-2 gap-10 w-full items-center">
                <div className="flex flex-col w-full">
                    <div className="flex items-center p-4 rounded-t-md justify-between bg-gradient-to-t from-gray-900 to-gray-800">
                        <p className="text-4xl">Training</p>
                        <button className="px-4 py-2 bg-blue-800 hover:bg-blue-900 rounded duration-100" onClick={() => setOpen(true)}>
                            <IoAddOutline/>
                        </button>
                    </div>
                    <div className="flex min-h-[200px] flex-col items-center p-4 rounded-b-md gap-4 bg-gradient-to-b from-gray-900 to-gray-800 relative">
                        {(isPending || isDeleting) && <Loader loaderType="spinner"/>}
                        {error && <Alert title={error.message} alertType="error"/>}

                        {(data && !isEditing) && data.tasks.map(task => (
                            task.userID === user?.uid &&
                            <TaskItem 
                                key={task.id} 
                                task = {task} 
                                onStartEditing = {() => onStartEditing(task)} 
                                onDelete = {() => onDelete(task.id)}
                                refetch = {refetch}
                            />))
                        }
                        {isEditing && (
                            <div className="w-full bg-gray-900 p-2 rounded border">
                                <TaskForm 
                                    handler={onUpdate as (values: z.infer<typeof taskScheme>) => Promise<void | null>}
                                    title={currentTask?.title}
                                    isEdit
                                    onClose={() => setEditing(false)}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col w-full space-y-3">
                    <div className="flex text-2xl font-semibold rounded-l flex-col gap-2 bg-gradient-to-r from-blue-800 to-transparent p-4">
                        <p>Total week</p>
                        <p>13:24:07</p>
                    </div>
                    <div className="flex text-2xl font-semibold rounded-l flex-col gap-2 bg-gradient-to-r from-blue-800 to-transparent p-4">
                        <p>Total week</p>
                        <p>13:24:07</p>
                    </div>
                    <div className="flex text-2xl font-semibold rounded-l flex-col gap-2 bg-gradient-to-r from-blue-800 to-transparent p-4">
                        <p>Total week</p>
                        <p>13:24:07</p>
                    </div>
                </div>
            </div>
        </div>
        <Dialog open = {open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Create a new task</DialogTitle>
                </DialogHeader>
                <span className="w-full h-[2px] bg-gray-600 space-y-2"></span>
                <TaskForm handler={onAdd}/>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default Dashboard