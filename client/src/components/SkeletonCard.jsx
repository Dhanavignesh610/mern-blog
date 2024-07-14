import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonCard() {
  return (
    <div className='w-full dark:border-none h-[346px] overflow-hidden xl:w-[23%] lg:w-[30%] md:w-[47%] sm:w-[30%] transition duration-300 ease-in-out'>
     <Skeleton baseColor="#b7b7b7" highlightColor="#d1d1d1" height={160} className='mb-3'/>
     <div className='flex mt-1 flex-col gap-2'>     
    <div className='mb-1'>
    <Skeleton baseColor="#b7b7b7" highlightColor="#d1d1d1" height={20} />
    <Skeleton baseColor="#b7b7b7" highlightColor="#d1d1d1" height={20} width={140}/>
    </div>
      <div className='leading-4'>
      <Skeleton baseColor="#b7b7b7" highlightColor="#d1d1d1" height={12} />
      <Skeleton baseColor="#b7b7b7" highlightColor="#d1d1d1" height={12} />
      <Skeleton baseColor="#b7b7b7" highlightColor="#d1d1d1" height={12} />
      <Skeleton baseColor="#b7b7b7" highlightColor="#d1d1d1" height={12} />
      </div>
      <Skeleton baseColor="#b7b7b7" highlightColor="#d1d1d1" width={80} />
    </div>
    </div>
  );
}
