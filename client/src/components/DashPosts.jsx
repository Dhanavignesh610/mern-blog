import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import useAxiosprivate from '../hooks/useAxiosprivate';
import Pagination from './Pagination';

export default function DashPosts() {
  const axiosPrivate = useAxiosprivate()
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const res = await axiosPrivate.get(`post/getposts?userId=${currentUser._id}`);
        const data = res.data
        if (res.status === 200) {
          setUserPosts(data.posts);
          setLoading(false)
          setTotalPages(Math.ceil(data.posts.length / postsPerPage))
        }
      } catch (error) {
        const errormsg = error.response?.data?.message || "something went wrong "        
        console.log(errormsg);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0}); 
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await axiosPrivate.delete(`post/deletepost/${postIdToDelete}/${currentUser._id}`);
        const data = res.data
        if (res.status !== 200) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      const errormsg = error.response?.data?.message || "something went wrong "        
      console.log(errormsg);
    }
  };

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentUserPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 w-full'>
      {currentUser.isAdmin ? ( loading ? (
        <>
         <Table hoverable className='shadow-md'>
         <Table.Head>
           <Table.HeadCell>Date updated</Table.HeadCell>
           <Table.HeadCell>Post image</Table.HeadCell>
           <Table.HeadCell>Post title</Table.HeadCell>
           <Table.HeadCell>Category</Table.HeadCell>
           <Table.HeadCell>Delete</Table.HeadCell>
           <Table.HeadCell>
             <span>Edit</span>
           </Table.HeadCell>
         </Table.Head>
          </Table>
            <div className="flex items-center justify-center min-h-[75vh]">
            <p className='text-lg'>Loading...</p>
           </div></>
      ) : (
        currentUserPosts.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>Post image</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>
              {currentUserPosts.map((post) => (
                <Table.Body className='divide-y'  key={post._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className='w-20 h-10 object-cover bg-gray-500'
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className='font-medium text-gray-900 dark:text-white'
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className='font-medium text-red-500 hover:underline cursor-pointer'
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className='text-teal-500 hover:underline'
                        to={`/update-post/${post._id}`}
                      >
                        <span>Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
        {totalPages > 1 ? (
         <Pagination onPaginationClick={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>
        ) : (
         ''
        )}
          </>
        ) : (
          <p>You have no users yet!</p>
        )
      )) : (
        <p>You are not authorized to view comments.</p>    
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
        className={`${theme === 'dark' ? 'dark' : ''}`} 
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center bg-dark'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-200'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color='gray' className='dark:text-gray-200 dark:border-gray-300' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
