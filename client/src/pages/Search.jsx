import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import useAxiosprivate from '../hooks/useAxiosprivate';

export default function Search() {
  const axiosPrivate = useAxiosprivate()
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'all',
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm') || '';
    const sortFromUrl = urlParams.get('sort') || 'desc';
    const categoryFromUrl = urlParams.get('category') || 'all';
    setSidebarData({
      ...sidebarData,
      searchTerm: searchTermFromUrl,
      sort: sortFromUrl,
      category: categoryFromUrl,
    });

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
     try {
      const res = await axiosPrivate.get(`post/getposts?${searchQuery}`);
      if (res.status === 200) {
        const data = res.data
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }else{
        setLoading(false);
        return;
      }
     } catch (error) {
      const errormsg = error.response.data.message || 'Something went wrong'
      console.log(errormsg );      
     }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
   try {
    const res = await axiosPrivate.get(`post/getposts?${searchQuery}`);
    if (res.status === 200) {
      const data = res.data
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }else{
      return;
    }
   } catch (error) {
    const errormsg = error.response.data.message || 'Something went wrong'
    console.log(errormsg);        
   }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-5 border-b md:border-r md:min-h-screen border-gray-200'>
        <form className='flex flex-col gap-7 pt-4' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
            >
            <option value='all'>Select category</option>
            <option value='ai'>AI</option>
            <option value='blockchain'>Blockchain</option>
            <option value='security'>Security</option>
            <option value='clouds'>Clouds</option>
            <option value='webapps'>Webapps</option>
            <option value='iot'>IOT</option>
            <option value='trends'>Trends</option>
            </Select>
          </div>
          <Button type='submit'  gradientDuoTone='purpleToPink'>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-200 p-3 mt-5 '>
          Posts results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4 mb-8'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
