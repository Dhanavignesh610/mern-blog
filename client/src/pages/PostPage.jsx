import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import useAxiosprivate from "../hooks/useAxiosprivate";

export default function PostPage() {
  const axiosPrivate = useAxiosprivate();
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);  
        const res = await axiosPrivate.get(`post/getposts?slug=${postSlug}`);
        const data = res.data
        if (res.status === 200) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }else{
          setError(true);
          setLoading(false);
          return;
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
    try {
      const res = await axiosPrivate.get(`post/getposts?limit=3`);
      const data = res.data
      if (res.status === 200) {
        setRecentPosts(data.posts);
      }
    }
    catch (error) { 
      const errormsg = error.response.data.message || "something went wrong "        
      console.log(errormsg);
    }  
  }  
  fetchRecentPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-2xl mt-10 px-3 pb-2 orbitron text-black dark:text-white uppercase text-center font-serif max-w-2xl mx-auto lg:text-3xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-2 orbitron"
      >
        <Button color="gray" pill size="xs" className="uppercase">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-400 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <CommentSection postId={post._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
