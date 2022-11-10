import React from 'react'

import { Layout, Menu } from 'antd'
import { NavMenu } from './NavMenu';

const { Header, Sider, Content } = Layout;

export const AppLayout: React.FC = ({ children }) => {
    return (
        <Layout hasSider={true}>
            
            <Layout className="site-layout">
                <Content
                    style={{
                        padding: 24,
                        minHeight: 280,
                        overflow: 'auto',
                        background: '#FFF',
                        
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}