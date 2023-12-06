'use client';
import HeaderTreatment from '@/components/treatments/header/HeaderTreatment';
import TableTreatment from '@/components/treatments/table/TableTreatment';
import { supabase } from '@/services/supabase/supabase-client';
import useTreatment from '@/stores/treatment';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';

const TreatmentPage = () => {
  const { setAllTreatment } = useTreatment();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDataTreat();
  }, []);
  //fetch all treatment
  const fetchDataTreat = async () => {
    setLoading(true);
    try {
      //fetch all data treatment_use//
      const { data: allTreatUse, error: errTreatUse } = await supabase
        .from('treatment_use')
        .select('*,medication(*)');

      if (errTreatUse) {
        message.error(errTreatUse.message);
        setLoading(false);
        return;
      }
      //fetch all data treat//
      const { data: allTreats, error: errTreats } = await supabase
        .from('treat')
        .select('*,DCode(*)');
      if (errTreats) {
        message.error(errTreats.message);
        setLoading(false);
        return;
      }
      if (allTreats) {
        /***fetch all treatments in treatment table***/
        const { data: allTreatments, error } = await supabase
          .from('treatment')
          .select('*,PCode(*)');
        if (error) {
          message.error(error.message);
          setLoading(false);
          return;
        }
        if (allTreatments) {
          const finalData = allTreats.map((item: any) => {
            return {
              doctor: item.DCode,
              treatment: filterTreatCode(item, allTreatments),
              medication: filterMedicationCode(item, allTreatUse),
            };
          });
          setDataSource(finalData);
          setAllTreatment(finalData);
          console.log('finalData', finalData);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const filterTreatCode = (dataTreat: any, dataTreatment: any[]) => {
    const treatCodeFilter = dataTreatment.filter(
      (item: any) => item.TreatCode == dataTreat.TreatCode
    );
    if (treatCodeFilter.length > 0) {
      return treatCodeFilter[0];
    } else return [];
  };

  const filterMedicationCode = (dataTreat: any, dataMedication: any[]) => {
    const medicationCodeFilter = dataMedication.filter(
      (item: any) => item.TreatCode == dataTreat.TreatCode
    );
    if (medicationCodeFilter.length > 0) {
      return medicationCodeFilter[0];
    } else return [];
  };

  return (
    <div className="flex flex-col gap-[0.5rem]">
      <HeaderTreatment />
      <TableTreatment
        dataSource={dataSource}
        loading={loading}
      />
    </div>
  );
};

export default TreatmentPage;
