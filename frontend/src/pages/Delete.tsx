import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";


export const DeleteBlog = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { blogId } = useParams(); // Get blog ID from URL parameters
  const userId = localStorage.getItem("UserId")

  const handleDelete = async () => {
    setIsDeleting(true); // Show loading state during deletion
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${blogId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        // Successfully deleted, redirect to the blog list or home
        alert("Blog post deleted successfully.");
        navigate(`/unique/${userId}`); // Redirect to "my posts" page
      } else {
        alert(response.data.message || "Error deleting post.");
      }
    } catch (error) {
      console.error("Error deleting the post:", error);
      alert("An error occurred while deleting the post.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Delete Post ?</h2>
        <p>Are you sure you want to delete this post?</p>
        <div className="mt-6">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition duration-300"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-400 transition duration-300 ml-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
