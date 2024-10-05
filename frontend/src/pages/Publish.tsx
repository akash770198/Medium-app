import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Publish = () => {
    const { blogId } = useParams(); // To check if it's an edit operation
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false); // To track whether it's edit mode

    useEffect(() => {
        // If blogId exists, we're in edit mode
        if (blogId) {
            setIsEdit(true);
            // Fetch the blog details to populate the fields
            axios.get(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(response => {
                setTitle(response.data.post.title);
                setDescription(response.data.post.content);
            }).catch(error => {
                console.error("Error fetching blog:", error);
            });
        }
    }, [blogId]);

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                // Edit an existing blog post
                await axios.put(`${BACKEND_URL}/api/v1/blog/edit`, {
                    id: blogId,
                    title,
                    content: description
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                navigate(`/blog/${blogId}`);
            } else {
                // Create a new blog post
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title,
                    content: description
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                navigate(`/blog/${response.data.id}`);
            }
        } catch (error) {
            console.error("Error while publishing:", error);
        }
    };

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Title"
                    />

                    <TextEditor value={description} onChange={(e) => setDescription(e.target.value)} />

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        {isEdit ? "Update post" : "Publish post"}
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ value, onChange }: { value: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea
                            value={value}
                            onChange={onChange}
                            id="editor"
                            rows={8}
                            className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                            placeholder="Write an article..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
