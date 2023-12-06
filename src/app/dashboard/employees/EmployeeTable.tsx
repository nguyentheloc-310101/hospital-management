import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form, Input } from 'antd';
import { supabase } from '@/services/supabase/supabase-client';
import { error } from 'console';
import { Alert } from 'antd';
import { CustomTable } from '@/components/common/table/TableCustom';
import { MenuProps } from 'antd';
import { Table } from 'antd/lib';
import { DeleteTwoTone, EditOutlined, EditTwoTone, SaveTwoTone } from '@ant-design/icons';






const EmployeeTable = () => {
  const [form] = Form.useForm() 
  const [fetchError, setFetchError] = React.useState<any>(null)
  const [data, setData] = React.useState<any>([])
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('employee').select('*,department:DeptCode(Title)') // ! query based on equal DeptCode 
      if (data)
        setData(data);
      // console.log(data) //! for testing
      console.log(data)
      setFetchError(null);
      if (error) {
        const errorMessage = error.message || "An error occured"
        setFetchError(errorMessage)
      }
    };


    fetchData();
  }, []);


  const [editingRow, setEditingRow] = React.useState(null)
  // * ROUTER FOR feature : click for expanding detail 
  const [fieldsValue, setFieldsValue] = React.useState(null)
  
  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'UniqueCode',
      key: 'UniqueCode',
  
      sorter: (a: any, b: any) => a.UniqueCode.localeCompare(b.UniqueCode),
    },
    {
      title: 'First Name',
      dataIndex: 'FName',
      key: 'FName',
      
      sorter: (a: any, b: any) => a.FName.localeCompare(b.FName),
    },
    {
      title: 'Last Name',
      dataIndex: 'LName',
      key: 'LName',
      
      render:(_:any,record:any)=>{
        if(editingRow === record.UniqueCode)
        {
            return (<Form.Item 
            name="Lname" 
            rules={[
              {
                required:true,
                message:"Enter Lname",
              }
            ]}
            >
              <Input></Input>
            </Form.Item>
            )
        }
        else
        {
            return <div>{record.LName}</div>
        }
      },
      // sorter: (a: any, b: any) => {
  
      
      //   a.LName?.localeCompare(b.LName)
  
      // },
    },
    {
      title: 'DOB',
      dataIndex: 'Dob',
      key: 'Dob',
      sorter: (a: any, b: any) => a.Dob?.localeCompare(b.Dob),
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
      sorter: (a: any, b: any) => a.Gender?.localeCompare(b.Gender),
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
      sorter: (a: any, b: any) => a.Address?.localeCompare(b.Address),
    },
    {
      title: 'Degree Name',
      dataIndex: 'DegreeName',
      key: 'DegreeName',
      sorter: (a: any, b: any) => a.DegreeName?.localeCompare(b.DegreeName),
    },
    {
      title: 'Degree Year',
      dataIndex: 'DegreeYear',
      key: 'DegreeYear',
      sorter: (a: any, b: any) => a.DegreeYear?.localeCompare(b.DegreeYear),
    },
    {
      title: 'Start Date',
      dataIndex: 'StartDate',
      key: 'StartDate',
      sorter: (a: any, b: any) => a.StartDate?.localeCompare(b.StartDate),
    },
    {
      title: 'Role',
      dataIndex: 'Role',
      key: 'Role',
      sorter: (a: any, b: any) => a.Role?.localeCompare(b.Role),
    },
    {
      title: 'Department',
      dataIndex: 'DeptCode',
      key: 'DeptCode',
      render: (_: any, record: any) => (<div>{record.department?.Title}</div>),
      sorter: (a: any, b: any) => a.DeptCode?.localeCompare(b.DeptCode),
    },
    
    // {
    //   title: 'Department',
    //   dataIndex: 'Title', // ! i was trying to fetch the department's name, but it didnt work
    //   key: 'Title',
    //   // sorter: (a:any, b:any)=> a.Title.localeCompare(b.Title),
    // },
    {
      title: "Action",
      render:(_:any,record:any)=>
      {
        return (
          <div className='flex space-x-4'>
            <Button icon={<EditTwoTone /> } 
            onClick={
            ()=>
            {setEditingRow(record.UniqueCode);
              form.setFieldValue
              {
                LName:record.LName
              }
            }} ></Button>
            <Button icon={<SaveTwoTone />} htmlType='submit'></Button>
            <Button icon={<DeleteTwoTone />} ></Button>
          </div>
          
          
          
        )
      }
    }
  
  ];
  

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
  
  const onFinish = (values:any)=>
  {
    console.log(values)
    
  }
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
      <Form form={form} onFinish={onFinish}>

      <Table dataSource={data}
          columns={columns}
         
          // style={{maxWidth:'max-content'}}
          scroll={{ x:true}}
        ></Table>
      </Form>
        

        {
          fetchError && (
            <Alert message={fetchError} type='error'></Alert> //? conditional rendering? 
          )
        }
      
    
    </>
  );
};

export default EmployeeTable;
