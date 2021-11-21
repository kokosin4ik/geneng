import React from 'react'

import { Layout, Menu } from 'antd'
import { NavMenu } from './NavMenu';

const { Header, Sider, Content } = Layout;

export const AppLayout: React.FC = ({ children }) => {
    return (
        <Layout hasSider={true}>
            <Sider
                collapsible
                breakpoint="lg"
                collapsedWidth="60"
                width="260"
            >
                <div className="logo" />
                <NavMenu />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" />

                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 0 0px',
                        padding: 24,
                        minHeight: 280,
                        overflow: 'auto'
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}