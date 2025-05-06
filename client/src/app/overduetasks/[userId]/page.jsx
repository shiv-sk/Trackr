"use client";

import { baseUrl, getAndDeleteReq } from "@/apicalls/apicalls";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function OverdueTasks(){
    const {user} = useAuth();
    const [tasks , setTasks] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    
    useEffect(()=>{
        if(!user || !user._id){
            return;
        }
        const getOverDueTasks = async()=>{
            const response = await getAndDeleteReq(`${baseUrl}/task/get/overdue/tasks/${user._id}` , "get");
            setIsLoading(true);
            try {
                if(response.status === "success"){
                    setTasks(response?.data || []);
                    console.log("all overdue tasks! " , response?.data);
                }
            } catch (error) {
                const errorMessage = error?.response?.data?.message || "server Error! "
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getOverDueTasks();
    } , [user]);

    return(
        <div className="min-h-screen flex flex-col justify-center items-center py-8 px-4">
            <h1 className="text-lg font-bold mb-3.5">MyAssignedTask!</h1>
            <div className="flex flex-wrap gap-2.5 justify-center">
                <div className="card w-96 shadow-lg">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Task-Tile!</h2>
                        <p className="font-light text-lg">Task Description.</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-neutral shadow-lg">More</button>
                        <button className="btn btn-neutral shadow-lg">MarkAsDone</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 shadow-lg">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Task-Tile!</h2>
                        <p className="font-light text-lg">Task Description.</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-neutral shadow-lg">More</button>
                        <button className="btn btn-neutral shadow-lg">MarkAsDone</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 shadow-lg">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Task-Tile!</h2>
                        <p className="font-light text-lg">Task Description.</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-neutral shadow-lg">More</button>
                        <button className="btn btn-neutral shadow-lg">MarkAsDone</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}