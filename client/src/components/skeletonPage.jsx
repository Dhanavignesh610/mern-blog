import Skeleton from 'react-loading-skeleton';

export default function skeletonPage() {
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
    <h1 className="text-2xl mt-10 px-3 pb-2 orbitron text-black dark:text-white uppercase text-center font-serif max-w-2xl mx-auto lg:text-3xl">
    </h1>
    <Skeleton baseColor="#b7b7b7" highlightColor="#d1d1d1" className='mt-10 p-3 max-h-[600px] w-full object-cover' />
    <div className="flex justify-between p-3 border-b border-slate-400 mx-auto w-full max-w-2xl text-xs">
    </div>
  
    <div className="flex flex-col justify-center items-center mb-5">
      <h1 className="text-xl mt-5">Recent articles</h1>
      <div className="flex flex-wrap gap-5 mt-5 justify-center">
      </div>
    </div>
  </main>
  )
}

