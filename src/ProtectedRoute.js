// ProtectedRoute.js
import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest}) => {

// KOLLA PÅ BÄTTRE LÖSNING
function logedInUser() {
    const localStorage = window.localStorage.getItem('userTokens')
    if(!localStorage) {
      return null
    }
    else {
      return true
    } 
}

  return (
    <Route
      {...rest}
      render={props => ( logedInUser() 
      ? (
        <Component {...props} />
        ) : (
          <Redirect
          to={{
            pathname: "/unauthorized",
            state: { from: props.location }
          }}
          />
          ))
      }
    />
  );
}
export default ProtectedRoute;
