'use client'
import { CustomTable } from '@/components/common/table/TableCustom';
import { TableTreatmentProps } from '@/types/props';
import { ColumnsType } from 'antd/es/table';
<<<<<<< HEAD
import React, { useEffect } from 'react';
import { supabase } from '@/services/supabase/supabase-client';
import { escape } from 'querystring';
const TableTreatment = () => {
  const[treatmentFetchError,setTreatmentFetchError] = React.useState<any|null>(null)
  const[treatmentData,setTreatmentData] = React.useState<any|null>([])
  useEffect(
    ()=>{
      const fetchTreatment = async ()=>
      {
            
            const {data,error} = await supabase.from('treatment').select()
            if(!error)
            {
              setTreatmentData(data)
              setTreatmentFetchError(null)
              console.log(treatmentData)
            }
            else
            {
              setTreatmentData(null)
              setTreatmentFetchError(error)
              console.log(treatmentFetchError) // ! for testing
            }

      }
      fetchTreatment()
      },[]
  )
=======
import React from 'react';

const TableTreatment = ({ loading, dataSource }: TableTreatmentProps) => {
>>>>>>> 7503ce95e86e7b9a176570e168ce21068a95b87f
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
<<<<<<< HEAD
        dataSource={treatmentData}
        loading={false}
=======
        dataSource={dataSource}
        loading={loading}
>>>>>>> 7503ce95e86e7b9a176570e168ce21068a95b87f
      />
    </div>
  );
};

export default TableTreatment;
