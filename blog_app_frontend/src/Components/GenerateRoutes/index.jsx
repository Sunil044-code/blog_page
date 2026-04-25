import {Route,Routes} from 'react-router'
import ProtectedRoute from './ProtectedRoute'
export default function GenerateRoutes({routes}){
    return(
    <Routes>
       {routes?.map(({name, path,element:Element,authenticated})=>(
        <Route key={name} path={path} element={authenticated?<ProtectedRoute>
          
          <Element/>
          </ProtectedRoute>:<Element/>
        }/>

       ))
       }
        

      </Routes>
    )

}