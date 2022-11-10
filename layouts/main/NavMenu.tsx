import React from 'react';
import { useRouter } from "next/router";
import { BuildOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';

interface Route {
    name: string;
    href: string;
    icon: React.ReactNode
}

const routes: Route[] = [{
    name: "Nucleotides to amino acids",
    href: "/naa",
    icon: <BuildOutlined />,
}, {
    name: "Multimerization",
    href: "/multimerization",
    icon: <VideoCameraOutlined />,
}]


export const NavMenu: React.FC = () => {
    const router = useRouter();

    const currentRoute = routes.find((route) => route.href === router.pathname)

    return (
        <Menu
            theme="dark"
            defaultSelectedKeys={[currentRoute?.href || '']}
        >
            {routes.map(mapRouteToMenuItem)}
        </Menu>
    )
}

const mapRouteToMenuItem = ({ href, name, icon }: Route) => (
    <Menu.Item key={href} icon={icon}>
        <Link href={href}>
            {name}
        </Link>
    </Menu.Item>
)