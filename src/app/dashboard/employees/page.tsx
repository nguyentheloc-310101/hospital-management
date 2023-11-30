// DoctorsPage.js
'use client';
import React, { useState } from 'react';
import { Button, Card, Col, FloatButton, Input, Tabs, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import AddEmployeeModal from './AddEmployeeModal';
import EmployeeTable from '@/app/dashboard/employees/EmployeeTable'; // Import the new component
import { useRouter, useSearchParams } from 'next/navigation';

const { Title } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

const items = [
  {
    key: 'active',
    label: 'Active',
    children: null,
  },
  {
    key: 'inactive',
    label: 'Inactive',
    children: null,
  },
];

const DoctorsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const detailStatus = searchParams.get('details');
  // const currentId = searchParams.get('id'); 
  // * This searchParams should be used when query detail info

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeDetail, setActiveDetail] = useState(false);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setModalVisible(false);
      setConfirmLoading(false);
      // This is where to handle the adding states to the database.
    }, 2000);
  };

  //useEffect (()=>{},[Name])
  //tao zustand (store) luu cac thong tin employee fetch ve


  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Col className={'mt-2 ml-1 mr-1'}>
        <Card
          title={'EMPLOYEES INFORMATION'}
          extra={
            <>
              <Button type='dashed' icon={<UserAddOutlined />} onClick={showModal}>Add employee</Button>
              {/*    can add some components here*/}
            </>
          }>
          {/* <Tabs
            defaultActiveKey={'active'}
            onChange={() => {}}>
            {items.map((item) => (
              <TabPane
                tab={item.label}
                key={item.key}>
                {item.children}
              </TabPane>
            ))}
          </Tabs> */}
          <EmployeeTable />
          
          <AddEmployeeModal
            open={modalVisible}
            onCancel={handleCancel}
            onOk={handleOk}
            confirmLoading={confirmLoading}
          />
        </Card>
      </Col>
    
    </>
  );
};

export default DoctorsPage;
