import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Loader from '../components/Loader'
import useAuth from '../hooks/useAuth'

const AdminRoute = ({ children, ...rest }) => {
  const { user, admin, isLoading } = useAuth()

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <Route
        {...rest}
        render={({ location }) =>
          user.email && admin ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            ></Redirect>
          )
        }
      ></Route>
    </div>
  )
}

export default AdminRoute
