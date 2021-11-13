import React, { useEffect } from 'react'
import { Card, Button } from 'antd'
import { Carousel } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Header from '../components/Header'
const Home = ({history}) => {
  const { Meta } = Card
  
  const dispatch = useDispatch()

  
  const productList = useSelector((state) => state.productList)
  const { loading, error, drones} = productList

  

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])


  return (
    <>
      <Header/>
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
          {drones
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
                  <Button type='primary' block>
                    Buy Now
                  </Button>
                </Card>
              </div>
            ))
            .slice(0, 6)}
        </div>
      </div>
      {/* products section start */}
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
      <div className='container'>
        <div className='row my-5'>
          <h1 className='text-center text-uppercase'>Reveiews</h1>
        </div>
        <Carousel autoplay>
          {/* <div className='mx-auto' style={{ height: '300px', width: '300px' }}>
            <Card
              hoverable
              cover={
                <img
                  alt='example'
                  src='https://res.cloudinary.com/noor011/image/upload/v1636740891/drone-image/drone_11_y6rnl0.jpg'
                  className='img-fluid'
                />
              }
              className='my-2 mx-2'
            >
              <Meta
                title='Europe Street beat'
                description='chig ching chu'
                className='my-2'
              />
              <p>Price: 880$</p>
              <Button type='primary' block>
                Buy Now
              </Button>
            </Card>
          </div> */}
          <div className='d-flex justify-content-center'>
            <div>
              <Card
                hoverable
                cover={
                  <img
                    alt='example'
                    src='https://res.cloudinary.com/noor011/image/upload/v1636740891/drone-image/drone_11_y6rnl0.jpg'
                    className='img-fluid'
                    style={{ height: '300px', width: '400px' }}
                  />
                }
                className='my-2 mx-2'
              >
                <Meta
                  title='Europe Street beat'
                  description='chig ching chu'
                  className='my-2'
                />
                <p>Price: 880$</p>
                <Button type='primary' block>
                  Buy Now
                </Button>
              </Card>
            </div>
          </div>
        </Carousel>
      </div>

      {/* reviews section end */}
    </>
  )
}

export default Home
