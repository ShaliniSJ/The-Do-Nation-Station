import React, { useState, useEffect } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi"; // Icon for the Add Post button
import { BsPaperclip } from "react-icons/bs"; // Icon for the Pin button
import { uploadFile } from "../lib/appwrite"; // Assume this is your file upload function
import { createPost, getAllPost } from "../lib/appwrite";

const ExploreTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState("");
  const [posts, setPosts] = useState([]);

  const handleAddPostClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDescription("");
    setSelectedFile(null);
    setFileURL("");
  };

  const [isdonor, setIsdonor] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
        try {
          const fetchedPosts = await getAllPost();
          setPosts(fetchedPosts);
        } catch (error) {
          console.error("Error fetching posts:", error.message);
        }
      };
  
      fetchPosts();
    if (typeof window !== "undefined") {
      const isDonor = localStorage.getItem("isdonar");
      if (isDonor === "true") {
        setIsdonor(true);
      } else {
        setIsdonor(false);
      }
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const fileObjectURL = URL.createObjectURL(file);
      setFileURL(fileObjectURL);
    } else {
      alert("Please select an image file.");
    }
  };

  const handlePostClick = async () => {
    let uploadedFileURL = fileURL;

    try {
        console.log("selectedFile", selectedFile);
        if (selectedFile) {
        uploadedFileURL = await uploadFile(selectedFile, "image");
        console.log("file url", uploadedFileURL);
        }
        const response = await createPost(
          uploadedFileURL,
          isdonor,
          description
        );

        const fetchedPosts = await getAllPost();
        setPosts(fetchedPosts);
        console.log("response", response);
        }
       catch (error) {
        console.error("Error uploading file:", error.message);
        alert("File upload failed. Please try again.");
        return; // Exit if the upload fails
      }

    const newPost = {
      id: posts.length + 1,
      image: uploadedFileURL,
      text: description,
    };

    setPosts([newPost, ...posts]);
    handleCloseModal();
  };

  const getPost = () => {
    return posts.map((post) => (
        <div key={post.$id} className="bg-white rounded-lg shadow-lg mb-6 p-4 max-w-2xl mx-auto">
            <div className="flex items-center mb-4">
                <img
                    src={post.poster_url}
                    alt={post.poster_name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{post.poster_name}</h3>
                    <p className="text-sm text-gray-500">{new Date(post.$createdAt).toLocaleString()}</p>
                </div>
            </div>

            {/* Post image */}
            {post.image_url && (
                <img
                    src={post.image_url}
                    alt="Post"
                    className="w-full h-auto rounded-lg mb-4"
                />
            )}

            {/* Post description */}
            <p className="text-gray-800 text-base">{post.description}</p>
        </div>
    ));
};

  return (
    <div className="relative p-4">
      <HiOutlinePlusCircle
        onClick={handleAddPostClick}
        className="text-blue-500 text-4xl absolute top-4 right-4 cursor-pointer"
      />

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-1/2 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add Post</h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full h-20 p-4 border rounded mb-4 resize-none"
            />
            {fileURL && (
              <div className="overflow-y-auto max-h-64 mb-4">
                <img
                  src={fileURL}
                  alt="Selected"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
            <div className="flex justify-between items-center mb-4">
              <label htmlFor="fileInput" className="cursor-pointer">
                <BsPaperclip className="text-blue-500 text-2xl" />
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
              <button
                onClick={handlePostClick}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Post
              </button>
            </div>
            <button
              onClick={handleCloseModal}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-8">{getPost()}</div>
    </div>
  );
};

export default ExploreTab;
