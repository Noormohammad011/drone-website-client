import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'

const Review = () => {
  const { user } = useAuth()
const { register, handleSubmit, reset } = useForm()
  const onSubmit = async (data) => {
    await axios
      .post(`http://localhost:5000/reviews`, {
        email: user?.email,
        userName: user?.displayName,
        rating: data.rating,
        comment: data.comment,
        date: new Date().toLocaleDateString(),
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thank You for your Valuable Review',
            showConfirmButton: false,
            timer: 1500,
          })
          reset()
        }
      })
  }
  return (
    <div className='container mx-auto my-5'>
      <h1 className='text-center text-uppercase'>Review</h1>

      <div className='row my-2'>
        <form className='row g-3' onSubmit={handleSubmit(onSubmit)}>
          <div className='col-12'>
            <label htmlFor='inputRating' className='form-label'>
              Rating
            </label>
            <input
              className='form-control'
              id='inputRating'
              type='number'
              min='1'
              max='5'
              name='rating'
              {...register('rating')}
            />
          </div>

          <div className='col-12'>
            <label htmlFor='inputComment' class='form-label'>
              Put your review here
            </label>
            <textarea
              class='form-control'
              id='inputComment'
              rows='3'
              name='comment'
              {...register('comment')}
            ></textarea>
          </div>

          <div className='col-12'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Review
