"use client";
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, increaseQuantity, decreaseQuantity } from '../Redux/slices/CartSlice';
import { useEffect, useState } from 'react';
import { CartProps, StateProps, UserProps } from '@/types';
import { useSession } from 'next-auth/react';
import { setCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";

const Checkout = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [userCart, setUserCart] = useState<CartProps[]>([])
    const [captchaDOne, setCaptchaDOne] = useState(false)
    const [button, setButton] = useState(false);
    const { cart, totalPrice } = useSelector((state: StateProps) => state.cart);
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
        if (user.name?.length > 3 && user.phone?.length === 10 && user.pincode?.length === 6 && user.email && user.city && user.state && user.address) {
            setButton(true)
        }
    }
    const onCaptchaChange = () => {
        setCaptchaDOne(true)
    }
    const initiatePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        const oid = Math.floor(Date.now() * Math.random())
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
        const request = await fetch('/api/pretransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: totalPrice, user, cart, oid })
        })
        const response = await request.json();
        if (!response.success) {
            return toast.error("Some error occured. Please try again later.", {
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
    }
    useEffect(() => {
        setUserCart(cart);
        if (session) {
            setUser((prev) => {
                return { ...prev, name: session.user?.name, email: session.user?.email } as UserProps
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Checkout</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Fill in your details, pay the amount and your products will be with you in no time.</p>
                <form className="space-y-8" autoComplete='off' method='POST'>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                        <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 dark:shadow-sm-light" placeholder="Your Name" value={user.name} onChange={handleChange} name='name' required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 dark:shadow-sm-light" placeholder="example@gmail.com" value={user.email} onChange={handleChange} name='email' required />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone Number</label>
                        <input type="text" id="phone" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 dark:shadow-sm-light" placeholder="Your Phone Number" value={user.phone} onChange={handleChange} name='phone' required minLength={10} maxLength={10} />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Address</label>
                        <textarea id="address" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" placeholder="Your Address" value={user.address} onChange={handleChange} name='address' />
                    </div>
                    <div>
                        <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pin Code</label>
                        <input type="text" id="pincode" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 dark:shadow-sm-light" placeholder="Pin Code" value={user.pincode} onChange={handleChange} name='pincode' required maxLength={6} />
                    </div>
                    <div>
                        <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">State</label>
                        <input type="text" id="state" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 dark:shadow-sm-light" placeholder="Your State" value={user.state} onChange={handleChange} name='state' required />
                    </div>
                    <div>
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">City</label>
                        <input type="text" id="city" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 dark:shadow-sm-light" placeholder="Your City" value={user.city} onChange={handleChange} name='city' required />
                    </div>
                    <div className='bg-pink-200 p-4 '>
                        <h2 className='font-semibold my-3'>Review Your Cart</h2>
                        <ul role="list" className="my-6 divide-y divide-gray-200">
                            {userCart.length === 0 && <div className='my-3 font-semibold'>Your Cart is empty.</div>}
                            {userCart.length !== 0 && userCart.map((ele, i) => {
                                return <li key={i} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <Image src={ele.image} alt="PRODUCT" className="h-full w-full object-cover object-center" width={94} height={94} />
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a href="#">{ele.name}</a>
                                                </h3>
                                                <p className="ml-4">₹{ele.price * ele.quantity}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 capitalize">{ele.category}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500"><button className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 text-base rounded-full mx-2" onClick={() => { dispatch(decreaseQuantity(ele.name)) }}>
                                                -
                                            </button>Qty: {ele.quantity}<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 mx-2 px-2 rounded-full text-base" onClick={() => { dispatch(increaseQuantity(ele.name)) }}>
                                                    +
                                                </button></p>
                                            <div className="flex">
                                                <button type="button" className="font-medium text-pink-600 hover:text-pink-500" onClick={() => { dispatch(deleteItem(ele)) }}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                        onChange={onCaptchaChange}
                    />
                    <button className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg disabled:bg-pink-300 bg-pink-500 sm:w-fit hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300" disabled={!button || totalPrice <= 0 || !captchaDOne} onClick={initiatePayment}>Pay ₹{totalPrice}</button>
                </form>
            </div>
        </section>

    )
}

export default Checkout