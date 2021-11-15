import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Header from '../components/Header'
import Rating from '../components/Rating'

import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Footer from '../components/Footer'

import axios from 'axios'
const Home = ({ history }) => {
  const [data, setData] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await axios.get(
          `https://damp-savannah-22237.herokuapp.com/reviews`
        )

        setData(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])
  const { Meta } = Card

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, drones } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <Header />
      {/* banner section start */}
      <div className='container' id='banner'>
        <div className='d-flex justify-content-center align-items-end h-100 d-inline-block'>
          <button
            type='button'
            className='btn btn-outline-info my-3'
            onClick={() => history.push('/products')}
          >
            Explore More
          </button>
        </div>
      </div>
      {/* banner section end */}
      {/* products section start */}
      <div className='container'>
        <div className='row my-5'>
          <h1 className='text-center text-uppercase'>Products</h1>
        </div>
        <div className='row row-cols-1 row-cols-sm-1 row-cols-md-3'>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            drones
              .map((drone) => (
                <div className='col' key={drone._id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        style={{ height: '300px' }}
                        alt='example'
                        src={drone.image}
                        className='img-fluid'
                      />
                    }
                    className='my-2 mx-2'
                  >
                    <Meta
                      title={drone.name}
                      description={drone.description}
                      className='my-2'
                    />
                    <p>Price: {drone.price}$</p>
                    <Link
                      to={`/booking/${drone._id}`}
                      type='button'
                      className='btn btn-outline-dark d-grid'
                    >
                      Buy Now
                    </Link>
                  </Card>
                </div>
              ))
              .slice(0, 6)
          )}
        </div>
      </div>
      {/* products section end */}
      {/* about section start */}
      <div className='container'>
        <div className='row my-5'>
          <h1 className='text-center text-uppercase'>About Us</h1>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <div className='d-flex flex-column justify-content-center align-items-start'>
              <div className='p-2'>
                We’ve got you covered From drone fleet management to complete
                site documentation and analysis, we have your back every step of
                the way.
              </div>
              <div className='p-2'>
                Save time and money Harness the power of visual data to cut
                unnecessary scheduling hours and shave money off the budget.
              </div>
              <div className='p-2'>
                Gain the competitive edge Our advanced technology equips you
                with a powerful digital reconstruction, simplifying your
                workflow and streamlining your processes.
              </div>
              <div className='p-2'>
                Capitalize on best-in-class customer service Our team of experts
                is there to answer your toughest questions via chat, phone, or
                email.
              </div>
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <img
              src='https://res.cloudinary.com/noor011/image/upload/v1636740891/drone-image/drone_11_y6rnl0.jpg'
              className='rounded mx-auto'
              alt='about us'
              style={{ height: '400px' }}
            ></img>
          </div>
        </div>
      </div>
      {/* about section end */}
      {/* reviews section start */}
      <div className='container mb-5'>
        <div className='row my-5'>
          <h1 className='text-center text-uppercase'>Reveiews</h1>
        </div>

        <div className='row'>
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
                  <th>EMAIL</th>
                  <th>NAME</th>
                  <th>RATING</th>
                  <th>COMMENT</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((x) => (
                  <tr key={x._id}>
                    <td>{x.email}</td>
                    <td>{x.userName}</td>
                    <td>
                      <Rating value={parseFloat(x.rating)} />
                    </td>
                    <td>{x.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* reviews section end */}
      <Footer />
    </>
  )
}

export default Home
