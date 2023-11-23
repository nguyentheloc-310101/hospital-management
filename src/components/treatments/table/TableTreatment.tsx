import { CustomTable } from '@/components/common/table/TableCustom';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

const TableTreatment = () => {
  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: '',
      key: 'kss',
    },
    {
      title: 'Treatment',
      dataIndex: 'visitor_image',
      key: 'kk',
    },
    {
      title: 'Time',
      dataIndex: 'date_time_request',
      key: 'áds',
    },

    //   {
    //     title: 'Địa điểm',
    //     dataIndex: 'resources',
    //     key: 'resources',
    //   },

    {
      title: 'Doctor',
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'Status',
    },
  ];
  return (
    <div className="">
      <CustomTable
        columns={columns}
        dataSource={[]}
        loading={false}
      />
    </div>
  );
};

export default TableTreatment;
