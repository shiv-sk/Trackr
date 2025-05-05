export default function AssignTask(){
    const [users , setUsers] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const {taskId} = useParams();

    // useEffect(()=>{
    //     const getAllUsers = async()=>{
    //         setIsLoading(true);
    //         try {
    //             const response = await getAndDeleteReq(`${baseUrl}/user/` , "get");
    //             console.log(response);
    //             if(response.status === "success"){
    //                 setUsers(response.data);
    //             }
    //         } catch (error) {
    //             const errorMessage = error?.response?.data?.message || "server Error! "
    //             toast.error(errorMessage)
    //         }finally{
    //             setIsLoading(false);
    //         }
    //     }
    //     getAllUsers();
    // } , [])

    const handleAssignTask = async(e , userId)=>{
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await postAndPatchReq(`${baseUrl}/task/assigntask/${taskId}` , "patch" , {userId});
            // console.log(response);
            if(response.status === "success"){
                toast.success("task assigned successfully")
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "server Error! "
            toast.error(errorMessage)
        }finally{
            setIsLoading(false);
        }
    }
    
    return(
        <div className="min-h-screen p-4 flex justify-center items-center bg-gray-100">
            <div className="overflow-x-auto w-full max-w-4xl">
                <table className="table-auto w-full text-left border-collapse shadow-md rounded-lg overflow-hidden bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Country</th>
                        <th className="px-6 py-3">Assign</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center">
                                        Processing...
                                    </td>
                                </tr>
                            ) : 
                            users && users.length > 0 ? users.map((user)=>(
                                <tr className="hover:bg-gray-100" key={user._id}>
                                    <td className="px-6 py-4">{user?.name || "userName"}</td>
                                    <td className="px-6 py-4">{user?.email || "user-Email"}</td>
                                    <td className="px-6 py-4">{user?.country || "Country"}</td>
                                    <td className="px-6 py-4">
                                        <button 
                                        className="btn btn-sm btn-neutral shadow-lg"
                                        onClick={(e) => handleAssignTask(e, user?._id)}>Assign</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center">
                                        No users found.
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}