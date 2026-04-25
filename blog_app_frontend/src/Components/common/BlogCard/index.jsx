import { useNavigate } from "react-router"

export default function BlogCard({slug,title,summary,author,created_at}){
    const navigate=useNavigate()
    return(
        <div onClick={()=>{
            navigate(`/blog_details/${slug}`)
        }} className="col-span-12 md:col-span-4 lg:col-span-3 shadow p-4 border-gray-400 rounded-2xl hover:bg-gray-50 cursor-pointer">
            <div>
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-700">{summary}</p>


            </div>
            <div>
            <p className="text-sm text-gray-800">Created at:
                <u>
                {created_at}
                </u>
            </p>
            <p className="text-sm text-gray-800 hover:underline">
                    {author}
                    
            </p>


            </div>
            


        </div>
    )
}