"use client";
import { useAuth } from "@/context/AuthContext"
import Link from "next/link";

export default function Navbar(){
    const {user , isLoading , logoutUser} = useAuth();
    return(
        <div className="navbar bg-base-100 shadow-lg">
            {
                user ? (
                    <>
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                    <path strokeLinecap="round" strokeLinejoin="round" 
                                    strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li><Link href={""}>Item 1</Link></li>
                                    <li><Link href={""}>Item 3</Link></li>
                                </ul>
                            </div>
                            <a className="btn hidden sm:inline-flex btn-ghost text-xl font-bold shadow-lg">Trackr</a>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                            <li><Link href={"/"}>Item 1</Link></li>
                            <li><Link href={"/"}>Item 3</Link></li>
                            </ul>
                        </div>
                        <div className="navbar-end">
                            <button className="btn btn-neutral" 
                            onClick={logoutUser} 
                            disabled={isLoading}>{isLoading ? "Processing..." : "Logout"}</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                    <path strokeLinecap="round" strokeLinejoin="round" 
                                    strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li><Link href={"/"}>Item 1</Link></li>
                                    <li><Link href={"/"}>Item 3</Link></li>
                                </ul>
                            </div>
                            <a className="btn hidden sm:inline-flex btn-ghost text-xl font-bold shadow-lg">Trackr</a>
                        </div>
                        <div className="navbar-end">
                            <Link href={"/login"} className="btn btn-neutral">Login</Link>
                        </div>
                    </>
                )
            }
            
        </div>
    )
}