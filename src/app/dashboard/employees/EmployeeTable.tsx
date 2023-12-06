import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { supabase } from '@/services/supabase/supabase-client';
import { error } from 'console';
import { Alert } from 'antd';
import { CustomTable } from '@/components/common/table/TableCustom';

const columns = [
  {
    title: 'Employee ID',
    dataIndex: 'UniqueCode',
    key: 'UniqueCode',
    
    sorter: (a:any, b:any) => a.UniqueCode.localeCompare(b.UniqueCode),
  },
  {
    title: 'First Name',
    dataIndex: 'FName',
    key: 'FName',
    
    sorter: (a:any, b:any)=> a.FName.localeCompare(b.FName),
  },
  {
    title: 'Last Name',
    dataIndex: 'LName',
    key: 'LName',
    sorter: (a:any, b:any)=>{ 
      
      
      a.LName?.localeCompare(b.LName)
    
    },
  },
  {
    title: 'DOB',
    dataIndex: 'Dob',
    key: 'Dob',
    sorter: (a:any, b:any)=> a.Dob?.localeCompare(b.Dob),
  },
  {
    title: 'Gender',
    dataIndex: 'Gender',
    key: 'Gender',
    sorter: (a:any, b:any)=> a.Gender?.localeCompare(b.Gender),
  },
  {
    title: 'Address',
    dataIndex: 'Address',
    key: 'Address',
    sorter: (a:any, b:any)=> a.Address?.localeCompare(b.Address),
  },
  {
    title: 'Degree Name',
    dataIndex: 'DegreeName',
    key: 'DegreeName',
    sorter: (a:any, b:any)=> a.DegreeName?.localeCompare(b.DegreeName),
  },
  {
    title: 'Degree Year',
    dataIndex: 'DegreeYear',
    key: 'DegreeYear',
    sorter: (a:any, b:any)=> a.DegreeYear?.localeCompare(b.DegreeYear),
  },
  {
    title: 'Start Date',
    dataIndex: 'StartDate',
    key: 'StartDate',
    sorter: (a:any, b:any)=> a.StartDate?.localeCompare(b.StartDate),
  },
  {
    title: 'Role',
    dataIndex: 'Role',
    key: 'Role',
    sorter: (a:any, b:any)=> a.Role?.localeCompare(b.Role),
  },
  {
    title: 'Dept Code',
    dataIndex: 'DeptCode',
    key: 'DeptCode',
    render:(_:any,record:any)=>(<div>{record.department?.Title}</div>),
    sorter: (a:any, b:any)=> a.DeptCode?.localeCompare(b.DeptCode),
  },
  // {
  //   title: 'Department',
  //   dataIndex: 'Title', // ! i was trying to fetch the department's name, but it didnt work
  //   key: 'Title',
  //   // sorter: (a:any, b:any)=> a.Title.localeCompare(b.Title),
  // },

];



const EmployeeTable = () => {
  // * ROUTER FOR feature : click for expanding detail 
  //const router = useRouter();
  // const searchParams = useSearchParams();
  // const onChangeRow = (id: string) => {
  //   const detailStatus = searchParams.get('details');
  //   if (detailStatus == 'false' || detailStatus == '')
  //     router.push(`/dashboard/employees/id=${id}&details=true`);
  //   else {
  //     router.push(`/dashboard/employees/id=${id}&details=false`);
  //   }
  // };
  const [fetchError, setFetchError] = React.useState<any>(null)
  const [data, setData] = React.useState<any >([])
  useEffect(() => {
    const fetchData = async () => {
      const { data,error} = await supabase.from('employee').select('*,department:DeptCode(Title)' ) // ! query based on equal DeptCode 
      if(data)
        setData(data);
        // console.log(data) //! for testing
        console.log(data)
        setFetchError(null);
      if(error)
      {
        const errorMessage = error.message || "An error occured"
        setFetchError(errorMessage) 
      }
    };
    

    fetchData();
  }, []); 

  const fixedColumn = columns.slice(0,1)
  const scrollColumn = columns.slice(1) //start from index 1

  return (
    <>
      {/* <Table
      // * on change for detail 
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
      /> */}
      <Table dataSource={data} 
      columns={columns}

      
      scroll={{ x: true }}
      ></Table>
      
      {
        fetchError && (
          <Alert message={fetchError} type='error'></Alert> //? conditional rendering? 
        )
      }
    </>
  );
};

export default EmployeeTable;
