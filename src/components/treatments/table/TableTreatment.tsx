import { CustomTable } from '@/components/common/table/TableCustom';
import { TableTreatmentProps } from '@/types/props';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

const TableTreatment = ({ loading, dataSource }: TableTreatmentProps) => {
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
        dataSource={dataSource}
        loading={loading}
      />
    </div>
  );
};

export default TableTreatment;
