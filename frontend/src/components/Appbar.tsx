
import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
    const username = localStorage.getItem("Username") || "Anonymous";
    const userid = localStorage.getItem("UserId");

    return <div className="border-b flex justify-between px-10 py-4 bg-white shadow-md mb-2">
        <Link to={`/blogs`} className="text-lg font-bold text-gray-800 flex items-center cursor-pointer">
            Medium
        </Link>

        <div className="flex items-center space-x-4">
            <Link to={`/publish`}>
                <button
                    type="button"
                    className="text-white bg-gray-600 hover:bg-gray-500 font-medium rounded-md text-sm px-5 py-2.5 transition duration-300"
                >
                    New
                </button>
            </Link>
            <Link to={`/unique/${userid}`}>
                <button
                    type="button"
                    className="text-white bg-gray-600 hover:bg-gray-500 font-medium rounded-md text-sm px-5 py-2.5 transition duration-300"
                >
                    My Posts
                </button>
            </Link>
            <Avatar size={"big"} name={username} />
        </div>
    </div>

}