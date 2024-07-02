import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import PostCard from "../components/PostCard";
import useAxiosprivate from "../hooks/useAxiosprivate";
import axios from "../axiosAPI/axios";

export default function Category() {
  const axiosPrivate = useAxiosprivate();
    const [categoryposts,setCategoryposts] = useState([]) 
    const [currentPage,setCurrentPage] = useState([1])
    const [totalPage,setTotalPage] = useState([1])
    const postPerpage = 1;
    const location = useLocation();
    const path = location.pathname; 
    const {type} = useParams()
    useEffect(() => {

        const fetchPosts = async () => {
        try {
          const res = await axios.get(`/post/getposts?category=${type}`)
        if (res.status === 200) {
          const data = res.data
          setCategoryposts(data.posts);
        }else{
            throw new Error('Failed to fetch posts');
        }
        } catch (error) {
          const errormsg = error.response.data.message || "something went wrong "        
          console.log(errormsg);          
        }
        };
        fetchPosts();
      }, [type]);
  return (
    <div className='max-w-6xl mx-auto flex flex-col gap-6'>
      <h1 className='text-3xl mt-10 p-3 orbitron uppercase text-black dark:text-white text-center max-w-2xl mx-auto lg:text-3xl'>
        {type}
      </h1>
        <div className='flex mt-2 flex-wrap gap-7 p-5 xl:p-0 2xl:p-0 mb-8'>
          {categoryposts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
    </div>
  )
}
 