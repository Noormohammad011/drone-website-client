import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'
const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = async (data) => {
    await axios.post(`http://localhost:5000/drones`, data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Adding Product Successfully',
          showConfirmButton: false,
          timer: 1500,
        })
        reset()
      }
    })
  }
  return (
    <div className='container my-3'>
      <h2 className='text-uppercase'>Add Product</h2>
      <div className='row mx-auto'>
        <form className='row g-3' onSubmit={handleSubmit(onSubmit)}>
          <div className='col-12'>
            <label htmlFor='inputName' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              id='inputName'
              name='name'
              {...register('name')}
            />
          </div>

          <div className='col-md-12'>
            <label htmlFor='inputImage' className='form-label'>
              Image
            </label>
            <input
              type='text'
              className='form-control'
              id='inputImage'
              name='image'
              {...register('image')}
            />
          </div>
          <div className='col-md-12'>
            <label htmlFor='inputDescription' className='form-label'>
              Description
            </label>
            <input
              type='text'
              className='form-control'
              id='inputDescription'
              name='description'
              {...register('description')}
            />
          </div>
          <div className='col-md-12'>
            <label htmlFor='inputPrice' className='form-label'>
              Price
            </label>
            <input
              type='text'
              className='form-control'
              id='iinputPrice'
              name='phone'
              {...register('price')}
            />
          </div>


          <div className='col-12'>
            <button type='submit' className='btn btn-primary'>
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
