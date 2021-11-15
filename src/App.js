import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import Products from './pages/Products'
import DashBoard from './pages/DashBoard'
import Login from './pages/Login'
import Registration from './pages/Registration'
import NotFoundPage from './pages/NotFoundPage'

import Parchaces from './pages/Parchaces'
import PrivateRoute from './PrivateRoute/PrivateRoute'

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/home' component={Home} />
          <Route path='/products' component={Products} />
          <Route path='/dashboard'>
            <DashBoard></DashBoard>
          </Route>
          <PrivateRoute path='/booking/:id'>
            <Parchaces></Parchaces>
          </PrivateRoute>

          <Route path='/login' component={Login} />
          <Route path='/register' component={Registration} />

          <Route path='*' component={NotFoundPage} exact />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
