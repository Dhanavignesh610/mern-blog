import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import PostCard from "../components/PostCard";

function Category() {
    const [categoryposts,setCategoryposts] = useState([]) 
    const location = useLocation();
    const path = location.pathname;
    const {type} = useParams()
    useEffect(() => {
        const fetchPosts = async () => {
          const res = await fetch(`/api/post/getposts?category=${type}`);
          if (!res.ok) {
            throw new Error('Failed to fetch posts');
          }
          const data = await res.json();
          setCategoryposts(data.posts);
        };
        fetchPosts();
      }, []);
  return (
    <div className='max-w-6xl mx-auto flex flex-col gap-6'>
      <h1 className='text-3xl mt-10 p-3 orbitron uppercase text-black text-center max-w-2xl mx-auto lg:text-3xl'>
        {type}
      </h1>
        <div className='flex mt-2 flex-wrap gap-7'>
          {categoryposts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
    </div>
  )
}

export default Category