import { useContext } from "react";
import { Navigate } from "react-router";
import {AuthContext} from '../../Context/AuthContext'
export default function ProtectedRoute({children}){
    const {isLogged}=useContext(AuthContext)

    if(!isLogged) return<Navigate to='/login' replace/>

    return children;
}