"use client";

import { baseUrl, getAndDeleteReq } from "@/apicalls/apicalls";
import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UpdateTask(){
    const {taskId} = useParams();
    const [isLoading , setIsLoading] = useState(false);
    const [task , setTask] = useState({
        title:"",
        description:"",
        priority:"",
        duedate:""
    });
    const {user} = useAuth();
    const router = useRouter();
    useEffect(()=>{
        if(!user){
            router.push("/");
            toast.warning("login to view this page!");
        }
    } , [user])

    const handleOnChange = (e)=>{
        setTask({...task , [e.target.name]:e.target.value})
    }

    useEffect(()=>{
        if(!taskId){
            return;
        }
        setIsLoading(true);
        const getTask = async()=>{
            try {
                const response = await getAndDeleteReq(`${baseUrl}/task/${taskId}` , "get");
                console.log(response);
                if(response.status === "success"){
                    const data = response?.data;
                    const formattedDate = data.duedate?.split("T")[0];
                    setTask({...data , duedate:formattedDate})
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || "server Error! ";
                toast.error(errorMessage)
            }finally{
                setIsLoading(false);
            }
        }
        getTask();
    } , [taskId]);
    const handleEditTask = async(e)=>{
        e.preventDefault();
        console.log(task);
    }
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 py-5">
            <div className="max-w-sm w-full bg-base-100 p-6 rounded-lg shadow-md">
                <h1 className="text-center font-bold text-2xl mb-1.5">EditTask</h1>
                <div className="">
                    <form className="flex flex-col gap-4" onSubmit={handleEditTask}>
                    <label htmlFor="title" className="text-sm font-medium mb-1">Title</label>    
                    <input
                    name="title" 
                    type="text"
                    id="title" 
                    placeholder="TaskA" 
                    className="input w-full"
                    value={task.title}
                    onChange={handleOnChange} 
                    required
                    />
                    <label htmlFor="description" className="text-sm font-medium mb-1">Description</label>
                    <textarea 
                    name="description" 
                    id="description" 
                    className="textarea w-full" 
                    value={task.description} 
                    onChange={handleOnChange} 
                    placeholder="Task-Description" 
                    required></textarea>
                    <label htmlFor="title" className="text-sm font-medium mb-1">Duedate</label>    
                    <input
                    name="duedate" 
                    type="date"
                    id="date" 
                    placeholder="" 
                    className="input w-full"
                    value={task.duedate}
                    onChange={handleOnChange}
                    required
                    />
                    <label htmlFor="title" className="text-sm font-medium mb-1">Prority</label>
                    <select value={task.priority} className="select" name="priority" id="priority" onChange={handleOnChange}>
                        <option disabled={true} value="">Pick a Priority</option>
                        <option value={"low"}>Low</option>
                        <option value={"mid"}>Mid</option>
                        <option value={"high"}>High</option>
                    </select>
                    <button 
                    type="submit" 
                    className="btn-neutral btn w-full text-white text-lg font-semibold" 
                    disabled={isLoading}>{isLoading ? "Processing.." : "EditTask"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}