'use client';
import { CustomTable } from '@/components/common/table/TableCustom';
import { TableTreatmentProps } from '@/types/props';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

const TableTreatment = ({ loading, dataSource }: TableTreatmentProps) => {
  const columns: ColumnsType<any> = [
    {
      title: 'Patient Code',
      dataIndex: 'PCode',
      key: 'Pcode',
    },
    {
      title: 'Treatment code',
      dataIndex: 'TreatCode',
      key: 'TreatCode',
    },
    {
      title: 'Start Date',
      dataIndex: 'StartDate',
      key: 'StartDate',
    },
    {
      title: 'End Date',
      dataIndex: 'EndDate',
      key: 'EndDate',
    },
    {
      title: 'Result',
      dataIndex: 'Result',
      key: 'Result',
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
