import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'
const Parchaces = () => {

   const { register, handleSubmit, reset } = useForm()
  const { user } = useAuth()
  const { id } = useParams()

  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, drone } = productDetails
  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  
  const onSubmit = async (data) => {
  
    await axios
      .post(`http://localhost:5000/orders`, {
        email: user?.email,
        address: data.address,
        city: data.city,
        country: data.country,
        phone: data.phone,
        zip: data.zip,
        droneId: drone._id,
        userId: user._id,
        price: drone.price,
        name: drone.name,
        date: new Date().toLocaleDateString(),
        pending: true,
      })
      .then((res) => {
        if (res.data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thank You for Purchasing',
          showConfirmButton: false,
          timer: 1500,
        })
          reset()
        }
      })
  }

  return (
    <>
      <Header />
      <div className='container my-2'>
        <Link to='/' className='btn btn-light my-3'>
          Go Back
        </Link>
        <>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <div className='row'>
              <div className='col-12 col-md-6'>
                <img src={drone.image} alt='drone' className='img-fluid' />
              </div>
              <div className='col-12 col-md-6'>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item h1'>Name: {drone.name}</li>
                  <li className='list-group-item h4'>
                    Description: {drone.description}
                  </li>
                  <li className='list-group-item h4'>Price: {drone.price}</li>
                </ul>
              </div>
            </div>
          )}
          <div className='row my-5'>
            <h1 className='text-center text-uppercase my-2'>
              Purchase Information
            </h1>

            <form className='row g-3' onSubmit={handleSubmit(onSubmit)}>
              <div className='col-md-12'>
                <label htmlFor='inputEmail4' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='inputEmail4'
                  name='email'
                  {...register('email')}
                  placeholder={user.email}
                  disabled
                />
              </div>

              <div className='col-12'>
                <label htmlFor='inputAddress' className='form-label'>
                  Address
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='inputAddress'
                  placeholder='1234 Main St'
                  name='address'
                  {...register('address')}
                />
              </div>

              <div className='col-md-12'>
                <label htmlFor='inputCity' className='form-label'>
                  City
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='inputCity'
                  name='city'
                  {...register('city')}
                />
              </div>
              <div className='col-md-12'>
                <label htmlFor='inputCountry' className='form-label'>
                  Country
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='nputCountry'
                  name='country'
                  {...register('country')}
                />
              </div>
              <div className='col-md-12'>
                <label htmlFor='inputPhone' className='form-label'>
                  Phone
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='inputPhone'
                  name='phone'
                  {...register('phone')}
                />
              </div>

              <div className='col-md-12'>
                <label htmlFor='inputZip' className='form-label'>
                  Zip
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='inputZip'
                  name='zip'
                  {...register('zip')}
                />
              </div>

              <div className='col-12'>
                <button type='submit' className='btn btn-primary'>
                  Purchase Now
                </button>
              </div>
            </form>
          </div>
        </>
      </div>
    </>
  )
}

export default Parchaces
