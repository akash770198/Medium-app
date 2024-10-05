import { Link } from "react-router-dom";


interface UniqueCardProps {
    id: string;
    title: string;
    content: string;
    createdAt: string;
}

export const UniqueCard = ({
    id,
    title,
    content,
    createdAt,
}: UniqueCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="flex justify-center py-2">
            <div className="p-6 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 pt-2">
                    {title}
                </div>
                <div className="text-md font-light text-gray-600 mt-2">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="text-slate-500 text-sm font-light">
                        {`${Math.ceil(content.length / 100)} minutes read`}
                    </div>
                    <div className="pl-2 font-light text-slate-500">
                        {createdAt}
                    </div>
                </div>
            </div>
        </div>

    </Link>
}

