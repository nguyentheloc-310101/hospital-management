import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form, Input, message } from 'antd';
import { supabase } from '@/services/supabase/supabase-client';
import { error } from 'console';
import { Alert } from 'antd';
import { CustomTable } from '@/components/common/table/TableCustom';
import { MenuProps } from 'antd';
import { Table } from 'antd/lib';
import {
  DeleteTwoTone,
  EditOutlined,
  EditTwoTone,
  SaveTwoTone,
} from '@ant-design/icons';

const EmployeeTable = () => {
  const [form] = Form.useForm();
  const [fetchError, setFetchError] = React.useState<any>(null);
  const [data, setData] = React.useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('employee')
        .select('*,department:DeptCode(Title)'); // ! query based on equal DeptCode
      if (data) setData(data);
      // console.log(data) //! for testing
      console.log(data);
      setFetchError(null);
      if (error) {
        const errorMessage = error.message || 'An error occured';
        setFetchError(errorMessage);
      }
    };

    fetchData();
  }, []);

  const [deleteRow, setDeleteRow] = React.useState<any>(null);
  const [editingRow, setEditingRow] = React.useState<any>(null);
  // * ROUTER FOR feature : click for expanding detail

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

      render: (_: any, record: any) => {
        if (editingRow === record.UniqueCode) {
          return (
            <Form.Item
              name="LName"
              rules={[
                {
                  required: true,
                  message: `Enter last name`,
                },
              ]}>
              <Input></Input>
            </Form.Item>
          );
        } else {
          return <div>{record.LName}</div>;
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
      render: (_: any, record: any) => <div>{record.department?.Title}</div>,
      sorter: (a: any, b: any) => a.DeptCode?.localeCompare(b.DeptCode),
    },

    // {
    //   title: 'Department',
    //   dataIndex: 'Title', // ! i was trying to fetch the department's name, but it didnt work
    //   key: 'Title',
    //   // sorter: (a:any, b:any)=> a.Title.localeCompare(b.Title),
    // },
    {
      title: 'Action',
      render: (_: any, record: any) => {
        return (
          <div className="flex space-x-4">
            <Button
              icon={<EditTwoTone />}
              onClick={() => {
                setEditingRow(record.UniqueCode);

                form.setFieldValue;
                {
                  LName: record.LName;
                }
              }}></Button>
            <Button
              icon={<SaveTwoTone />}
              htmlType="submit"></Button>
            <Button
              icon={<DeleteTwoTone />}
              onClick={() => {
                setDeleteRow(record.UniqueCode);
              }}></Button>
          </div>
        );
      },
    },
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
  // !const onSubmit = async () =>
  // {
  //   const{data,error} = await supabase.from('employee').update('*').eq('UniqueCode',editingRow).select()
  //   if(error)
  //   {
  //     message.error(error.message)

  //   }
  //   if(data)
  //   {
  //     console.log(data)

  //   }
  // }

  useEffect(() => {
    if (deleteRow !== null) {
      handleDelete();
    }
  }, [deleteRow]);
  const handleDelete = async () => {
    console.log('Index to delete', deleteRow);
    const { data, error } = await supabase
      .from('employee')
      .delete()
      .eq('UniqueCode', deleteRow);
    if (error) {
      message.error(error.message);
    }
    if (data) {
      console.log(data);
    }
  };
  const onFinish = async (values: any) => {
    console.log(values);
    const updateDataSource = [...data];

    // Find the index of the editingRow in the array
    const rowIndex = updateDataSource.findIndex(
      (item) => item.UniqueCode === editingRow
    );
    console.log(rowIndex);
    // If the editingRow is found, update only the specified values
    if (rowIndex !== -1) {
      updateDataSource[rowIndex] = { ...updateDataSource[rowIndex], ...values };
      const { data: updatedData, error } = await supabase
        .from('employee')
        .update({ ...values })
        .eq('UniqueCode', editingRow);

      if (error) {
        message.error(error.message);
      } else {
        console.log(updatedData);
      }
    } else {
      return;
    }
    console.log(updateDataSource);
    // Update the state with the modified array
    setData(updateDataSource);
    console.log(editingRow);
    // Reset editingRow to null

    setEditingRow(null);
  };

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
      <Form
        form={form}
        onFinish={onFinish}>
        <Table
          dataSource={data}
          columns={columns}
          // style={{maxWidth:'max-content'}}
          scroll={{ x: true }}></Table>
      </Form>

      {fetchError && (
        <Alert
          message={fetchError}
          type="error"></Alert> //? conditional rendering?
      )}
    </>
  );
};

export default EmployeeTable;
