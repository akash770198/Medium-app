import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Fullblog = ({ blog }: { blog: Blog }) => {
    const currentUserId = localStorage.getItem("UserId");
    console.log(blog);
    console.log(currentUserId);

    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div>
            <div className="sticky top-0">
                <Appbar />
            </div>
            <div className="flex justify-center bg-gray-50 min-h-screen">
                <div className="grid grid-cols-12 gap-8 px-10 w-full max-w-screen-2xl py-12">
                    <div className="col-span-12 md:col-span-8 bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                            <div className="text-4xl font-extrabold text-gray-800">
                                {blog.title}
                            </div>
                            <div className="flex">
                                <div className="mx-2">
                                    {blog.authorId === currentUserId && (
                                        <Link to={`/blog/edit/${blog.id}`}>
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-300">
                                                Update
                                            </button>
                                        </Link>
                                    )}
                                </div>
                                <div className="mx-2">
                                    {blog.authorId === currentUserId && (
                                        <Link to={`/blog/delete/${blog.id}`}>
                                            <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition duration-300">
                                                Delete
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="text-slate-500 pt-2 text-md">
                            Posted on {formattedDate}
                        </div>
                        <div className="pt-4 text-lg leading-relaxed text-gray-700">
                            {blog.content}
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-4 bg-white p-6 rounded-lg shadow-md">
                        <div className="text-slate-600 text-lg font-semibold mb-4">
                            Author
                        </div>
                        <div className="flex items-center">
                            <div className="pr-4">
                                <Avatar size="big" name={blog.author.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-800">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500 text-md">
                                    Every story has the power to change the world, let this one inspire you to take your next step.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
