'use client'
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { supabase } from '@/services/supabase/supabase-client';

const EmployeeTable = () => {
  const [data, setData] = React.useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('employee').select();
      setData(data);
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once after the initial render

  const columns = [
    {
      title: 'Unique Code',
      dataIndex: 'UniqueCode',
      key: 'UniqueCode',
    },
    {
      title: 'First Name',
      dataIndex: 'FName',
      key: 'FName',
    },
    {
      title: 'Last Name',
      dataIndex: 'LName',
      key: 'LName',
    },
    {
      title: 'DOB',
      dataIndex: 'Dob',
      key: 'Dob',
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
    },
    {
      title: 'Degree Name',
      dataIndex: 'DegreeName',
      key: 'DegreeName',
    },
    {
      title: 'Degree Year',
      dataIndex: 'DegreeYear',
      key: 'DegreeYear',
    },
    {
      title: 'Start Date',
      dataIndex: 'StartDate',
      key: 'StartDate',
    },
    {
      title: 'Role',
      dataIndex: 'Role',
      key: 'Role',
    },
    {
      title: 'Dept Code',
      dataIndex: 'DeptCode',
      key: 'DeptCode',
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default EmployeeTable;
