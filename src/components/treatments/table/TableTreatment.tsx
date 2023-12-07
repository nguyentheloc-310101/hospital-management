<<<<<<< HEAD
'use client';
=======
'use client'
>>>>>>> 55c24fdf41db255db146a4516c9ee7efff462c43
import { CustomTable } from '@/components/common/table/TableCustom';
import { TableTreatmentProps } from '@/types/props';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

<<<<<<< HEAD
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
=======
  {
    title: 'Patient name',
    dataIndex: 'patient_name',
    key: 'patient_name',
    render: (_, record) => (
      <div>
        {record.treatment.PCode?.FName + ' ' + record.treatment.PCode?.LName}
      </div>
    ),
  },
  {
    title: 'Diagnosis',
    dataIndex: 'Diagnosis',
    key: 'Diagnosis',
    render: (_, record) => <div>{record.treatment.PCode?.Diagnosis}</div>,
  }, //
  {
    title: 'Time',
    dataIndex: 'Time',
    key: 'áds',
    render: (_, record) => (
      <ItemTime
        timeIn={record.treatment?.PCode?.AdmissionDate}
        timeOut={record.treatment?.PCode?.DateOfDischarge}
      />
    ),
  },
>>>>>>> 55c24fdf41db255db146a4516c9ee7efff462c43

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
