"use client";

import Link from "next/link";
import { useState } from "react";

export default function Register(){
    const [registerData , setRegisterData] = useState({
        name:"",
        email:"",
        country:"",
        password:""
    })

    const handleOnChange = (e)=>{
        setRegisterData({...registerData , [e.target.name]:e.target.value})
    }

    const handleRegister = async(e)=>{
        e.preventDefault();
    }
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 py-5">
            <div className="max-w-sm w-full bg-base-100 p-6 rounded-lg shadow-lg">
                <h1 className="text-center font-bold text-2xl mb-1.5">Register</h1>
                <div className="">
                    <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                    <label htmlFor="name" className="text-sm font-medium mb-1">Name</label>    
                    <input
                    name="name"
                    id="name" 
                    type="text" 
                    placeholder="Enter your name" 
                    className="input w-full"
                    value={registerData.name}
                    onChange={handleOnChange} 
                    required
                    />
                    <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>
                    <input
                    name="email" 
                    type="email"
                    id="email" 
                    placeholder="exp@email.com" 
                    className="input w-full"
                    value={registerData.email}
                    onChange={handleOnChange} 
                    required
                    />
                    <label htmlFor="password" className="text-sm font-medium mb-1">password</label>
                    <input
                    name="password" 
                    type="password"
                    id="password" 
                    placeholder="pass@123" 
                    className="input w-full"
                    value={registerData.password}
                    onChange={handleOnChange} 
                    required
                    />
                    <p>Already have an account <Link href={"/"}>
                    <span className="hover:border-b-2 hover:cursor-pointer hover:text-blue-500">Login</span></Link></p>
                    <button className="btn w-full btn-neutral text-lg font-semibold" 
                    type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}