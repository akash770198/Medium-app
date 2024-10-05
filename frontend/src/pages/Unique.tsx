import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";
import { UniqueCard } from "../components/UniqueCard";
import { uniqueBlogs } from "../hooks"
import { Link } from "react-router-dom";

export const Unique = () => {
    const { loading, blogs } = uniqueBlogs();

    if (loading) {
        return <div>
            <Appbar />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <div className="sticky top-0 z-50">
                <Appbar />
            </div>
            {blogs?.length ? (
                blogs.map(blog => (
                    <UniqueCard
                        id={blog.id}
                        title={blog.title}
                        content={blog.content}
                        createdAt={ new Date(blog.createdAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    />
                ))
            ) : (
                <div className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">No blogs found</h2>
                        <p className="text-lg text-gray-600 mb-6">It looks like you haven't created any blogs yet. Start your blogging journey now!</p>

                        <Link to="/publish">
                            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
                                Create Your First Blog
                            </button>
                        </Link>
                    </div>
                </div>

            )}
        </div>
    );

}