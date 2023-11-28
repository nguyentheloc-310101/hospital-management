// DoctorsPage.js
'use client'
import React, { useState } from 'react';
import { Card, Col, FloatButton, Input, Tabs, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import AddEmployeeModal from './AddEmployeeModal';
import EmployeeTable from "@/app/dashboard/employees/EmployeeTable"; // Import the new component

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
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setModalVisible(false);
            setConfirmLoading(false);
            // This is where to handle the adding states to the database.
        }, 2000);
    };

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
                            <Search
                                placeholder="input search text"
                                style={{ width: 200 }}
                                onSearch={() => {
                                    console.log('Search clicked');
                                }}
                            />
                            {/*    can add some components here*/}
                        </>
                    }
                >
                    <Tabs defaultActiveKey={'active'} onChange={() => {}}>
                        {items.map((item) => (
                            <TabPane tab={item.label} key={item.key}>
                                {item.children}
                            </TabPane>
                        ))}
                    </Tabs>
                    <EmployeeTable></EmployeeTable>
                    <AddEmployeeModal
                        visible={modalVisible}
                        onCancel={handleCancel}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                    />
                </Card>
            </Col>
            <FloatButton
                className={'bg-sky-500'}
                tooltip={<>Add employee</>}
                icon={<UserAddOutlined />}
                onClick={showModal}
            ></FloatButton>
        </>
    );
};

export default DoctorsPage;
