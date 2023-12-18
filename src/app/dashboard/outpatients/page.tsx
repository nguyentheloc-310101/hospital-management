// DoctorsPage.js
'use client';
import { supabase } from '@/services/supabase/supabase-client';
import {
  Card,
  Col,
  Input,
  Tabs,
  Typography,
  message
} from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddOutpatientModal from './AddOutpatientModal';
import OutpatientTable from './OutpatientTable';
import React from 'react';

const { Title } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

const items = [
  {
    key: 'active',
    label: 'Active',
    children: null,
  },
  {
    key: 'inactive',
    label: 'Inactive',
    children: null,
  },
];

const OutpatientsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const detailStatus = searchParams.get('details');
  // const currentId = searchParams.get('id');
  // * This searchParams should be used when query detail info

  const [activeDetail, setActiveDetail] = useState(false);
  const [department, setDepartment] = useState<any[]>([]);
  const [optionDepartment, setOptionDepartment] = useState<any[]>([]);
  const [dataInPatient, setDataInpatient] = useState<any>([])
  //useEffect (()=>{},[Name])
  //tao zustand (store) luu cac thong tin Outpatient fetch ve
  useEffect(() => {
    fetchDeparment();
  }, []);
  useEffect(() => {

    const fetchInPatient = async () => {
      let { data: inpatient, error } = await supabase
        .from('inpatient')
        .select('*')
        if(inpatient){
          console.log('inpatient', inpatient)
          setDataInpatient(inpatient)
        }
        if(error){
          message.error(error.message)
          return;
        }
    }
    fetchInPatient();
  }, [])

  const [data, setData] = React.useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('outpatient').select(); // ! query based on equal DeptCode
      if (data) setData(data);

      if (error) {
        message.error(error.message);
        return;
      }
    };

    fetchData();
  }, [])

  const fetchDeparment = async () => {
    const { data, error } = await supabase
      .from('department')
      .select('*,DeanCode(*)');
    if (error) {
      message.error(error.message);
      return;
    }
    if (data) {
      setDepartment(data);
      console.log('Deparment data: ', department);
      const temp = data.map((item) => {
        return {
          value: item?.DeptCode,
          label: item?.Title,
        };
      });
      setOptionDepartment(temp);
    }
  };
  return (
    <>
      <Col className={'mt-2 ml-1 mr-1'}>
        <Card
          title={'OUTPATIENTS INFORMATION'}
          extra={
            <>
              <AddOutpatientModal dataInPatient={dataInPatient} data={[...data]} />

            </>
          }>
          {/* <Tabs
            defaultActiveKey={'active'}
            onChange={() => {}}>
            {items.map((item) => (
              <TabPane
                tab={item.label}
                key={item.key}>
                {item.children}
              </TabPane>
            ))}
          </Tabs> */}
          <OutpatientTable />
        </Card>
      </Col>
    </>
  );
};

export default OutpatientsPage;
