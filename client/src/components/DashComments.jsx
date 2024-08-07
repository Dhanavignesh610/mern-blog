import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import useAxiosprivate from '../hooks/useAxiosprivate';

export default function DashComments() {
  const axiosPrivate = useAxiosprivate()
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const commentPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true)
      try {
        const res = await axiosPrivate.get(`comment/getcomments`);
        const data = res.data
        if (res.status === 200) {
          setComments(data.comments);
          setLoading(false)
          setTotalPages(Math.ceil(data.comments.length / commentPerPage))
        }
      } catch (error) {
        const errormsg = error.response?.data?.message || "something went wrong "        
        console.log(errormsg);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await axiosPrivate.delete(`comment/deleteComment/${commentIdToDelete}`);
      const data = res.data
      if (res.status === 200) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      const errormsg = error.response?.data?.message || "something went wrong "        
      console.log(errormsg);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0}); 
  };

  const indexOfLastUser = currentPage * commentPerPage;
  const indexOfFirstUser = indexOfLastUser - commentPerPage;
  const currentComments = comments.slice(indexOfFirstUser, indexOfLastUser)

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      { currentUser.isAdmin ? ( loading ? (
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Comment content</Table.HeadCell>
            <Table.HeadCell>Number of likes</Table.HeadCell>
            <Table.HeadCell>PostId</Table.HeadCell>
            <Table.HeadCell>UserId</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          </Table>
          <div className="flex items-center justify-center min-h-[75vh]">
            <p className='text-lg'>Loading...</p>
          </div>
          </>
      ) : (
           currentComments.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>Comment content</Table.HeadCell>
                <Table.HeadCell>Number of likes</Table.HeadCell>
                <Table.HeadCell>PostId</Table.HeadCell>
                <Table.HeadCell>UserId</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {currentComments.map((comment) => (
                <Table.Body className='divide-y' key={comment._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{comment.content}</Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    <Table.Cell>{comment.postId}</Table.Cell>
                    <Table.Cell>{comment.userId}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setCommentIdToDelete(comment._id);
                        }}
                        className='font-medium text-red-500 hover:underline cursor-pointer'
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
            {totalPages > 1 ? (
               <Pagination onPaginationClick={handlePageChange} totalPages={totalPages} currentPage={currentPage}/>
            ): (
            ''
            )}
          </>
        ) : (
          <p>You have no comments yet!</p>
        )
      )
    ): (
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
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-200'>
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteComment}>
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
