




import React from "react";
import CheckAuth from "./CheckAuthentication";
import { Route, Redirect } from 'react-router-dom';



const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route {...rest} render={(props) => (
    CheckAuth()
      ? 
      (<Component {...props} />)
      :
      // (window.location.href = '/login')
      (
        <Redirect to={{pathname: '/login', state: {from: props.location}}}/>,
        window.history.pushState(null, null, "/login")
      )
  )} />
)

export default PrivateRoute