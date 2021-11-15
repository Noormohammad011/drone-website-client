import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const AllOrders = () => {
  const [data, setData] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await axios.get(
          `https://damp-savannah-22237.herokuapp.com/allOrders`
        )

        setData(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const deleteHandler = (id) => {
    const url = `https://damp-savannah-22237.herokuapp.com/allOrders/${id}`
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
  const updateHandler = async (id) => {
    await axios.put(
      `https://damp-savannah-22237.herokuapp.com/allOrders/${id}`,
      {
        pending: false,
      }
    )
  }
  return (
    <div className='container'>
      <h1 className='text-center text-uppercase mb-3'>Get All Orders</h1>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>
          {<div>Something went wrong ...</div>}
        </Message>
      ) : (
        <table striped bordered responsive className='table-sm table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>EMAIL</th>
              <th>ORDER STATUS</th>
              <th>ORDER STATUS CHANGED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((x) => (
              <tr key={x._id}>
                <td>{x._id}</td>
                <td>{x.email}</td>
                <td>{x.pending ? <h4>Pending</h4> : <h4>Order Placed</h4>}</td>
                <td>
                  {' '}
                  <button
                    type='button'
                    class='btn btn-danger btn-sm'
                    onClick={() => updateHandler(x._id)}
                  >
                    <i className='far fa-edit'>Status</i>
                  </button>
                </td>
                <td>
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

export default AllOrders
