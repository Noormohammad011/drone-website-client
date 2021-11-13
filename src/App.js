import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import Products from './pages/Products'
import DashBoard from './pages/DashBoard'

const App = () => {

  return (
    <Router>
      <AuthProvider>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/home' component={Home} exact />
            <Route path='/products' component={Products} exact />
            <Route path='/dashboard' component={DashBoard} exact />

            {/* <Route path='/addTouristPlace' component={AddTouristPlace} exact />
            <Route
              path='/getAllTouristPlace'
              component={GetAllTouristPlace}
              exact
            />
            <Route path='/myOrder' component={MyOrder} exact />
            <Route path='/allOrder' component={ManageAllOrders} exact />
            <Route path='/faq' component={Faq} exact />
            <Route path='/about' component={AboutUs} exact />
            <Route path='/gallery' component={Gallery} exact />
            <Route
              path='/getAllTouristPlace/:id/edit'
              component={EditTouristPlace}
              exact
            />
            <PrivateRoute exact path='/getAllTouristPlace/:id'>
              <BookNow></BookNow>
            </PrivateRoute>
            <PrivateRoute exact path='/contactUs'>
              <ContactUsPage></ContactUsPage>
            </PrivateRoute>

            <Route path='/login' component={Login} exact />
            <Route path='/signup' component={SignUp} exact />
            <Route path='*' component={NotFoundPage} exact /> */}
          </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
