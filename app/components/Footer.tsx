import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <div className='flex justify-between my-6 mx-3 lg:flex-row flex-col items-center lg:items-start'>
            <div className="mb-5 lg:mb-0flex flex-col items-center lg:items-start">
                <Image src={'/logo.webp'} width={70} height={70} alt="EZONE" className="mb-2 mx-auto lg:mx-0" />
                <p className='w-80 text-justify'>Experience the excellence of our ecommerce store. We offer a wide selection of high-quality products with competitive prices, fast shipping, and outstanding customer service. Our user-friendly platform ensures a seamless and secure shopping experience. Trust us to deliver satisfaction and be your go-to destination for all your shopping needs.</p>
            </div>
            <div className="mb-5 lg:mb-0 flex flex-col items-center lg:items-start">
                <p className='text-xl font-semibold mb-3'>Menu</p>
                <ul className="flex flex-col items-center lg:items-start">
                    <li><Link href={'/'} className="mb-2 inline-block hover:text-pink-500">Home</Link></li>
                    <li><Link href={'/electronics'} className="my-2 inline-block hover:text-pink-500">Electronics</Link></li>
                    <li><Link href={'/jewelery'} className="my-2 inline-block hover:text-pink-500">Jewelery</Link></li>
                    <li><Link href={'/men'} className="my-2 inline-block hover:text-pink-500">Men Wear</Link></li>
                    <li><Link href={'/women'} className="my-2 inline-block hover:text-pink-500">Women Wear</Link></li>
                </ul>
            </div>
            <div className="mb-5 lg:mb-0 flex flex-col items-center lg:items-start">
                <p className='text-xl font-semibold mb-3'>Policy</p>
                <ul className="flex flex-col items-center lg:items-start">
                    <li><Link href={'/privacy-policy'} className="mb-2 inline-block hover:text-pink-500">Privacy Policy</Link></li>
                    <li><Link href={'/refund-policy'} className="my-2 inline-block hover:text-pink-500">Refund Policy</Link></li>
                    <li><Link href={'/terms-and-conditions'} className="my-2 inline-block hover:text-pink-500">Terms and Conditions</Link></li>
                </ul>
            </div>
            <div className="mb-5 lg:mb-0 flex flex-col items-center lg:items-start">
                <p className='text-xl font-semibold mb-3'>Contact Us</p>
                <p className="mb-2 inline-block">Address: 123 Main Street, ABC, XYZ, India</p>
                <p><Link href={"mailto:contact@ezone.com"} className="my-2 inline-block hover:text-pink-500">Email: contact@ezone.com</Link></p>
                <p><Link href={"tel:9876543210"} className="my-2 inline-block hover:text-pink-500">Phone: 9876543210</Link></p>
            </div>
        </div>
    )
}

export default Footer