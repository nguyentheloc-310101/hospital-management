'use client';
import { CustomTable } from '@/components/common/table/TableCustom';
import { TableTreatmentProps } from '@/types/props';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { ItemDoctor, ItemTime } from './item';
import { Tag } from 'antd';
import { useSearchParams } from 'next/navigation';
import TableSkeleton from '@/components/common/skeleton/TableSkeleton';
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

  {
    title: 'Doctor',
    dataIndex: 'doctor',
    key: 'doctor',
    render: (_, record) => (
      <ItemDoctor
        nurse_name={
          record.treatment.PCode.NCode?.FName +
          ' ' +
          record.treatment.PCode.NCode?.LName
        }
        doctor_name={record.doctor?.FName + ' ' + record.doctor?.LName}
      />
    ),
  },
  {
    title: 'Sick Room',
    dataIndex: 'room',
    key: 'room',
    width: 150,
    render: (_, record) => <div>{record.treatment?.PCode?.SickRoom}</div>,
  },
  {
    title: 'Result',
    dataIndex: 'Result',
    key: 'Result',
    render: (_, record) => (
      <>
        {record?.treatment.Result == 'remission' ? (
          <Tag color="magenta">remission</Tag>
        ) : (
          <Tag color="green">recovered</Tag>
        )}
      </>
    ),
  },
];
const columnsDetails: ColumnsType<any> = [
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
  },
  //  {
  //    title: 'Time',
  //    dataIndex: 'Time',
  //    key: 'áds',
  //    render: (_, record) => (
  //      <ItemTime
  //        timeIn={record.treatment?.PCode?.AdmissionDate}
  //        timeOut={record.treatment?.PCode?.DateOfDischarge}
  //      />
  //    ),
  //  },

  //  {
  //    title: 'Doctor',
  //    dataIndex: 'doctor',
  //    key: 'doctor',
  //    render: (_, record) => (
  //      <ItemDoctor
  //        nurse_name={record.doctor?.FName + ' ' + record.doctor?.LName}
  //        doctor_name={
  //          record.treatment.PCode.NCode?.FName +
  //          ' ' +
  //          record.treatment.PCode.NCode?.LName
  //        }
  //      />
  //    ),
  //  },
  {
    title: 'Sick Room',
    dataIndex: 'room',
    key: 'room',
    width: 150,
    render: (_, record) => <div>{record.treatment?.PCode?.SickRoom}</div>,
  },
  {
    title: 'Result',
    dataIndex: 'Result',
    key: 'Result',
    render: (_, record) => (
      <>
        {record?.treatment.Result == 'remission' ? (
          <Tag color="magenta">remission</Tag>
        ) : (
          <Tag color="green">recovered</Tag>
        )}
      </>
    ),
  },
];
const TableTreatment = ({
  loading,
  dataSource,
  onChangeRow,
}: TableTreatmentProps) => {
  const searchParams = useSearchParams();
  const treatment_id = searchParams.get('treatment_id');
  const detail = searchParams.get('detail');

  const [formatData, setFormatData] = useState<any[]>([]);
  useEffect(() => {
    formatDataSource();
  }, [dataSource]);

  const formatDataSource = () => {
    if (dataSource.length == 0) {
      return;
    }
    const result = dataSource?.map((item, index) => {
      return {
        ...item,
        key: index + 1,
      };
    });
    setFormatData(result);
  };
  return (
    <div
      className={`${
        detail == 'true' ? 'w-auto' : 'w-full'
      } overflow-y-scroll mt-2 `}>
      <section className="bg-white rounded-[8px]  rounded-t-[0px]">
        <div className="p-3">
          <TableSkeleton
            columns={detail == 'true' ? columnsDetails : columns}
            loading={loading}>
            <Table
              className="cursor-pointer"
              rowClassName={(record, index) => {
                if (treatment_id === record.treatment?.TreatCode) {
                  return 'selected-row';
                }
                return '';
              }}
              onRow={(record) => {
                return {
                  onClick: (event) => {
                    onChangeRow && onChangeRow(record.treatment?.TreatCode);
                  },
                };
              }}
              // pagination={false}
              columns={detail == 'true' ? columnsDetails : columns}
              dataSource={[...formatData]}
              scroll={{
                x: `${detail} == 'false' ?? 1000px`,
                y: `calc(100vh - 24rem)`,
              }}
            />
          </TableSkeleton>
        </div>
      </section>
    </div>
  );
};

export default TableTreatment;
