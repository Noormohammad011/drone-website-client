import React, { useState } from 'react'
import Header from '../components/Header'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loader from '../components/Loader'
import Message from '../components/Message'


const Login = () => {
   const [loginData, setLoginData] = useState({})
   const {loginUser, isLoading, authError } = useAuth()

   const location = useLocation()
   const history = useHistory()

   const handleOnChange = (e) => {
     const field = e.target.name
     const value = e.target.value
     const newLoginData = { ...loginData }
     newLoginData[field] = value
     setLoginData(newLoginData)
   }
   const handleLoginSubmit = (e) => {
     loginUser(loginData.email, loginData.password, location, history)
     e.preventDefault()
   }

  return (
    <>
      <Header />
      <div className='container'>
        <div className='row text-center my-5'>
          <h1 className='text-uppercase'>Login</h1>
        </div>
        {isLoading && <Loader />}
        {authError && <Message variant='danger'>{authError} </Message>}
        <div className='d-flex justify-content-center align-items-center'>
          <form class='row g-3' onSubmit={handleLoginSubmit}>
            <div class='col-12'>
              <label htmlFor='inputEmail4' class='form-label'>
                Email
              </label>
              <input
                type='email'
                class='form-control'
                id='inputEmail4'
                name='email'
                onChange={handleOnChange}
              />
            </div>
            <div class='col-12'>
              <label htmlFor='inputPassword4' class='form-label'>
                Password
              </label>
              <input
                type='password'
                class='form-control'
                id='inputPassword4'
                name='password'
                onChange={handleOnChange}
              />
            </div>

            <div class='col-12'>
              <button type='submit' class='btn btn-primary'>
                Sign in
              </button>
            </div>
            <div className='py-3'>
              <div className='col-12'>
                Have an Account? <NavLink to='/register'>Sign Up</NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
