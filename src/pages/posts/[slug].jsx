// import Navbar from "@/src/components/Navbar";
import {
  getComments,
  createComment,
  getSinglePost,
  getUserLikedVideos,
  getUser,
  getCurrentUser,
} from "@/src/lib/appwrite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShareAlt,
  AiOutlineComment,
} from "react-icons/ai";
import { IoSend } from "react-icons/io5";

import { FaComment, FaRegCommentAlt } from "react-icons/fa";

export default function Page() {
  const router = useRouter();
  const [post, setPost] = useState({});
  const [isdonor, setIsdonor] = useState(false);
  const [isloggedin, setIsloggedin] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedin = localStorage.getItem("islogged");
      setIsloggedin(isLoggedin === "true");
      setIsdonor(JSON.parse(localStorage.getItem("isdonar")));
    }
  }, []);

  useEffect(() => {
    async function getPost() {
      const newPost = await getSinglePost(router.query.slug);
      setPost(newPost);
      const postsILiked = await getUserLikedVideos(isdonor);
      const newLikedPosts = {};
      for (let i in postsILiked) {
        newLikedPosts[postsILiked[i].$id] = true;
      }
      setLikedPosts(newLikedPosts);

      const newComments = await getComments(router.query.slug);
      // Fetch user details for each comment
      const commentsWithUser = await Promise.all(
        newComments.map(async (comment) => {
          const user = await getUser(comment.user_id, comment.is_donor); // Assuming comment has a userId field

          return { ...comment, user };
        })
      );
      console.log("comments", commentsWithUser);
      setComments(commentsWithUser);
    }
    if (router.query.slug) {
      getPost();
    }
  }, [router.query.slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      alert("Please enter a comment");
      return;
    }

    const user = await getCurrentUser(true);
    const user_id = isdonor ? user.user_id : user.organisation_id;

    setComments([
      ...comments,
      {
        $createdAt: Date.now(),
        text: comment,
        user: await getUser(user_id, isdonor), // TODO: this is inefficient af
      },
    ]);

    setIsSubmitting(true);

    try {
      await createComment(router.query.slug, comment, isdonor);
      setComment(""); // Clear the textarea after successful submission
      alert("Comment posted successfully");
    } catch (error) {
      console.error("Error posting comment:", error.message);
      alert("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  function renderComments() {
    // return comments.map((comment) => (
    //   <div key={comment.$id} className="p-4 border-b">
    //     <p className="text-gray-800">{comment.text}</p>
    //     <p className="text-gray-500 text-sm">
    //       {new Date(comment.$createdAt).toLocaleString()}
    //     </p>
    //   </div>
    // ));
    return comments.map((comment) => (
      <div key={comment.$id} className="p-4 border-b">
        <div className="flex items-center mb-2">
          <img
            src={comment.user.avatar_url} // Assuming the user object has profilePictureUrl
            alt={comment.user.name}
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
          <p className="font-semibold text-gray-800">{comment.user.name}</p>
        </div>
        <p className="text-gray-800">{comment.text}</p>
        <p className="text-gray-500 text-sm">
          {new Date(comment.$createdAt).toLocaleString()}
        </p>
      </div>
    ));
  }

  return (
    <>
      {/* <Navbar islogged={isloggedin} /> */}
      <div className="flex flex-col gap-8">
        <div
          key={post.$id}
          className="bg-white rounded-lg shadow-lg mb-6 p-4 md:w-3/4 max-w-2xl mx-auto"
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

          <p className="text-gray-800 nunito text-base mb-4">
            {post.description}
          </p>

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
                <p>{comments.length}</p>
              </a>
            </div>
            <button className="focus:outline-none">
              <AiOutlineShareAlt className="text-gray-600 w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Comment Section */}
        <div className="flex flex-col gap-4 md:w-3/4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold jost">Comments</h2>
          <div className="w-full flex flex-row">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-row comment-form"
            >
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full min-h-16 border-2 border-black/10 rounded-lg p-4 outline-none focus:border-primary-blue"
                placeholder="Add a Comment..."
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="p-4 group disabled:opacity-40"
              >
                <IoSend
                  className="w-8 h-8 group-hover:opacity-80"
                  title="send message"
                />
              </button>
            </form>
          </div>
          {renderComments()}
        </div>
      </div>
    </>
  );
}
