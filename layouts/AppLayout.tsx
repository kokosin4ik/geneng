import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import { Layout, Menu } from 'antd'
import Link from 'next/link'

const { Header, Sider, Content } = Layout;

export const AppLayout: React.FC = ({ children }) => {

    return (
        <Layout hasSider={true}>
            <Sider
                collapsible
                breakpoint="lg"
                collapsedWidth="60"
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link href="/home">

                            Программа 1
                        </Link>

                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        Программа 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        Программа 3
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" />

                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}