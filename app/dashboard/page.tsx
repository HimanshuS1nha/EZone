"use client";

import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const Dashboard = () => {
    const { data: session } = useSession();
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            const request = await fetch('/api/getorders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'applications/json'
                },
                body: JSON.stringify(session?.user?.email)
            });
            const response = await request.json();
            if (response.success) {
                setOrders(response.orders)
            }
            else {
                toast.error("Some error occured", {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
        if (!session) return;
        else {
            fetchOrders();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

    return (
        <>
            {!session && <p className="text-xl text-center">Loading...</p>}
            {session && <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap-reverse">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">EZONE</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{session.user?.name}</h1>
                            <div className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500">E-Mail</span>
                                <span className="ml-auto text-gray-900">{session.user?.email}</span>
                            </div>
                            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                <span className="text-gray-500">Number of Orders</span>
                                <span className="ml-auto text-gray-900">{!orders ? "Loading..." : orders.length}</span>
                            </div>
                            <div className="flex">
                                <Link href={'/orders'} className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">My Orders</Link>
                            </div>
                        </div>
                        <Image width={400} height={400} alt="ecommerce" className="mb-5 lg:w-1/2 w-full lg:h-[450px] h-40 object-cover object-center rounded-md" src={session.user?.image || ""} />
                    </div>
                </div>
            </section>}
        </>
    )
}

export default Dashboard