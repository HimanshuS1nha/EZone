import ShowCase from "../components/Showcase"

const Products = () => {
    return (
        <div>
            <p className="font-semibold text-3xl text-center">Our Products</p>
            <ShowCase category="electronics" limit={4} />
            <ShowCase category="jewelery" limit={4} />
            <ShowCase category="men's clothing" limit={4} />
            <ShowCase category="women's clothing" limit={4} />
        </div>
    )
}

export default Products