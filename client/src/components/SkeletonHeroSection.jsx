import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonHeroSection() {
  return (
    <div className="flex gap-7 mb-6 sm:flex-row  flex-col justify-center">
      <div className="lg:w-[65%] md:w-[50%] sm:w-[100%]  xs:w-[100%]">
        <div className="bg-center bg-no-repeat rounded w-full flex items-end h-[280px] md:h-[380px] bg-gray-500 bg-blend-multiply cursor-pointer bg-cover hover:bg-gray-500  transition ease-in-out">
          <div className="pb-4 px-8 w-full">
            <Skeleton height={33} borderRadius={50}  baseColor="#b7b7b7" highlightColor="#d1d1d1"/>
            <div className="flex gap-3 mt-2 w-full">
              <Skeleton height={18} width={60} borderRadius={50}  baseColor="#b7b7b7" highlightColor="#d1d1d1" />
              <Skeleton height={18} width={140} borderRadius={50}  baseColor="#b7b7b7" highlightColor="#d1d1d1" />
            </div>
          </div>
        </div>  
      </div>
      <div className="flex flex-col gap-3 lg:w-[35%] md:w-[50%] sm:w-[100%]">
        <div className="bg-center bg-no-repeat rounded flex items-end h-[280px] md:h-[184px] w-full bg-gray-500 bg-blend-multiply cursor-pointer bg-cover hover:bg-gray-500  transition ease-in-out">
          <div className="pb-4 px-8 w-full">
            <Skeleton height={26}  borderRadius={50} baseColor="#b7b7b7" highlightColor="#d1d1d1" />
            <div className="flex gap-3 mt-2">
              <Skeleton height={18} width={60} borderRadius={50} baseColor="#b7b7b7" highlightColor="#d1d1d1" />
              <Skeleton height={18} width={140} borderRadius={50} baseColor="#b7b7b7" highlightColor="#d1d1d1" />
            </div>
          </div>
        </div>
        <div className="bg-center bg-no-repeat rounded flex items-end h-[280px] md:h-[184px] w-full bg-gray-500 bg-blend-multiply cursor-pointer bg-cover hover:bg-gray-500  transition ease-in-out">
          <div className="pb-4 px-8 w-full">
            <Skeleton height={26} borderRadius={50} baseColor="#b7b7b7" highlightColor="#d1d1d1" />
            <div className="flex gap-3 mt-2">
              <Skeleton height={18} width={60} borderRadius={50} baseColor="#b7b7b7" highlightColor="#d1d1d1" />
              <Skeleton height={18} width={140} borderRadius={50} baseColor="#b7b7b7" highlightColor="#d1d1d1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
