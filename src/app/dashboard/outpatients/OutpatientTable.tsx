import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Alert, Table } from 'antd';
import React, { useEffect } from 'react';

import {
  Typography
} from 'antd';
import { supabase } from '@/services/supabase/supabase-client';

const { Title } = Typography;
const columns = [
  {
    title: 'Unique Code',
    dataIndex: 'UniqueCode',
    key: 'UniqueCode',
    sorter: (a: any, b: any) => a.UniqueCode.localeCompare(b.UniqueCode),
  },
  // {
  //   title: 'IPCode',
  //   dataIndex: 'IPCode',
  //   key: 'IPCode',
  //   sorter: (a:any, b:any)=> a.IPCode.localeCompare(b.IPCode),
  // },
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
    sorter: (a: any, b: any) => a.LName.localeCompare(b.LName),
  },
  {
    title: 'DOB',
    dataIndex: 'Dob',
    key: 'Dob',
    sorter: (a: any, b: any) => a.Dob.localeCompare(b.Dob),
  },
  {
    title: 'Gender',
    dataIndex: 'Gender',
    key: 'Gender',
    sorter: (a: any, b: any) => a.Gender.localeCompare(b.Gender),
  },
  {
    title: 'Address',
    dataIndex: 'Address',
    key: 'Address',
    sorter: (a: any, b: any) => a.Address.localeCompare(b.Address),
  },
  {
    title: 'Phone Number',
    dataIndex: 'Phone',
    key: 'Phone',
    sorter: (a: any, b: any) => a.Phone.localeCompare(b.Phone),
  },
  {
    title: 'Action',
    key: 'Action',
    render: (record: any) => {
      return (
        <>
          <EditOutlined
            onClick={() => {
              handleUpdate(record);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              handleDelete(record);
            }}
            style={{ marginLeft: 15 }}
          />
        </>
      );
    },
  },

 
];

const handleDelete = async (record: any) => {
  const { data, error } = await supabase
    .from('outpatient')
    .delete()
    .eq('UniqueCode', record.UniqueCode)
    .select();
};
const handleUpdate = async (record: any) => {
  // const {data,error} = await supabase
  // .from('outpatient')
  // .update()
  // .eq('UniqueCode', record.UniqueCode)
  // .select()
};

const OutpatientTable = () => {
 
  const [fetchError, setFetchError] = React.useState<any>(null);
  const [data, setData] = React.useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('outpatient').select(); // ! query based on equal DeptCode
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

  const fixedColumn = columns.slice(0, 1);
  const scrollColumn = columns.slice(1); //start from index 1

  // const onDelete=(record)=> {
  //   console.log('f');
  // }

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
      {/* <Card
          title={'pali'}
          extra={
            <>
              <Modal>
              title={'Update outpatient'}
              open={true}
              <Title level={5}>OP Code</Title>
              <Input
                value={'abcd'}
                //onChange={(e) => setOPCode(e.target.value)}
                placeholder={'Enter OPCode'}
              />
              </Modal>
            </>
          }/> */}

      <Table
        dataSource={data}
        columns={columns}
        scroll={{ x: true }}></Table>

      {fetchError && (
        <Alert
          message={fetchError}
          type="error"></Alert> //? conditional rendering?
      )}
    </>
  );
};

export default OutpatientTable;
