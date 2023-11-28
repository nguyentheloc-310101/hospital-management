import React from 'react';
import { Table } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'Name',
  },

  // {
  //   title: 'Birth Date',
  //   dataIndex: 'BirthDate',
  // },
  // {
  //   title: 'Gender',
  //   dataIndex: 'Gender',
  // },
  // {
  //   title: 'Address',
  //   dataIndex: 'Address',
  // },
  // {
  //   title: 'Phone number',
  //   dataIndex: 'PhoneNumber',
  // },
  // {
  //   title: 'Degree',
  // },
  // {
  //   title: 'Degree Year',
  // },
  // {
  //   title: 'Start Date',
  // },
  // {
  //   title: 'Role',
  // },
  // {
  //   title: 'Department Name',
  // },
];

const data: any[] = [
  {
    id: '123',
    Name: 'aaaa',
  },
];

const EmployeeTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const onChangeRow = (id: string) => {
    const detailStatus = searchParams.get('details');
    if (detailStatus == 'false' || detailStatus == '')
      router.push(`/dashboard/employees/id=${id}&details=true`);
    else {
      router.push(`/dashboard/employees/id=${id}&details=false`);
    }
  };
  return (
    <>
      <Table
        // onRow={() => {
        //   console.log('hello');
        // }}
        onRow={(record) => {
          return {
            onClick: (event) => {
              onChangeRow(record?.id);
            },
          };
        }}
        className="cursor-pointer"
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default EmployeeTable;
