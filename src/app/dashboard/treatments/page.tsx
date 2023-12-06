'use client';
import HeaderTreatment from '@/components/treatments/header/HeaderTreatment';
import TableTreatment from '@/components/treatments/table/TableTreatment';
import DetailSection from '@/components/treatments/table/details/DetailSection';
import { supabase } from '@/services/supabase/supabase-client';
import useTreatment from '@/stores/treatment';
import { message } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TreatmentPage = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const detailStatus = searchParams.get('detail');
  const currentId = searchParams.get('treatment_id');
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
        .select('*,DCode(*,DeptCode(*))');
      if (errTreats) {
        message.error(errTreats.message);
        setLoading(false);
        return;
      }
      if (allTreats) {
        /***fetch all treatments in treatment table***/
        const { data: allTreatments, error } = await supabase
          .from('treatment')
          .select('*,PCode(*,NCode(*))');
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

  const   filterTreatCode = (dataTreat: any, dataTreatment: any[]) => {
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
  const onChangeRow = (id: string) => {
    if (detailStatus == 'true' && currentId == id) {
      router.push('/dashboard/treatments');
    } else {
      const url: any = `${currentPath}?treatment_id=${id}&detail=true`;
      router.push(url);
    }
  };
  return (
    <div
      className={`grid ${
        detailStatus == 'true' ? 'grid-cols-2' : 'grid-cols-1'
      } gap-[0.5rem] h-full`}>
      <div>
        <HeaderTreatment />
        <div id="table_treatment">
          <TableTreatment
            onChangeRow={onChangeRow}
            dataSource={dataSource}
            loading={loading}
          />
        </div>
      </div>
      {detailStatus == 'true' && <DetailSection />}
    </div>
  );
};

export default TreatmentPage;
