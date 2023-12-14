// DoctorsPage.js
'use client';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  FloatButton,
  Input,
  Tabs,
  Typography,
  message,
} from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import AddEmployeeModal from './AddEmployeeModal';
import EmployeeTable from '@/app/dashboard/employees/EmployeeTable'; // Import the new component
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/services/supabase/supabase-client';

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
  const [department, setDepartment] = useState<any[]>([]);
  const [optionDepartment, setOptionDepartment] = useState<any[]>([]);
  //useEffect (()=>{},[Name])
  //tao zustand (store) luu cac thong tin employee fetch ve
  useEffect(() => {
    fetchDeparment();
  }, []);

  const fetchDeparment = async () => {
    const { data, error } = await supabase
      .from('department')
      .select('*,DeanCode(*)');
    if (error) {
      message.error(error.message);
      return;
    }
    if (data) {
      setDepartment(data);
      console.log('Deparment data: ', department);
      const temp = data.map((item) => {
        return {
          value: item?.DeptCode,
          label: item?.Title,
        };
      });
      setOptionDepartment(temp);
    }
  };
  return (
    <>
      <Col className={'mt-2 ml-1 mr-1'}>
        <Card
          extra={
            <>
              <AddEmployeeModal optionSelect={[...optionDepartment]} />
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
