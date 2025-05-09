"use client";

import { baseUrl, getAndDeleteReq } from "@/apicalls/apicalls";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TaskDetail(){
    const {taskId} = useParams();
    const [isLoading , setIsLoading] = useState(false);
    const [task , setTask] = useState(null);

    useEffect(()=>{
        const getTask = async()=>{
            if(!taskId){
                return;
            }
            
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`${baseUrl}/task/${taskId}` , "get");
                console.log("function passed upto here! ");
                console.log(response);
                if(response.status === "success"){
                    setTask(response.data || null)
                }
                
            } catch (error) {
                // console.log(error);
                const errorMessage = error.response?.data?.message || "server Error! ";
                toast.error(errorMessage)
            }finally{
                setIsLoading(false);
            }
        }
        getTask();
    } , [taskId]);

    const handleDelete = async(e , taskId)=>{
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await getAndDeleteReq(`${baseUrl}/task/${taskId}` , "delete");
            if(response.status === "success"){
                toast.success("tasks is deleted! ");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "server Error! ";
            toast.error(errorMessage)
        }finally{
            setIsLoading(false);
        }
    }

    return(
        <div className="min-h-screen flex justify-center items-center flex-col gap-2.5 py-5">
            <h1 className="text-lg font-bold">Task-Detail</h1>
            <div className="py-8 px-10 rounded-xl shadow-lg space-y-5">
                {
                    isLoading ? "Processing..." :
                    task ? (
                        <>
                            <h1 className="text-lg font-semibold ">{task.title || "Task-Title"}</h1>
                            <p className="font-medium text-lg">{task.description || "Task-Description"}</p>
                            <div className="flex flex-wrap justify-around items-center gap-1.5">
                                <span className="font-light text-lg ">
                                    CreatedAt:{new Date(task?.createdAt).toLocaleDateString()}
                                </span>
                                <span className="font-light text-lg">Duedate:
                                    {task?.duedate ? new Date(task.duedate).toLocaleDateString() : "N/A"}
                                </span>
                                <span className="font-light text-lg">Status:{task.status}</span>
                                <span className="font-light text-lg">AssignedTo:
                                    {task?.assignedTo ? task?.assignedTo?.name : "N/A"}
                                </span>
                            </div>
                            <div className="flex flex-wrap justify-around items-center gap-1.5">
                                <Link href={`/assigntask/${task._id}`}><button className="btn btn-neutral shadow-lg">Assign</button></Link>
                                <Link href={`/updatetask/${task._id}`}><button className="btn btn-neutral shadow-lg">Edit</button></Link>
                                <button className="btn btn-neutral shadow-lg" onClick={(e)=>handleDelete(e , task._id)}>Delete</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-lg font-semibold ">{task?.title || "Task-Title"}</h1>
                            <p className="font-medium ">{task?.description || "Task-Description"}</p>
                            <div className="flex flex-wrap justify-around items-center gap-1.5">
                                <span className="font-light text-lg ">
                                    CreatedAt:{new Date(task?.createdAt).toLocaleDateString()}
                                </span>
                                <span className="font-light text-lg ">Status:{task?.status || "status"}</span>
                                <span className="font-light text-lg ">Prority:{task?.Prority || "prority"}</span>
                                <span className="font-light text-lg ">AssignedTo:
                                    {task?.assignedTo ? task.assignedTo : "N/A"}
                                </span>
                                <span className="font-light text-lg ">completedAt:
                                    {task?.completedAt ? new Date(task.completedAt).toLocaleDateString() : "N/A"}
                                </span>
                            </div>
                            <div className="flex flex-wrap justify-around items-center gap-1.5">
                                <Link href={`/`}><button className="btn btn-neutral shadow-lg">Assign</button></Link>
                                <Link href={`/`}><button className="btn btn-neutral shadow-lg">Edit</button></Link>
                                <button className="btn btn-neutral shadow-lg">Delete</button>
                            </div>
                        </>
                    )
                }
                
            </div>
        </div>
    )
}