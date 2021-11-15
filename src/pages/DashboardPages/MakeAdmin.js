import React, { useState } from 'react'
import Message from '../../components/Message'

const MakeAdmin = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  // const { token } = useAuth()

  const handleOnBlur = (e) => {
    setEmail(e.target.value)
  }
  const handleAdminSubmit = (e) => {
    const user = { email }
    fetch('https://damp-savannah-22237.herokuapp.com/users/admin', {
      method: 'PUT',
      headers: {
        //   authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          console.log(data)
          setSuccess(true)
        }
      })

    e.preventDefault()
  }
  return (
    <div className='container my-5'>
      <h1 className='text-center text-uppercase my-2'>Make Admin</h1>
      <form onSubmit={handleAdminSubmit}>
        <div className='col-md-12'>
          <label htmlFor='inputEmail4' className='form-label my-2'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='inputEmail4'
            name='email'
            onBlur={handleOnBlur}
          />
        </div>
        <button type='submit' className='btn btn-primary my-2'>
          Make Admin
        </button>
      </form>
      {success && (
        <Message variant='success'>
          {<div>Admin Created Successfully</div>}
        </Message>
      )}
    </div>
  )
}

export default MakeAdmin
