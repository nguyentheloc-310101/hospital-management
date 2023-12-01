'use client';
import HeaderTreatment from '@/components/treatments/header/HeaderTreatment';
import TableTreatment from '@/components/treatments/table/TableTreatment';
import { supabase } from '@/services/supabase/supabase-client';
import useTreatment from '@/stores/treatment';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';

const TreatmentPage = () => {
  const [dataTreatment, setDataTreatment] = useState<any[]>([]);
  const [dataInPatient, setDataInpatient] = useState<any[]>([]);
  const [dataDoctor, setDataDoctor] = useState<any[]>([]);

  const { setAllTreatment } = useTreatment();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDataTreatment();
    fetchDataInpatient();
    fetchDataDoctor();
  }, []);
  //fetch all treatment
  const fetchDataTreatment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('treatment').select('*');
      if (error) {
        message.error('error fetching data treatment');
        setLoading(false);
        return;
      }
      if (data) {
        setAllTreatment(data);
        setDataTreatment(data);
        console.log('treatment', data);
      }
    } finally {
      setLoading(false);
    }
  };
  //fetch all inPatient
  const fetchDataInpatient = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('inpatient').select('*');
      if (error) {
        message.error('error fetching data inpatient');
        setLoading(false);
        return;
      }
      if (data) {
        setDataInpatient(data);
        console.log('inpatient', data);
      }
    } finally {
      setLoading(false);
    }
  };

  //fetch all doctors
  const fetchDataDoctor = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('employee')
        .select('*')
        .eq('Role', 'Doctor');
      if (error) {
        message.error('error fetching data doctors');
        setLoading(false);
        return;
      }
      if (data) {
        setDataDoctor(data);
        console.log('doctors', data);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-[0.5rem]">
      <HeaderTreatment />
      <TableTreatment
        dataSource={[]}
        loading={loading}
      />
    </div>
  );
};

export default TreatmentPage;
