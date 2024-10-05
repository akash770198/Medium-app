import { Link } from "react-router-dom";


interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    createdAt: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    createdAt
}: BlogCardProps) => {

    const formattedDate = new Date(createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return <Link to={`/blog/${id}`}>
        <div className="flex justify-center mb-4">
            <div className="p-6 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                    <Avatar size={"small"} name={authorName} />
                    <div className="font-extralight pl-2 text-sm flex justify-center flex-col text-gray-800">
                        {authorName}
                    </div>
                    <div className="flex justify-center flex-col pl-2">
                        <Circle />
                    </div>
                    <div className="pl-2 font-thin text-slate-500">
                        {formattedDate}
                    </div>
                </div>
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
                </div>
            </div>
        </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300`}>
            {name[0]}
        </span>
    </div>

}