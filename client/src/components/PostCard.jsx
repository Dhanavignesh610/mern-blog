import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    
    <div className='w-full dark:border-none h-[330px] overflow-hidden xl:w-[23%] lg:w-[30%] md:w-[47%] sm:w-[30%] transition duration-300 ease-in-out'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-[160px] hover:opacity-80 w-full rounded object-cover  transition-all duration-300 z-20'
        />
    
      <div className='flex mt-4 flex-col gap-2'>
      <div>
        <p className='text-lg hover:underline text-black dark:text-white font-semibold line-clamp-2'>{post.title}</p>
     </div>
        <div className='text-sm text-gray-800 dark:text-gray-300 line-clamp-4 fs-6'  dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
         <span className='uppercase mt-1 text-black dark:text-white font-semibold' style={{fontSize:"12px"}}>{post.author}</span>
      </div>
      </Link>
 
    </div>
  );
}
