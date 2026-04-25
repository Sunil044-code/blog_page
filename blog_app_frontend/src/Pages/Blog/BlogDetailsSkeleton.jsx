import Skeleton from "../../Skeleton";

export default function BlogDetailsSkeleton(){
    return(
     <div className="flex items-center flex-col gap-2 w-1/2 ">
              <Skeleton className="h-10 w-full"/>
               <Skeleton className="h-8  w-full"/>
               
                <Skeleton className="h-4 mt-6  w-full"/>
                 <Skeleton className="h-4   w-full"/>
                  <Skeleton className="h-4   w-full"/>
                   <Skeleton className="h-4   w-full"/>
                    <Skeleton className="h-4  w-full "/>
                   <Skeleton className="h-4  w-full "/>
                   <Skeleton className="h-10 w-full "/>

        </div>

    )
    
}