import { FaArrowRightLong } from "react-icons/fa6";

interface ICard {
    title: string,
    desc?: string | null
}

const Card = ({ title, desc }: ICard) => {

    return (
        <div className='p-4 cursor-pointer group rounded-lg relative border-2 border-gray-400 group flex flex-col'>
            <p className="text-2xl mb-2">{title}</p>
            <p className="mr-10">{desc}</p>
            <FaArrowRightLong className="text-4xl group-hover:translate-x-2 transition-transform p-2 rounded absolute right-4 top-1/2 -translate-y-1/2"/>
        </div>
    )
}

export default Card
