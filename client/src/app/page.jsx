"use client";
import { baseUrl, getAndDeleteReq } from "@/apicalls/apicalls";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDebounce } from 'use-debounce';

export default function Home(){
    const [isLoading , setIsLoading] = useState(false);
    const [tasks , setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [debounceSearchQuery] = useDebounce(searchQuery, 1000);

    useEffect(()=>{
        setIsLoading(true);
        const getAlltasks = async()=>{
            try {
                const response = await getAndDeleteReq(`${baseUrl}/task/search?search=${searchQuery}&priority=${priorityFilter}` , "get");
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
    }, [debounceSearchQuery , priorityFilter]);

    return(
        <div className="min-h-screen flex flex-col justify-center items-center py-8 px-4">
            <div className="w-full max-w-4xl mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
                <input
                type="text" 
                name="search"
                id="email" 
                placeholder="Search tasks..." 
                className="input w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select value={priorityFilter} className="select" onChange={(e) => setPriorityFilter(e.target.value)}>
                    <option disabled={true}>Pick a Priority</option>
                    <option value="low">Low</option>
                    <option value="mid">Mid</option>
                    <option value="high">High</option>
                </select>
            </div>
            <h1 className="text-lg font-bold mb-3.5">AllTasks!</h1>
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