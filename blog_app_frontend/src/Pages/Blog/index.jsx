import { useState,useEffect } from "react"
import { fetchBlogs } from "../../services"
import BlogCard from "../../Components/common/BlogCard"
import BlogSkeleton from "./BlogSkeleton"

export default function Blog(){
    const [blogData,setBlogData]=useState([])
    const [isBlogLoading,setBlogLoading]=useState(true)
       useEffect(()=>{
        (async()=>{
            try {
                
                const res = await fetchBlogs()
                 setBlogData(res)
                 setBlogLoading(false)
                
            }
                
            catch (error) {
                console.log('Error Fetching Data',error)
            }
                
            })()
            
    
       },[])
       
       
        return(
            <div>

                <div className="grid grid-cols-12">{isBlogLoading ?
                    Array.from({ length: 9 })?.map((_, index) => (
                        <BlogSkeleton key={index} />
                    ))
                    : blogData?.message?.map((blog) => <BlogCard
                        key={blog.title}
                        title={blog.title}
                        slug={blog.slug}
                        summary={blog.summary}
                        created_at={blog.created_at}
                        author={blog.author} />)}

                </div>

            </div>
        )
    }