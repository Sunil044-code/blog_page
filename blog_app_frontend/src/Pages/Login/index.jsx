import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../../services";
import {AuthContext} from "../../Context/AuthContext";
export default function Login() {

    const {login}= useContext(AuthContext)
    const navigate=useNavigate()
    const[loginData,setLoginData]=useState({
        email:null,
        password:null
    })
    const[loginError,setLoginError]=useState(null)
// console.log(loginData)


    const LoginHandler=async(e)=>{
        e.preventDefault()
        try {
            const res=await loginUser({username:loginData.email,password:loginData.password})
            localStorage.setItem("TOKEN",res.token)
            navigate('/create_blog')
            login()
            
        } catch (error) {
            setLoginError("Email or Password is invalid!!")
        }

    }
    return (
        <div>



         <button className="flex items-center gap-1.5 hover:bg-gray-100 w-fit cursor-pointer px-2 py-1 rounded-lg"
    onClick={()=>{
      navigate('/')

    }}>{''}
      <i className="material-symbols-outlined size-5 text-sm ">west</i>
         <p className="text-xs italic"> Back</p>
    </button>
        <div className="flex justify-center items-center min-h-screen">
            <div className="md:w-1/2 w-full mx-4 border-2 rounded-3xl p-6">
                <h2 className="text-xl font-bold font-serif text-center mb-4">SIGN IN</h2>
                <p className="text-sm font-light"> Sign in to create your blogs</p>
                {loginError ? (
  <p className="text-red-500 bg-red-100 border border-red-400 rounded px-4 py-2">
    {loginError}
  </p>
) : null}

                <form onSubmit={LoginHandler}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-medium">Email</label>
                        <input
                            type="text" 
                            name='mail' 
                            id='mail'
                            placeholder="Enter your email"
                            value={loginData.email}
                            onChange={(e)=>setLoginData((prev)=>({
                                ...prev,email:e.target.value

                            }))

                            }
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-medium">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e)=>setLoginData((prev)=>({...prev,password:e.target.value}))}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    <button type="submit" className="w-fit px-2 py-1 rounded-lg bg-blue-500 text-white cursor-pointer">Submit</button>
                    </div>
                </form>
                <p className="mt-3 text-sm text-slate-600">
                  Don't have an account? <button onClick={()=>navigate('/signup')} className="text-blue-600 underline">Sign up</button>
                </p>
            </div>
        </div>
        </div>
    );
}
