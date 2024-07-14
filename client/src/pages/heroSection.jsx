import { Link } from "react-router-dom";

export default function heroSection({ posts }) {
    return (
        <div className='flex gap-7 mb-6 sm:flex-row  flex-col justify-center'>
            {posts.slice(0, 1).map((post) => (
                <Link className="lg:w-[65%] md:w-[50%] sm:w-[100%]  xs:w-[100%]" to={`/post/${post.slug}`} key={post._id}>
                    <div className="bg-center bg-no-repeat rounded flex items-end h-[240px] md:h-[380px] bg-gray-800 bg-blend-multiply cursor-pointer bg-cover hover:bg-gray-500  transition ease-in-out" key={`${post._id}`} style={{ backgroundImage: `url(${post.image})` }}>
                        <div className="pb-4 md:px-3 lg:px-8 px-3">
                            <h5 className="text-2xl font-semibold pb-2 leading-none text-white md:text-2xl lg:text-4xl">{post.title}</h5>
                            <div className="flex gap-3">
                                <span className='uppercase text-pink-500 font-semibold' style={{ fontSize: "14px" }}>{post.category} </span>
                                <span className='uppercase text-white font-semibold' style={{ fontSize: "14px" }}> {post.author}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))
            }
            <div className='flex flex-col gap-3 lg:w-[35%] md:w-[50%] sm:w-[100%]'>
                {posts.slice(1, 3).map((post) => (
                    <Link to={`/post/${post.slug}`} key={post._id}>
                        <div className="bg-center bg-no-repeat rounded flex items-end h-[240px] md:h-[184px] w-full bg-gray-800 bg-blend-multiply cursor-pointer bg-cover hover:bg-gray-500  transition ease-in-out" key={`${post._id}`} style={{ backgroundImage: `url(${post.image})` }}>
                            <div className="pb-4 md:px-3 lg:px-8 px-4">
                                <h5 className="text-2xl font-semibold line-clamp-2 pb-1 leading-none text-white md:text-2xl lg:text-xl">{post.title}</h5>
                                <div className="flex gap-3">
                                    <span className='uppercase text-pink-500 font-semibold' style={{ fontSize: "12px" }}>{post.category}</span>
                                    <span className='uppercase text-white font-semibold' style={{ fontSize: "12px" }}>{post.author}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}