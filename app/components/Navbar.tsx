"use client";

import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useSelector } from "react-redux";
import { StateProps } from "@/types";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { updateCart, computeTotalPrice } from "../Redux/slices/CartSlice";
import Cart from "./Cart";

const Navbar = () => {
    const router = useRouter();
    const { cart, totalPrice } = useSelector((state: StateProps) => {
        return state.cart;
    });
    const dispatch = useDispatch();
    const pathname = usePathname();
    const [showCart, setShowCart] = useState(false);
    const [showNavbar, setShowNavbar] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const { data: session } = useSession();

    const logout = async () => {
        await signOut({ redirect: false });
        setShowAccount(false)
        router.push('/')
    }

    useEffect(() => {
        dispatch(computeTotalPrice())
        dispatch(updateCart())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    return (
        <nav className="flex justify-around items-center h-[11vh]">
            <Image src={'/logo.webp'} width={70} height={70} alt="EZONE" className="absolute md:static top-1 left-4" />
            <ul className={`flex flex-col md:flex-row absolute md:static bg-pink-200 md:bg-transparent w-full md:w-auto top-[11%] h-auto items-center justify-center ${!showNavbar ? 'hidden' : 'flex'} md:flex delay-100`}>
                <li><Link href={'/'} className={`mx-5 ${showNavbar ? 'inline-block my-3' : ''} hover:bg-pink-200 p-2 rounded-sm ${pathname === '/' && !showNavbar ? 'border-b-4 border-b-pink-400' : ''}`} onClick={() => setShowNavbar(false)}>Home</Link></li>
                <li><Link href={'/electronics'} className={`mx-5 ${showNavbar ? 'inline-block my-3' : ''} hover:bg-pink-200 p-2 rounded-sm ${pathname.includes('/electronics') ? 'border-b-4 border-b-pink-400' : ''}`} onClick={() => setShowNavbar(false)}>Electronics</Link></li>
                <li><Link href={'/jewelery'} className={`mx-5 ${showNavbar ? 'inline-block my-3' : ''} hover:bg-pink-200 p-2 rounded-sm ${pathname.includes('/jewelery') ? 'border-b-4 border-b-pink-400' : ''}`} onClick={() => setShowNavbar(false)}>Jewelery</Link></li>
                <li><Link href={'/men'} className={`mx-5 ${showNavbar ? 'inline-block my-3' : ''} hover:bg-pink-200 p-2 rounded-sm ${pathname.includes('/men') ? 'border-b-4 border-b-pink-400' : ''}`} onClick={() => setShowNavbar(false)}>Men Wear</Link></li>
                <li><Link href={'/women'} className={`mx-5 ${showNavbar ? 'inline-block my-3' : ''} hover:bg-pink-200 p-2 rounded-sm ${pathname.includes('/women') ? 'border-b-4 border-b-pink-400' : ''}`} onClick={() => setShowNavbar(false)}>Women Wear</Link></li>
            </ul>
            <div className="flex items-center">
                <div className="absolute md:static top-7 right-16">
                    <div className="relative">
                        <FaShoppingCart className="text-2xl hover:text-pink-400 cursor-pointer" onClick={() => setShowCart(true)} />
                    </div>
                </div>
                {!session?.user && <button type="button" className="ml-4 bg-pink-400 px-3 py-2 rounded-full hover:bg-pink-600 text-black hover:text-white absolute md:static top-5 right-24" onClick={() => signIn("google", { redirect: false })}>Sign In</button>}
                {session?.user && <Image src={session.user.image ? session.user.image : "/logo.png"} className="rounded-full ml-4 cursor-pointer absolute md:static top-5 right-24" width={50} height={50} alt="USER" onClick={() => setShowAccount((prev) => !prev)} />}
                {showAccount && <div className="bg-pink-200 absolute w-40 p-4 right-[3%] h-auto top-[9%] rounded-lg">
                    <p className="text-sm">Name: <span className="font-semibold">{session?.user?.name}</span></p>
                    <Link href={'/dashboard'} className="hover:text-pink-500 my-2 inline-block" onClick={() => setShowAccount(false)}>Dashboard</Link>
                    <Link href={'/orders'} className="hover:text-pink-500 my-2 inline-block" onClick={() => setShowAccount(false)}>My Orders</Link>
                    <button type="button" className="bg-pink-400 px-3 py-2 rounded-full hover:bg-pink-600 text-black" onClick={logout}>Logout</button>
                </div>}
            </div>
            <div className={`border-2 border-black z-10 cursor-pointer absolute md:hidden p-1 top-6 right-4 ${showNavbar ? 'bg-pink-400' : 'bg-transparent'}`}>
                <AiOutlineMenu className="text-2xl" onClick={() => setShowNavbar((prev) => !prev)} />
            </div>
            {showCart && cart && <Cart cart={cart} totalPrice={totalPrice} setShowCart={setShowCart} />}
        </nav>
    )
}

export default Navbar