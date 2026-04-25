import { useNavigate, useParams } from "react-router"
import { retrieveBlog } from "../../services"
import { useState,useEffect } from "react"
import BlogDetailsSkeleton from "./BlogDetailsSkeleton"
import { VscEye } from "react-icons/vsc";
export default function BlogDetails(){
    const {blogSlug}=useParams()

    const navigate=useNavigate()
    
    const [blog,setblog]=useState([])

    const[blogError,setBlogError]=useState(false)

        const [isBlogLoading,setBlogLoading]=useState(true)

           useEffect(()=>{
            (async()=>{
                try {
                    
                    const res = await retrieveBlog({blogSlug})
                     setblog(res)
                     setBlogLoading(false)
                    //  console.log(res)
                    
                }
                    
                catch (error) {
                    console.log('Error Fetching Data',error)
                    setBlogError(true)
                    setBlogLoading(false)
                }
                    
                })();
                
        
           },[]);
           
           
return (
  <div className="flex lg:w-1/2 p-4 w-full mx-auto h-full flex-col gap-2">
    <button className="flex items-center gap-1.5 hover:bg-gray-100 w-fit cursor-pointer px-2 py-1 rounded-lg"
    onClick={()=>{
      navigate('/blog')

    }}>{''}
      <i className="material-symbols-outlined size-5 text-sm ">west</i>
         <p className="text-xs italic"> Back to blogs</p>
    </button>
    {blogError?'Error Fetching BLog':
    isBlogLoading ?(
      <BlogDetailsSkeleton/>):(
        <>
 <div className="flex items-start gap-2">
   <h4 className="text-4xl font-serif">{blog?.result.title}</h4>
  {blog?.result?.featured && (
    <span className="material-symbols-outlined text-yellow-500 size-6 mt-1">
      star_shine
    </span>
  )}
</div>

<div className="flex gap-3">
<p className="text-sm">{blog?.result.author}</p>
<p className="text-sm">{blog?.result.created_at}</p>

</div>
<div className="flex gap-2">
<VscEye className="w-6 h-6"/>
<p>
  {blog?.result?.read_count}
</p>

</div>

<div className="flex gap-2.5">
  {blog?.result?.tags?.map((tag)=>(
    <p key={tag} className="px-3 py-2 rounded-2xl border-gray-500  text-sm bg-gray-300">{tag}</p>
  ))}
</div>

<p className="italic">"{blog?.result.summary}"</p>
<p className="font-serif mt-4"dangerouslySetInnerHTML={{__html:blog?.result?.body}}></p>
        
 </>



)}


    
    
  </div>
)
}
