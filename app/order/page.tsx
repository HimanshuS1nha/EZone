"use client";

import { OrderProps, SearchParamProps } from '@/types';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const Order = ({ searchParams }: SearchParamProps) => {
    const [order, setOrder] = useState<OrderProps | null>(null);
    const [details, setDetails] = useState("order")
    const session = useSession();
    const { id } = searchParams;
    useEffect(() => {
        const fetchOrder = async () => {
            const request = await fetch('/api/getorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id)
            })
            const response = await request.json();
            if (!response.success) {
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
            else {
                setOrder(response.order[0])
            }
        }
        if (!session) return;
        else {
            fetchOrder();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    return (
        <>
            {order && <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">EZONE</h2>
                            <h2 className="text-gray-900 text-3xl title-font font-medium mb-4">OrderID: {id}</h2>
                            <div className="flex mb-4">
                                <span className={`flex-grow hover:text-pink-500 border-b-2 ${details === 'order' ? 'border-pink-500' : 'border-gray-300'} py-2 text-lg px-1 cursor-pointer`} onClick={() => setDetails("order")}>Order</span>
                                <span className={`flex-grow hover:text-pink-500 border-b-2 ${details === 'address' ? 'border-pink-500' : 'border-gray-300'} py-2 text-lg px-1 cursor-pointer`} onClick={() => setDetails("address")}>Address</span>
                                <span className={`flex-grow hover:text-pink-500 border-b-2 ${details === 'products' ? 'border-pink-500' : 'border-gray-300'} py-2 text-lg px-1 cursor-pointer`} onClick={() => setDetails("products")}>Products</span>
                            </div>
                            {details === "order" && <>
                                <div className="flex border-t border-gray-200 py-2">
                                    <span className="text-gray-500">OrderID</span>
                                    <span className="ml-auto text-gray-900">{id}</span>
                                </div>
                                <div className="flex border-t border-gray-200 py-2">
                                    <span className="text-gray-500">Payment Status</span>
                                    <span className={`ml-auto text-gray-900 ${order.paymentStatus === 'Paid' ? 'text-green-500' : "text-red-500"}`}>{order.paymentStatus === 'Paid' ? '✅' : "❌"}{order.paymentStatus}</span>
                                </div>

                            </>}
                            {details === "address" && <>
                                <div className="flex border-t border-gray-200 py-2">
                                    <span className="text-gray-500">City</span>
                                    <span className="ml-auto text-gray-900">{order.city}</span>
                                </div>
                                <div className="flex border-t border-gray-200 py-2">
                                    <span className="text-gray-500">State</span>
                                    <span className="ml-auto text-gray-900">{order.state}</span>
                                </div>
                                <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                    <span className="text-gray-500">Pin Code</span>
                                    <span className="ml-auto text-gray-900">{order.pincode}</span>
                                </div>
                            </>}
                            {details === "products" && <>
                                {order.products.map((ele) => {
                                    return <div key={ele.name} className='mb-8'>
                                        <div className="flex border-t border-gray-200 py-2">
                                            <span className="text-gray-500">Name</span>
                                            <span className="ml-auto text-gray-900">{ele.name}</span>
                                        </div>
                                        <div className="flex border-t border-gray-200 py-2">
                                            <span className="text-gray-500">Quantity</span>
                                            <span className="ml-auto text-gray-900">{ele.quantity}</span>
                                        </div>
                                        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                            <span className="text-gray-500">Price Per Quantity</span>
                                            <span className="ml-auto text-gray-900">{ele.price}</span>
                                        </div>
                                    </div>
                                })}
                            </>}
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">₹ {order.amount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
        </>
    )
}

export default Order