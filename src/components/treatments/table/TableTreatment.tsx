import { CustomTable } from '@/components/common/table/TableCustom';
import { TableTreatmentProps } from '@/types/props';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React from 'react';

const TableTreatment = ({ loading, dataSource }: TableTreatmentProps) => {
  const columns: ColumnsType<any> = [
    {
      title: 'No',
      dataIndex: 'TreatCode',
      key: 'TreatCode',
      width: 80,
      render: (key: number, record) => (
        <div>{record?.key < 10 ? '0' + record?.key : record?.key}</div>
      ),
    },
    {
      title: 'ID Treatment',
      dataIndex: 'TreatCode',
      key: 'TreatCode',
      width: 150,
      render: (_, record) => <div>{record.treatment?.TreatCode}</div>,
    },
    {
      title: 'Patient name',
      dataIndex: 'patient_name',
      key: 'patient_name',
      render: (_, record) => <div>{record.treatment.PCode?.LName}</div>,
    },
    {
      title: 'Diagnosis',
      dataIndex: 'Diagnosis',
      key: 'Diagnosis',
      render: (_, record) => <div>{record.treatment.PCode?.Diagnosis}</div>,
    },
    {
      title: 'Time',
      dataIndex: 'Time',
      key: 'áds',
      render: (_, record) => (
        <div>
          <div>
            <span>Admission:</span>

            <span>
              {dayjs(record.treatment?.PCode?.AdmissionDate).format(
                'DD/MM/YYYY'
              )}
            </span>
          </div>
        </div>
      ),
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
    <div className="bg-white rounded-b-[8px]">
      <CustomTable
        columns={columns}
        dataSource={dataSource}
        loading={loading}
      />
    </div>
  );
};

export default TableTreatment;
