import Skeleton  from "../../Skeleton";

export default function BlogSkeleton(){
    return(
        <div className="col-span-12 md:col-span-4 flex flex-col gap-2 lg:col-span-3 shadow p-4 border-gray-400 rounded-2xl">
           
            <Skeleton className={'w-[15 rem] h-10'}/>
            <Skeleton className={'w-[15 rem] h-2 '}/>
            <Skeleton className={'w-[15 rem] h-2 '}/>
            <Skeleton className={'w-[10 rem] h-3'}/>
        </div>
    )
}