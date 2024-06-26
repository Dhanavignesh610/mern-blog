import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import cimage from '../assets/scrn.png'
import HeroSection from './heroSection';

export default function Home() {
  const [posts, setPosts] = useState([]); 
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      console.log(data);
      setPosts(data.posts);
      filterPostsByCategory(data.posts)
    };
    fetchPosts();
  }, []);

  const filterPostsByCategory = (posts) => {
    const categories = {
      ai: [],
      blockchain: [],
      bigdata: [],
      security:[],
      clouds: [],
      webapps: [],
      iot: [],
      trends: [],
    }; 
    console.log(posts);
    posts.forEach(post => {
      if (categories.hasOwnProperty(post.category)) {
        console.log(post);
        categories[post.category].push(post);
      }
    });
    setFilteredPosts(categories);
  };
  const renderCategoryPosts = (category) => {
    return (     
      <div className='flex mt-2 flex-col gap-5'>
        <div className='flex item-center justify-between text-base border-b-2 border-gray-950'>
          <span className='bg-gray-950  px-3 py-1 text-white orbitron tracking-wider' style={{fontSize:"13px"}}>{category}</span>
          <Link to={`/category/${category}`} className='text-right pt-1 font-semibold orbitron tracking-wide' style={{fontSize:"13px"}}>View All</Link>
        </div> 
        <div className='flex mt-2 flex-wrap gap-7'>
          {filteredPosts[category].slice(0, 8).map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>  
      // ))
    );
  };
 
  return (
    <div  style={{ minHeight: `calc(100vh - 100px)` }}> 
      <div className='xl:max-w-6xl lg:max-w-4xl md:max-w-[90%] p-5 sm:pt-8 mx-auto  flex flex-col gap-6'>
      {posts && posts.length > 0 && (
      <div className='mb-2'>          
      <h2 className='text-3xl font-bold mb-5 mt-8 text-black dark:text-white lg:text-3xl orbitron'>Latest News</h2>
       <HeroSection posts={posts}/>
      </div>

      )}
         {Object.keys(filteredPosts).map(category => (
        <div key={category}> 
          {filteredPosts[category].length > 0 && renderCategoryPosts(category)}
        </div>
      ))}
      </div>
    </div> 
  );
}
