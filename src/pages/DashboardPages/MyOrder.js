import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import Swal from 'sweetalert2'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import axios from 'axios'

const MyOrder = () => {
  const { user } = useAuth()
  const [data, setData] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await axios.get(
          `https://damp-savannah-22237.herokuapp.com/myOrder/${user?.email}`
        )

        setData(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [user?.email])

  const deleteHandler = (id) => {
    const url = `https://damp-savannah-22237.herokuapp.com/myOrder/${id}`
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
    <div className='container'>
      <h1 className='text-center text-uppercase mb-3'>Get MyOrder</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>
          {<div>Something went wrong ...</div>}
        </Message>
      ) : (
        <table className='table table-dark table-hover'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Email</th>
              <th scope='col'>Product Name</th>
              <th scope='col'>Product Price</th>
              <th scope='col'>Order Statuse</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((x) => (
              <tr key={x._id}>
                <td>{x._id}</td>
                <td>{x.email}</td>
                <td>{x.email}</td>
                <td>{x.price}</td>
                <td>
                  {x.pending ? (
                    <h4 className='text-white'>Pending</h4>
                  ) : (
                    <h4 className='text-white'>Order Placed</h4>
                  )}
                </td>
                <td>
                  <button
                    type='button'
                    className='btn btn-outline-danger btn-sm'
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

export default MyOrder
