import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


export interface Blog {
    "content": string;
    "title": string;
    "id": string;
    "author": {
        "name": string
    };
    "authorId": string; //bas ye add kiya hai
    "createdAt": string;
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.post);
                setLoading(false);
            })
    }, [id]);


    return {
        loading,
        blog
    }
}

export const uniqueBlogs = () => {
    const userid = localStorage.getItem("UserId");
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        // const token = localStorage.getItem("token");
        if (!userid) {
            setLoading(false);
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/blog/unique/${userid}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.user.posts);
                setLoading(false);
            })
            .catch(error => {
                console.log('Error fetching blogs:', error.response ? error.response.data : error.message);
            });
    }, [userid])

    return {
        loading,
        blogs
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token being sent:", token);  // Log the token
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.posts);
                setLoading(false);
            })
            .catch(error => {
                console.log('Error fetching blogs:', error.response ? error.response.data : error.message);
            });
    }, []);


    return {
        loading,
        blogs
    }
}