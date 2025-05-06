"use client"
import { baseUrl, postAndPatchReq } from "@/apicalls/apicalls";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewTask(){
    const {user} = useAuth();
    const router = useRouter();

    const [taskData , setTaskData] = useState({
        title:"",
        description:"",
        duedate:"",
        priority:"",
        userId:""
    })
    const [isLoading , setIsLoading] = useState(false);

    const handleOnChange = (e)=>{
        setTaskData({...taskData , [e.target.name]:e.target.value})
    }
    const handleNewTask = async(e)=>{
        e.preventDefault();
        if(!user || !user._id){
            alert("user is not presnt! ");
            return;
        }
        setIsLoading(true);
        try {
            const response = await postAndPatchReq(`${baseUrl}/task/new` , "post" , {...taskData , userId:user._id});
            // console.log(response);
            if(response.status === "success"){
                router.push("/");
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "server Error! "
            toast.error(errorMessage);
        }finally{
            setIsLoading(false);
        }
    }
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 py-5">
            <div className="max-w-sm w-full bg-base-100 p-6 rounded-lg shadow-md">
                <h1 className="text-center font-bold text-2xl mb-1.5">NewTask</h1>
                <div className="">
                    <form className="flex flex-col gap-3" onSubmit={handleNewTask}>
                    <label htmlFor="title" className="text-sm font-medium mb-1">Title</label>    
                    <input
                    name="title" 
                    type="text"
                    id="title" 
                    placeholder="TaskA" 
                    className="input w-full"
                    value={taskData.title}
                    onChange={handleOnChange} 
                    required
                    />
                    <label htmlFor="description" className="text-sm font-medium mb-1">Description</label>
                    <textarea 
                    name="description" 
                    id="description" 
                    className="textarea w-full" 
                    value={taskData.description} 
                    onChange={handleOnChange} 
                    placeholder="Description" 
                    required></textarea>
                    <label htmlFor="title" className="text-sm font-medium mb-1">Duedate</label>    
                    <input
                    name="duedate" 
                    type="date"
                    id="date" 
                    placeholder="" 
                    className="input w-full"
                    value={taskData.duedate}
                    onChange={handleOnChange}
                    required
                    />
                    <label htmlFor="title" className="text-sm font-medium mb-1">Prority</label>
                    <select defaultValue="Pick a color" className="select" name="priority" id="priority" onChange={handleOnChange}>
                        <option disabled={true}>Pick a Priority</option>
                        <option value={"low"}>Low</option>
                        <option value={"mid"}>Mid</option>
                        <option value={"high"}>High</option>
                    </select>
                    <button 
                    type="submit" 
                    className="btn-neutral btn w-full text-white text-lg font-semibold"
                    disabled={isLoading}>{isLoading ? "Processing..." : "NewTask"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}