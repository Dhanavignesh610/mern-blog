import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import PostCard from "../components/PostCard";
import useAxiosprivate from "../hooks/useAxiosprivate";
import SkeletonCard from "../components/SkeletonCard";
import Pagination from "../components/Pagination";

export default function Category() {
  const axiosPrivate = useAxiosprivate();
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 8;
  const { type } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axiosPrivate.get(`/post/getposts?category=${type}`);
        if (res.status === 200) {
          const data = res.data;
          setCategoryPosts(data.posts);
          setTotalPages(Math.ceil(data.posts.length / postsPerPage));
          setLoading(false);
        } else {
          throw new Error('Failed to fetch posts');
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || "Something went wrong";
        console.log(errorMsg);
      }
    };
    fetchPosts();
  }, [type, axiosPrivate]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0}); 
  };

  const indexOfLastPost = currentPage * postsPerPage; 
  const indexOfFirstPost = indexOfLastPost - postsPerPage; 
  const currentPosts = categoryPosts.slice(indexOfFirstPost, indexOfLastPost); 

  return (
    <div className='max-w-6xl mx-auto gap-6'>
      <h1 className='text-3xl mt-10 p-3 orbitron uppercase text-black dark:text-white text-center max-w-2xl mx-auto lg:text-3xl'>
        {type}
      </h1>
      <div className='flex mt-6 flex-wrap gap-7 p-5 xl:p-0 2xl:p-0 mb-8'>
        {loading ? (
          Array(4).fill().map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          currentPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        )}
      </div>
      {totalPages > 1 ? (
       <Pagination onPaginationClick={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>
      ) : (
       ''
      )}
    </div>
  );
}
