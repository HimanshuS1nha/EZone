"use client";

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify';
import { setCookie } from 'cookies-next';
import { CartProps, OrderProps } from '@/types';
import { useRouter } from 'next/navigation';

const Orders = () => {
    const router = useRouter();
    const [orders, setOrders] = useState<OrderProps[]>([]);
    const { data: session } = useSession();
    const initiatePayment = async (amount: number, oid: number, cart: CartProps[]) => {
        toast("Payment initiated! Please wait", {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        try {
            const request = await fetch('/api/pretransaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount, cart, oid })
            })
            const response = await request.json();
            if (!response.success) {
                return toast.success("Some error occured. Please try again later.", {
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
            setCookie('id', response.id)
            window.location = response.url;
        } catch (error) {
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
    }, [session])

    return (
        <div className="flex flex-col my-3">
            <div className='m-auto'>
                <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <Image src='/logo.png' width={231} height={70} alt='LOGO' className='mb-4' priority={true} />
                </Link>
            </div>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">OrderID</th>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Amount</th>
                                    <th scope="col" className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.map((ele) => {
                                    return <tr key={ele.oid} className="border-b dark:border-neutral-500 hover:bg-pink-300 cursor-pointer">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium" onClick={() => router.push(`/order?id=${ele.oid}`)}>{ele.oid}</td>
                                        <td className="whitespace-nowrap px-6 py-4" onClick={() => router.push(`/order?id=${ele.oid}`)}>{ele.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4" onClick={() => router.push(`/order?id=${ele.oid}`)}>₹ {ele.amount}</td>
                                        <td className={`whitespace-nowrap px-6 py-4 ${ele.paymentStatus === 'Paid' ? 'text-green-500' : "text-red-500"} font-bold`} onClick={() => router.push(`/order?id=${ele.oid}`)}>{ele.paymentStatus === 'Paid' ? '✅' : "❌"}{ele.paymentStatus}</td>
                                        {ele.paymentStatus !== 'Paid' && <td className="bg-transparent hover:bg-pink-500 text-pink-700 font-semibold cursor-pointer hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded" onClick={() => { initiatePayment(ele.amount, ele.oid, ele.products) }}>
                                            Pay
                                        </td>}
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders