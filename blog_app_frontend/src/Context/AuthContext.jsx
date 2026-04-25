import { createContext, useEffect, useState } from "react";


export const AuthContext=createContext()


export default function AuthContextProvider({children}){

    const[isLogged,setIsLogged]=useState(()=>
        localStorage.getItem('isLogged')==='true'?true:false
    );
    const login=()=>{
        setIsLogged(true)
       
    }
    const logOut=()=>{
        setIsLogged(false)
       
    }
    //Persit the login State
   
    useEffect(()=>{
        localStorage.setItem('isLogged',String(isLogged ))
    },[isLogged])


    return <div>
        <AuthContext.Provider value={{isLogged,login,logOut}} >{children}</AuthContext.Provider>
    </div>

}