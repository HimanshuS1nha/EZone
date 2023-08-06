import styles from '../styles/HeroSection.module.css'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

const HeroSection = () => {
    return (
        <main className={`w-full h-[80vh] ${styles.main} flex flex-col items-center`}>
            <h1 className='text-white font-bold text-2xl mt-28'>EZONE - The best online store</h1>
            <p className='text-white font-bold text-base'>SALE - 30% OFF</p>
            <Link href={'/products'} className='text-black rounded-full bg-white py-2 px-6 my-2 font-semibold flex items-center hover:bg-pink-600 group hover:text-white'>Shop Now <BsArrowRight className='mx-2 group-hover:-rotate-45' /></Link>
        </main>
    )
}

export default HeroSection