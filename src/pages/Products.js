import React, { useEffect } from 'react'
import { Card, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Header from '../components/Header'
const Products = ({ product }) => {
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
      <div className='container'>
        <div className='row my-5'>
          <h1 className='text-center text-uppercase'>Products</h1>
        </div>
        <div className='row row-cols-1 row-cols-sm-1 row-cols-md-3'>
          {drones.map((drone) => (
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
          ))}
        </div>
      </div>
    </>
  )
}

export default Products
