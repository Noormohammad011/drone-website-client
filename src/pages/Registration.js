import React, { useState } from 'react'
import Header from '../components/Header'
import { NavLink, useHistory } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Swal from 'sweetalert2'


const Registration = () => {
 const [loginData, setLoginData] = useState({})
 const history = useHistory()
 const { registerUser, isLoading, authError } = useAuth()

 const handleOnBlur = (e) => {
   const field = e.target.name
   const value = e.target.value
   const newLoginData = { ...loginData }
   newLoginData[field] = value
   setLoginData(newLoginData)
 }
 const handleLoginSubmit = (e) => {
   if (loginData.password !== loginData.password2) {
     Swal.fire({
       title: 'Your password did not match',
       showClass: {
         popup: 'animate__animated animate__fadeInDown',
       },
       hideClass: {
         popup: 'animate__animated animate__fadeOutUp',
       },
     })
     return
   }
   registerUser(loginData.email, loginData.password, loginData.name, history)
   e.preventDefault()
 }
  return (
    <>
      <Header />
      <div className='container'>
        <div className='row text-center my-5'>
          <h1 className='text-uppercase'>Registration</h1>
        </div>

        {isLoading && <Loader />}
        {authError && <Message variant='danger'>{authError} </Message>}
        <div className='d-flex justify-content-center align-items-center'>
          <form class='row g-3' onSubmit={handleLoginSubmit}>
            <div class='col-12'>
              <label htmlFor='inputEmail4' class='form-label'>
                Name
              </label>
              <input
                type='text'
                class='form-control'
                id='inputEmail4'
                name='name'
                onBlur={handleOnBlur}
              />
            </div>
            <div class='col-12'>
              <label htmlFor='inputEmail4' class='form-label'>
                Email
              </label>
              <input
                type='email'
                class='form-control'
                id='inputEmail4'
                name='email'
                onBlur={handleOnBlur}
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
                onBlur={handleOnBlur}
              />
            </div>
            <div class='col-12'>
              <label htmlFor='inputPassword4' class='form-label'>
                Re-Type Password
              </label>
              <input
                type='password'
                class='form-control'
                id='inputPassword4'
                name='password2'
                onBlur={handleOnBlur}
              />
            </div>

            <div class='col-12'>
              <button type='submit' class='btn btn-primary'>
                Sign Up
              </button>
            </div>
            <div className='py-3'>
              <div className='col-12'>
                Already Registered? <NavLink to='/login'>Please Login</NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Registration


