import React, { useContext } from 'react'
import { Route, Switch, Redirect} from "react-router-dom";
import { AuthContext } from '../context';
import {publicRoutes, privateRoutes} from '../router'
import Loader from './UI/Loader/Loader';


const AppRouter = () => {
 const {isAuth, isLoading} = useContext(AuthContext);
 if (isLoading) {
    return <Loader/>
 }
  return (
    <div> 
        {isAuth 
         ?  <Switch>
         {privateRoutes.map(route => 
               <Route 
                 component = {route.component} path = {route.path} exact = {route.exact} key = {route.path}
              />
               )}  
            <Redirect to ='/posts'/>
         </Switch>
         :  <Switch>
         {publicRoutes.map(route => 
               <Route 
                 component = {route.component} path = {route.path} exact = {route.exact} key = {route.path}
              />
               )}  
            <Redirect to ='/login'/>
         </Switch>}
         
    </div>
  )
}

export default AppRouter