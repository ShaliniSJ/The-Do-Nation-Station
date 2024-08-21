import React, { useState, useEffect } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { BsPaperclip } from "react-icons/bs";
// import { uploadFile } from "../lib/appwrite";
// import {
//   createPost,
//   getAllPost,
//   likeVideo,
//   getUserLikedVideos,
// } from "../lib/appwrite";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShareAlt,
  AiOutlineComment,
} from "react-icons/ai";

import { FaComment, FaRegCommentAlt } from "react-icons/fa";

import {
  uploadFile,
  createPost,
  getAllPost,
  likeVideo,
  unlikeVideo,
  getUserLikedVideos,
  getComments,
  countComments,
} from "../lib/appwrite";

const ExploreTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState("");
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [userId, setUserId] = useState("");
  const [isdonor, setIsdonor] = useState(false);
  const [isloggedin, setIsloggedin] = useState(false);
  const [comments, setComments] = useState({});

  const handleAddPostClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDescription("");
    setSelectedFile(null);
    setFileURL("");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedin = localStorage.getItem("islogged");
      setIsloggedin(isLoggedin === "true");

      setIsdonor(JSON.parse(localStorage.getItem("isdonar")));
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPost();
        setPosts(fetchedPosts);
        if (!isloggedin) {
          return;
        }
        const postsILiked = await getUserLikedVideos(isdonor);
        const newLikedPosts = {};
        for (let i in postsILiked) {
          // const likedPost = {};
          // likedPost[postsILiked[i].$id] = true;
          // newLikedPosts.push(likedPost);
          newLikedPosts[postsILiked[i].$id] = true;
        }

        setLikedPosts(newLikedPosts);

        // const allComments = await getComments();
        // console.log("comments", allComments);
        // const newComments = {};
        // if (allComments) {
        //   for (let i in allComments) {
        //     allComments[i];
        //   }
        // }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, [isdonor]);

  useEffect(() => {
    async function updateComments() {
      const newComments = {};
      if (posts.length > 0) {
        for (let i in posts) {
          newComments[posts[i].$id] = await countComments(posts[i].$id);
          // console.log("hewhe", posts[i].$id, newComments[posts[i].$id]);
        }
        setComments(newComments);
      }
    }
    updateComments();
  }, [posts]);

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
      if (selectedFile) {
        uploadedFileURL = await uploadFile(selectedFile, "image");
      }
      await createPost(uploadedFileURL, isdonor, description);

      const fetchedPosts = await getAllPost();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert("File upload failed. Please try again.");
      return;
    }

    handleCloseModal();
  };

  const getPost = (likedPosts) => {
    // const [likedPosts, setLikedPosts] = useState({});

    console.log("posts", posts);

    const toggleLike = async (postId, currentLikes) => {
      setLikedPosts((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }));

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.$id === postId
            ? { ...post, like: post.like + (likedPosts[postId] ? -1 : 1) }
            : post
        )
      );

      try {
        if (likedPosts[postId]) {
          await unlikeVideo(isdonor, postId, currentLikes);
        } else {
          await likeVideo(isdonor, postId, currentLikes);
        }
      } catch (error) {
        console.error("Error liking post:", error.message);
      }
    };

    return posts.map((post) => (
      <div
        key={post.$id}
        className="bg-white rounded-lg shadow-lg mb-6 p-4 max-w-2xl mx-auto"
      >
        <div className="flex items-center mb-4">
          <img
            src={post.poster_url}
            alt={post.poster_name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {post.poster_name}
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(post.$createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {post.image_url && (
          <img
            src={post.image_url}
            alt="Post"
            className="w-full h-auto rounded-lg mb-4"
          />
        )}

        <p className="text-gray-800 text-base mb-4">{post.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-row gap-16">
            <div className="flex flex-row items-center">
              <button
                disabled={!isloggedin}
                onClick={() => toggleLike(post.$id, post.like)}
                className="focus:outline-none disabled:opacity-50"
              >
                {likedPosts[post.$id] ? (
                  <AiFillHeart className="text-red-500 w-6 h-6" />
                ) : (
                  <AiOutlineHeart className="text-gray-600 w-6 h-6" />
                )}
              </button>
              <div className="text-black ml-3">{post.like}</div>
            </div>
            <a
              href={"/posts/" + post.$id}
              className="flex flex-row items-center gap-4"
            >
              {/* <AiOutlineComment className="w-6 h-6" />
              <FaComment /> */}
              <FaRegCommentAlt className="w-5 h-5 text-gray-600" />
              <p>{comments[post.$id] ? comments[post.$id] : 0}</p>
            </a>
          </div>
          <button className="focus:outline-none">
            <AiOutlineShareAlt className="text-gray-600 w-6 h-6" />
          </button>
        </div>
      </div>
    ));
  };

  return <>{getPost(likedPosts)}</>;
};

export default ExploreTab;
