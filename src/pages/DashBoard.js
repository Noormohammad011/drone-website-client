import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import Pay from './DashboardPages/Pay'
import MyOrder from './DashboardPages/MyOrder'
import Review from './DashboardPages/Review'

const DashBoard = () => {
  const { Header, Sider, Content } = Layout

  const [collapsed, setcollapsed] = useState(false);
  

  const toggle = () => {
    setcollapsed(!collapsed);
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
          <Menu.Item key='1' icon={<UserOutlined />}>
           Nav 1
          </Menu.Item>
          <Menu.Item key='2' icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key='3' icon={<UploadOutlined />}>
            nav 3
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
          <Pay />
          <MyOrder />
          <Review/>
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashBoard
