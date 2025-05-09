"use client";
import { baseUrl, getAndDeleteReq } from '@/apicalls/apicalls';
import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Bar, BarChart } from 'recharts';
export default function Analytics(){
    const [pieChartData , setPieChartData] = useState([]);
    const [cardDetail , setCardDetail] = useState(null);
    const [overDueTrends , setOverDueTrend] = useState([]);
    const {userId} = useParams();
    const COLORS = ['#00C49F', '#0088FE', '#FF8042', '#FFBB28'];
    const {user} = useAuth();
    const router = useRouter();
    useEffect(()=>{
        if(!user){
            router.push("/");
            toast.warning("login to view this page!");
        }
    } , [user])

    useEffect(()=>{
        const pieChartAnalytic = async()=>{
            if(!userId){
                return;
            }
            try {
                const response = await getAndDeleteReq(`${baseUrl}/task/get/user/analytic/${userId}` , "get");
                if(response.status === "success"){
                    const data = response?.data;
                    setPieChartData([
                        {name:"On Time Submission" , value:data.onTime},
                        {name:"Total Assigned" , value:data.assigned},
                        {name:"Overdue Tasks" , value:data.overdue},
                        {name:"Ongoing Tasks" , value:data.ongoing},
                    ]);
                    setCardDetail(data);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || "server Error! ";
                toast.error(errorMessage)
            }
        }
        pieChartAnalytic();
    } , [userId]);

    useEffect(()=>{
        const overdueTrendAnalytic = async()=>{
            if(!userId){
                return;
            }
            try {
                const response = await getAndDeleteReq(`${baseUrl}/task/get/overdue/analytic/${userId}` , "get");
                if(response.status === "success"){
                    const data = response.data;
                    const lineChartData = data.map((res)=>(
                        {
                            name:res._id,
                            pv:res.count
                        }
                    ))
                    setOverDueTrend(lineChartData);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || "server Error! ";
                toast.error(errorMessage)
            }
        }
        overdueTrendAnalytic();
    } , [userId]);
    console.log(overDueTrends);
    return(
        <>
            <div className="flex flex-col md:flex-row gap-4 min-h-screen py-5">
                <div className="w-full md:w-1/2 shadow-2xl rounded-xl">
                    <h4 className="text-center font-semibold my-2">Task Review</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie 
                            data={pieChartData}
                            cx="50%" 
                            cy="50%" 
                            labelLine={false} 
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value">
                                {pieChartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2 shadow-2xl rounded-xl">
                    <h4 className="text-center font-semibold my-2">OverDue Trends</h4>
                    <div style={{ width: '300px', margin: '0 auto' }}>
                        <ResponsiveContainer width="100%" height={300}>
                        <BarChart width={250} height={250} data={overDueTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center flex-wrap py-5">
                <div className="card w-96 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title">Full Overview</h2>
                        <div className="flex flex-col gap-2.5 px-3">
                            <span>OnTimeSubmission:{cardDetail?.onTime}</span>
                            <span>totalAssignedTasks:{cardDetail?.assigned}</span>
                            <span>overdueTaks:{cardDetail?.overdue}</span>
                            <span>onGoingTasks:{cardDetail?.ongoing}</span>
                            <span>completedTasks:{cardDetail?.completedTasks}</span>
                            <span>taskCompletionRate:{cardDetail?.taskPercentage}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}