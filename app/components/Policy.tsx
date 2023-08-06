import { PolicyComponentProps } from "@/types"

const Policy = ({ policy, title, description }: PolicyComponentProps) => {
    return (
        <div className="max-w-xl md:max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
            <p className="mb-4">{description}</p>
            <ol>
                {policy.map((ele, i) => {
                    return <li key={i} className='mb-6'>
                        <span className="text-xl font-bold my-2 inline-block">{i + 1}. {ele.title}</span>
                        <ol>
                            {ele.content.map((e, index) => {
                                return <li key={index} className="mb-2">{e}</li>
                            })}
                        </ol>
                    </li>
                })}
            </ol>
        </div>
    )
}

export default Policy