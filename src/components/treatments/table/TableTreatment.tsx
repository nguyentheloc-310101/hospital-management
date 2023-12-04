'use client'
import { CustomTable } from '@/components/common/table/TableCustom';
import { ColumnsType } from 'antd/es/table';
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

    //   {
    //     title: 'Địa điểm',
    //     dataIndex: 'resources',
    //     key: 'resources',
    //   },

  ];
  return (
    <div className="">
      <CustomTable
        columns={columns}
        dataSource={treatmentData}
        loading={false}
      />
    </div>
  );
};

export default TableTreatment;
