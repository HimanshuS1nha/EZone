"use client";
import { SearchParamProps } from "@/types";
import { getCookie } from "cookies-next";
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Link from "next/link";
import { BsArrowRight } from 'react-icons/bs'

const Success = ({ searchParams }: SearchParamProps) => {
    const oid = searchParams.id;
    const [paymentDone, setpaymentDone] = useState<boolean | null>(null);
    const [orderId, setOrderId] = useState("");
    const id = getCookie('id');
    useEffect(() => {
        const fetchPaymentStatus = async () => {
            const request = await fetch('/api/posttransaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, oid })
            });
            const response = await request.json();
            if (response.success) {
                setpaymentDone(true);
                setOrderId(response.id);
                toast.success(response.message, {
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
                setpaymentDone(false)
                toast.error("Some error occured! If you don't get the confirmation email, please contact us", {
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
        fetchPaymentStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {paymentDone === null && <p className="text-neutral-400 text-center my-4">Loading...</p>}
            {paymentDone && <div className="flex flex-col items-center my-4">
                <p className="text-xl">Thank You for shopping with us</p>
                <p>Your order will be delivered to you in 3 days time.</p>
                <p>Your OrderID : <span className="text-2xl font-semibold">{orderId}</span></p>
                <p className="text-red-500 text-sm">Please note this down for future reference</p>
                <Link href={'/'} className='text-black rounded-full py-2 px-6 my-2 font-semibold flex items-center bg-pink-400 hover:bg-pink-600 group hover:text-white'>Go to Home Page <BsArrowRight className='mx-2 group-hover:-rotate-45' /></Link>
            </div>}
            {paymentDone === false && <div className="flex flex-col items-center my-4">Some error occured! If you don&apos;t get the confirmation email, please contact us</div>}
        </>
    )
}

export default Success