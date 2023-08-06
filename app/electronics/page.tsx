import { ItemProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const Electronics = async () => {
    const request = await fetch('https://fakestoreapi.com/products/category/electronics');
    const data: ItemProps[] = await request.json();
    return (
        <div className="flex justify-center flex-wrap">
            {data.map((ele) => {
                return <Link href={`/${ele.id}`} key={ele.id} className="max-w-xs rounded overflow-hidden shadow-lg mx-5 my-3 hover:bg-neutral-300">
                    <Image className="w-full h-60" src={ele.image} alt="Sunset in the mountains" width={200} height={400} />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{ele.title}</div>
                        <p className="text-gray-700 text-sm">
                            {ele.description}
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-lg font-semibold text-gray-700 mr-2 mb-2">₹ {Math.ceil(ele.price * 82)}</span>
                    </div>
                </Link>
            })}
        </div>
    )
}

export default Electronics