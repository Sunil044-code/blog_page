import { lazy } from 'react'


const BlogDetails=lazy(()=>import('../Pages/Blog/BlogDetails'))
const Home =lazy(()=>import('../Pages/Home'))
const BlogPage=lazy(()=> import('../Pages/Blog'))
const UserBlog=lazy(()=>import('../Pages/UserBlog'))
const Login=lazy(()=>import('../Pages/Login'))
const Signup=lazy(()=>import('../Pages/Signup'))
const CreateBlog=lazy(()=>import('../Pages/CreateBlog'))


export const appRoutes=[
    {name:'home', path:'/',element: Home, },
    {name:'blog', path:'/blog',element:BlogPage, },
    {name:'blog_details', path:'/blog_details/:blogSlug',element:BlogDetails, },
    {name:'user_blog', path:'/userBlog',element: UserBlog, },
    {name:'login', path:'/login',element:Login, },
    {name:'signup', path:'/signup', element:Signup},
     {name:'create_blog', path:'/create_blog',element:CreateBlog,authenticated:true }
]