import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Swal from 'sweetalert2'

const ManageProducts = () => {
  const productList = useSelector((state) => state.productList)
  const { loading, error, drones } = productList
  const [data, setData] = useState(drones)
  const deleteHandler = (id) => {
    const url = `https://damp-savannah-22237.herokuapp.com/drones/${id}`
    fetch(url, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.deletedCount) {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            }
          })
          const remaining = data.filter((s) => s._id !== id)
          setData(remaining)
        }
      })
  }

  return (
    <div className='container my-2'>
      <h3 className='text-center text-uppercase'>Manage Products</h3>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {<div>Something went wrong ...</div>}
        </Message>
      ) : (
        <table striped bordered responsive className='table-sm table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>IMAGE</th>
              <th>DESCRIPTION</th>
              <th>PRICE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((x) => (
              <tr key={x._id}>
                <td>{x._id}</td>
                <td>{x.name}</td>
                <td>
                  <img
                    src={x.image}
                    alt={x.image}
                    style={{ width: '3rem', height: '3rem' }}
                  />
                </td>
                <td>{x.description}</td>
                <td>{x.price}</td>
                <td>
                  <NavLink to={`/dashboard/drones/${x._id}/edit`}>
                    <button type='button' className='btn-sm btn btn-light'>
                      <i className='fas fa-edit'></i>
                    </button>
                  </NavLink>
                  <button
                    type='button'
                    class='btn btn-danger btn-sm'
                    onClick={() => deleteHandler(x._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ManageProducts
