import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import MakeAdmin from './DashboardPages/MakeAdmin'
import Pay from './DashboardPages/Pay'
import Review from './DashboardPages/Review'
import MyOrder from './DashboardPages/MyOrder'
import useAuth from '../hooks/useAuth'
import AdminRoute from '../PrivateRoute/AdminRoute'
import AddProduct from './DashboardPages/AddProduct'
import AllOrders from './DashboardPages/AllOrders'
import ManageProducts from './DashboardPages/ManageProducts'
import EditDrones from './DashboardPages/EditDrones'

const DashBoard = () => {
  const { admin, logout } = useAuth()
  const { Header, Sider, Content } = Layout

  const [collapsed, setcollapsed] = useState(false)
  let { path, url } = useRouteMatch()

  const toggle = () => {
    setcollapsed(!collapsed)
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['2']}>
          <Menu.Item key='1'>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to={`${url}/myorder`}>MyOrder</Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to={`${url}/pay`}>Pay</Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link to={`${url}/review`}>Review</Link>
          </Menu.Item>

          {admin && (
            <>
              <Menu.Item key='5'>
                <Link to={`${url}/admin`}>Make Admin</Link>
              </Menu.Item>
              <Menu.Item key='6'>
                <Link to={`${url}/addProduct`}>AddProudct</Link>
              </Menu.Item>
              <Menu.Item key='7'>
                <Link to={`${url}/allorders`}>All Orders</Link>
              </Menu.Item>
              <Menu.Item key='8'>
                <Link to={`${url}/manageProducts`}>Manage Products</Link>
              </Menu.Item>
            </>
          )}
          <Menu.Item key='9'>
            <button
              onClick={logout}
              type='button'
              className='btn btn-outline-info'
            >
              Logout
            </button>
          </Menu.Item>
          <Menu.Item key='10'>
            <Link to={`${url}`}></Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          <h1 className='text-center text-uppercase'>DashBoard</h1>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '900px',
          }}
        >
          <>
            <Switch>
              <Route path={`${path}`} exact>
                <MyOrder />
              </Route>
              <Route path={`${path}/myorder`} exact>
                <MyOrder />
              </Route>
              <Route path={`${path}/pay`}>
                <Pay />
              </Route>
              <Route path={`${path}/review`}>
                <Review />
              </Route>
              <AdminRoute path={`${path}/admin`}>
                <MakeAdmin />
              </AdminRoute>
              <AdminRoute path={`${path}/addProduct`}>
                <AddProduct />
              </AdminRoute>
              <AdminRoute path={`${path}/allorders`}>
                <AllOrders />
              </AdminRoute>
              <AdminRoute path={`${path}/manageProducts`}>
                <ManageProducts />
              </AdminRoute>
              <AdminRoute path={`${path}/drones/:id/edit`}>
                <EditDrones />
              </AdminRoute>
            </Switch>
          </>
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashBoard
