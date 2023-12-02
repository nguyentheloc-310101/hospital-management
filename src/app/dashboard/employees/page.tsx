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

 
  const [activeDetail, setActiveDetail] = useState(false);
  

  //useEffect (()=>{},[Name])
  //tao zustand (store) luu cac thong tin employee fetch ve


  
  return (
    <>
      <Col className={'mt-2 ml-1 mr-1'}>
        <Card
          title={'EMPLOYEES INFORMATION'}
          extra={
            <>
              <AddEmployeeModal/>
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
          
          
        </Card>
      </Col>
    
    </>
  );
};

export default DoctorsPage;
