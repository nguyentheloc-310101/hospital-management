'use client';

import React from 'react';
import { Card, Col, FloatButton, Input, Tabs, TabsProps } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import AddModal from '@/app/dashboard/employees/AddModal';

const { Search } = Input;
const onChange = (key: string) => {
  console.log({ key } + ' clicked');
};

let items: TabsProps['items'] = [
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
  return (
    <>
      <Col className={'mt-2 ml-1 mr-1'}>
        <Card
          title={'EMPLOYEES INFORMATION'}
          extra={
            <>
              <Search
                placeholder="input search text"
                style={{ width: 200 }}
                onSearch={() => {
                  console.log('Search clicked');
                }}
              />
              {/*    can add some components here*/}
            </>
          }>
          <Tabs
            defaultActiveKey={'active'}
            items={items}
            onChange={onChange}
          />
          <AddModal></AddModal>
        </Card>
      </Col>
      <FloatButton
        className={'bg-sky-500'}
        icon={<UserAddOutlined />}
        onClick={() => console.log('Add button clicked')}></FloatButton>
    </>
  );
};

export default DoctorsPage;
