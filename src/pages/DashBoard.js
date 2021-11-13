import React from 'react'
import { Layout, Menu, } from 'antd'
import { NavLink } from 'react-router-dom'
import { PieChartOutlined } from '@ant-design/icons'

const DashBoard = ({ location }) => {
  const { SubMenu } = Menu
  const { Header, Content, Sider } = Layout
  console.log(location)
  return (
    <Layout>
      <Header className='header'>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['2']}
          className='d-flex justify-content-end'
        >
          <NavLink to='/'>
            <Menu.Item key='2'>Home</Menu.Item>
          </NavLink>
          <Menu.Item key='3'>Logout</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Layout
          className='site-layout-background'
          style={{ padding: '24px 0' }}
        >
          <Sider className='site-layout-background' width={200}>
            <Menu
              mode='inline'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <Menu.Item key='1' icon={<PieChartOutlined />}>
                Pay
              </Menu.Item>
              <Menu.Item key='1' icon={<PieChartOutlined />}>
                My Order
              </Menu.Item>
              <Menu.Item key='1' icon={<PieChartOutlined />}>
                Review
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio repellendus numquam pariatur, officia, commodi unde fuga perferendis rerum minus aut assumenda? Possimus fugiat enim animi similique veniam? Saepe, natus laboriosam.</p>
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}

export default DashBoard
