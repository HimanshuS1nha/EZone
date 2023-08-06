import ProductItem from '@/app/components/ProductItem';
import { ItemProps, SingleItemProps } from '@/types';
import React from 'react'

const Electronic = async ({ params }: SingleItemProps) => {
    const { id } = params;
    const request = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data: ItemProps = await request.json();
    return (
        <ProductItem title={data.title} price={Math.ceil(data.price * 82)} image={data.image} description={data.description} id={data.id} rating={data.rating} category={data.category} showSizes={data.category === "men's clothing" || data.category === "women's clothing"} />
    )
}

export default Electronic