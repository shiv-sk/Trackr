"use client";
import { baseUrl, getAndDeleteReq } from "@/apicalls/apicalls";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MyTasks(){
    const [isLoading , setIsLoading] = useState(false);
    const [tasks , setTasks] = useState([]);
    const {userId} = useParams();
    const {user} = useAuth();
    const router = useRouter();

    useEffect(()=>{
        if(!user){
            router.push("/")
        }
    } , [user])

    useEffect(()=>{
        if(!userId){
            return;
        }
        setIsLoading(true);
        const getAlltasks = async()=>{
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`${baseUrl}/task/get/allcreated/tasks/${userId}` , "get");
                if(response.status === "success"){
                    // console.log(response);
                    setTasks(response?.data || [])
                }
            } catch (error) {
                const errorMessage = error?.response?.data?.message || "server Error! "
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getAlltasks();
    }, [userId]);

    return(
        <div className="min-h-screen flex flex-col justify-center items-center py-8 px-4">
            <h1 className="text-lg font-bold mb-3.5">MyTasks!</h1>
            <div className="flex flex-wrap gap-2.5 justify-center">
                {
                    isLoading ? "Processing..." :
                    tasks && tasks.length > 0 ? tasks.map((task)=>(
                        <div className="card w-96 shadow-lg" key={task._id}>
                            <div className="card-body">
                                <h2 className="card-title">{task.title || "Task Title"}</h2>
                                <p className="font-light text-lg">{task?.description || "Task description"}</p>
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
                                <Link href={`/assigntask/${task._id}`}><button className="btn btn-neutral shadow-lg">AssignTask</button></Link>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p>No Tasks are found!</p>
                    )
                }
            </div>
        </div>
    )
}