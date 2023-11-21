'use client';
import {
  ContainerOutlined,
  MedicineBoxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RollbackOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const { Header, Content, Sider } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

  const items: MenuProps['items'] = [
    {
      label: 'profile',
      key: '/dashboard/profile',
      icon: <UserOutlined />,
    },
    {
      label: <p style={{ color: 'red' }}>log out</p>,
      key: '/login',
      icon: <RollbackOutlined style={{ color: 'red' }} />,
    },
  ];
  const itemsSideBar: any = [
    {
      key: '/dashboard/treatments',
      icon: <ContainerOutlined />,
      label: 'Treatments',
    },
    {
      key: '/dashboard/employees',
      icon: <MedicineBoxOutlined />,
      label: 'Employees',
    },
    {
      key: '/dashboard/patients',
      icon: <UserOutlined />,
      label: 'Patients',
    },
  ];

  const onClick = (e: any) => {
    if (!e) return;
    router.push(e.key, { scroll: false });
  };

  const handleMenuClick: MenuProps['onClick'] = (e: any) => {
    if (!e) return;
    if (e.key == '/login') {
      localStorage.clear();
    }
    router.push(e.key, { scroll: false });
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const onHandleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className="h-fit">
      <Sider
        breakpoint="lg"
        collapsedWidth="4rem"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div
          className={`w-full bg-[white] text-[#169fed] font-bold text-center h-[60px] flex items-center justify-between lg:text-[16px] text-[12px] p-2`}>
          <div
            onClick={() => {
              router.push('/');
            }}
            className={`cursor-pointer ${
              collapsed ? 'hidden' : 'lg:block hidden'
            } `}>
            Logo here
          </div>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </div>

        <Menu
          theme="light"
          mode="inline"
          onClick={onClick}
          className="h-full"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={['dashboard/']}
          activeKey={pathname}
          items={itemsSideBar}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content
          style={{
            height: 'calc(100vh - 114px)',
            overflow: 'scroll',
            backgroundColor: '#F2F3F5',
          }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
