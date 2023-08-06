import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsArrowRight } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { decreaseQuantity, deleteItem, increaseQuantity } from '../Redux/slices/CartSlice'
import { CartComponentProps } from '@/types'

const Cart = ({ cart, totalPrice, setShowCart }: CartComponentProps) => {
    const dispatch = useDispatch();
    return (
        <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button type="button" className="-m-2 p-2 text-gray-400 hover:text-pink-500">
                                                <span className="sr-only">Close panel</span>
                                                <AiOutlineClose className="text-xl" onClick={() => setShowCart(false)} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {cart !== null && cart.map((ele) => {
                                                    return <li key={ele.id} className="flex py-6">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <Image width={100} height={100} src={ele.image} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                                                        </div>
                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href="#">{ele.name}</a>
                                                                    </h3>
                                                                    <p className="ml-4">₹ {ele.price * ele.quantity}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500 capitalize">{ele.category}</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <p className="text-gray-500"><button className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 text-base rounded-full mx-2" onClick={() => { dispatch(decreaseQuantity(ele.name)) }}>
                                                                    -
                                                                </button>Qty: {ele.quantity}<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 mx-2 px-2 rounded-full text-base" onClick={() => { dispatch(increaseQuantity(ele.name)) }}>
                                                                        +
                                                                    </button>
                                                                </p>
                                                                <div className="flex">
                                                                    <button type="button" className="font-medium text-pink-600 hover:text-pink-400" onClick={() => dispatch(deleteItem(ele))}>Remove</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                })}
                                                {cart.length === 0 && <p className="text-neutral-500 text-sm">No items to show. Add some items to the cart to preview them here.</p>}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>₹ {totalPrice}</p>
                                    </div>
                                    <div className="mt-6">
                                        <Link href="/checkout" className="flex items-center justify-center rounded-md border border-transparent bg-pink-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-700" onClick={() => setShowCart(false)}>Checkout</Link>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            or&nbsp;
                                            <button type="button" className="font-medium text-pink-600 hover:text-pink-500 flex items-center group" onClick={() => setShowCart(false)}>
                                                Continue Shopping <BsArrowRight className='mx-2 group-hover:-rotate-45' />
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart