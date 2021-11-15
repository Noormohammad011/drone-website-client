import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { listProductDetails } from '../../actions/productActions'

const EditDrones = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const productDetails = useSelector((state) => state.productDetails)
  const { drone } = productDetails
  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  const [data, setData] = useState({ drone })

  // Update TravelLocation
  const handleTitleChange = (e) => {
    const updatedTitle = e.target.value
    const updatedLocation = {
      name: updatedTitle,
      description: data.description,
      image: data.image,
      price: data.price,
    }
    setData(updatedLocation)
  }

  const handleDescriptionChange = (e) => {
    const updatedDescription = e.target.value
    const updatedLocation = {
      name: data.name,
      description: updatedDescription,
      image: data.image,
      price: data.price,
    }
    setData(updatedLocation)
  }
  const handleImageChange = (e) => {
    const updatedImage = e.target.value
    const updatedLocation = {
      name: data.name,
      description: data.description,
      image: updatedImage,
      price: data.price,
    }
    setData(updatedLocation)
  }
  const handlePriceChange = (e) => {
    const updatedPrice = e.target.value
    const updatedLocation = {
      name: data.name,
      description: data.description,
      image: data.image,
      price: updatedPrice,
    }
    setData(updatedLocation)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const url = `http://localhost:5000/drones/${id}`
    fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thank You for Purchasing',
            showConfirmButton: false,
            timer: 1500,
          })
          setData({})
          e.target.reset()
          history.push('/dashboard')
        }
      })
  }

  return (
    <div className='container my-3'>
      <h2 className='text-uppercase'>Edit Product</h2>
      <div className='row mx-auto'>
        <form className='row g-3' onSubmit={onSubmit}>
          <div className='col-12'>
            <label htmlFor='inputName' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              id='inputName'
              onChange={handleTitleChange}
              value={data?.name || ''}
              placeholder={drone?.name}
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
              onChange={handleImageChange}
              value={data?.image || ''}
              placeholder={drone?.image}
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
              onChange={handleDescriptionChange}
              value={data?.description || ''}
              placeholder={drone?.description}
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
              onChange={handlePriceChange}
              value={data?.price || ''}
              placeholder={drone?.price}
            />
          </div>

          <div className='col-12'>
            <button type='submit' className='btn btn-primary'>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditDrones
