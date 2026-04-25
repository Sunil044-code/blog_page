
export const fetchBlogs=async()=>{
    try {
        const res=await fetch('http://localhost:3001/blogs') 
        const result=await res.json()
        return result
        
    } catch (error) {
        console.log('error Fetching the blog',error.message)
    }
}

export const retrieveBlog = async ({ blogSlug}) => {
    try {
        const res = await fetch(`http://localhost:3001/blogs/${blogSlug}`);

        if (!res.ok) {
            const errorMessage = `Failed to fetch blog (${res.status}): ${res.statusText}`;
            throw new Error(errorMessage);
        }

        const result = await res.json();
        return result;

    } catch (error) {
        console.error('Error retrieving the blog:', error.message);
        throw error; 
    }
};

export const loginUser=async(body)=>{
    try {
        const res=await fetch('http://localhost:3001/login' , {
            body: JSON.stringify(body),
             method: "POST",headers: {
                'Content-Type': 'application/json'
            },}) 
        const result=await res.json()
        if(res.ok){
            return result
        }else{
            throw new Error(result.message)
        }
        
    } catch (error) {
        throw new Error(error)
    }
}

// export const LogOut=async()=>{
//     try {
//         const res=await fetch('http://localhost:3001/logout') 
//         const result=await res.json()
//         if(res.ok){
//             return result
//         }else{
//             throw new Error(result.message)
//         }
        
//     } catch (error) {
//         console.log('error Fetching the blog',error.message)
//     }
// }