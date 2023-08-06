"use client";

import { BsArrowRight } from 'react-icons/bs'
import Link from 'next/link';
import { ErrorProps } from '@/types';

const Error = ({ error, reset }: ErrorProps) => {
    return (
        <div className='flex flex-col items-center my-4'>
            <p className='text-xl text-red-500'>Some error occured</p>
            <div className='flex gap-x-4'>
                <Link href={'/'} className='text-black rounded-full bg-pink-400 py-2 px-6 my-2 font-semibold flex items-center hover:bg-pink-500 group'>Go back to Home Page <BsArrowRight className='mx-2 group-hover:-rotate-45' /></Link>
                <Link href={'/'} className='text-black rounded-full bg-pink-400 py-2 px-6 my-2 font-semibold flex items-center hover:bg-pink-500' onClick={() => reset()}>Try Again</Link>
            </div>
        </div>
    )
}

export default Error