"use client";

import { baseUrl, getAndDeleteReq } from "@/apicalls/apicalls";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function OverdueTasks(){
    const [tasks , setTasks] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const {userId} = useParams();
    const {user} = useAuth();
    const router = useRouter();
    useEffect(()=>{
        if(!user){
            router.push("/");
            toast.warning("login to view this page!");
        }
    } , [user])

    useEffect(()=>{
        if(!userId){
            return;
        }
        const getOverDueTasks = async()=>{
            const response = await getAndDeleteReq(`${baseUrl}/task/get/overdue/tasks/${userId}` , "get");
            setIsLoading(true);
            try {
                if(response.status === "success"){
                    setTasks(response?.data || []);
                }
            } catch (error) {
                const errorMessage = error?.response?.data?.message || "server Error! "
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getOverDueTasks();
    } , [userId]);

    const handleMarkAsDone = async(e , taskId)=>{
        e.preventDefault();
        const response = await postAndPatchReq(`${baseUrl}/closetask/${taskId}`);
        try {
            if(response.status === "success"){
                toast.success("Marked As Done!");
                router.push("/");
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "server Error! "
            toast.error(errorMessage);
        }
    }

    return(
        <div className="min-h-screen flex flex-col justify-center items-center py-8 px-4">
            <h1 className="text-lg font-bold mb-3.5">OverdueTasks!</h1>
            <div className="flex flex-wrap gap-2.5 justify-center">
                {
                    tasks && tasks.length > 0 ? tasks.map((task)=>(
                        <div className="card w-96 shadow-lg" key={task._id}>
                            <div className="card-body">
                                <h2 className="card-title">{task?.title || "Task-Title!"}</h2>
                                <p className="font-light text-lg">{task?.description || "Task-Description"}</p>
                                <div className="flex flex-wrap gap-2.5">
                                    <span className="text-lg">
                                        Duedate:{task?.duedate ? new Date(task?.duedate).toLocaleDateString() : "Task DueDate"}
                                    </span>
                                    <span className="text-lg">
                                        Prority:{task?.priority || "Task Prority"}
                                    </span>
                                </div>
                                <div className="card-actions justify-end">
                                <Link href={`/gettask/${task._id}`}><button className="btn btn-neutral shadow-lg">More</button></Link>
                                <button className="btn btn-neutral shadow-lg" onClick={(e)=>handleMarkAsDone(e , task._id)}>MarkAsDone</button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p>No OverDue Tasks</p>
                    )
                }
            </div>
        </div>
    )
}