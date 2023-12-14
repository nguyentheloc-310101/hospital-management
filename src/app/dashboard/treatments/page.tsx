'use client';
import HeaderTreatment from '@/components/treatments/header/HeaderTreatment';
import TableTreatment from '@/components/treatments/table/TableTreatment';
import DetailSection from '@/components/treatments/table/details/DetailSection';
import { supabase } from '@/services/supabase/supabase-client';
import useDepartment from '@/stores/departments';
import useTreatment from '@/stores/treatment';
import { SearchOutlined } from '@ant-design/icons';
import { Card, Input, message } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TreatmentPage = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const detailStatus = searchParams.get('detail');
  const currentId = searchParams.get('treatment_id');
  const { allTreatment, setAllTreatment } = useTreatment();
  const { setAllDepartment } = useDepartment();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDataTreat();
  }, []);
  //fetch all treatment
  const fetchDataTreat = async () => {
    setLoading(true);
    try {
      //fetch all departments data

      const { data: department, error: errDepartment } = await supabase
        .from('department')
        .select('*');
      if (department) {
        setAllDepartment(department);
      }
      if (errDepartment) {
        message.error(errDepartment.message);
        setLoading(false);
        return;
      }
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

  const handleSearch = (input: string) => {
    setLoading(true);
    const pattern = new RegExp(input, 'i');
    const tmp = allTreatment.filter((item: any) => {
      return pattern.test(
        item.treatment.PCode?.LName +
          item.treatment.PCode?.FName +
          item.treatment.PCode?.Phone +
          item.treatment?.PCode +
          item.doctor?.UniqueCode +
          item.doctor?.LName +
          item.doctor?.FName
      );
    });
    setLoading(false);
    setDataSource(tmp);
  };
  return (
    <div
      className={`grid ${
        detailStatus == 'true' ? 'grid-cols-2' : 'grid-cols-1'
      } gap-[0.5rem] h-[86vh]`}>
      <div>
        {/* <HeaderTreatment /> */}
        <div>
          <Card className="flex items-center justify-between rounded-b-[0px]">
            <div className="">
              <Input
                className="lg:w-[360px]"
                placeholder="Search by patient name/ID, sick room, or diagnosis"
                onChange={(e: any) => {
                  handleSearch(e?.target?.value);
                }}
                suffix={<SearchOutlined />}
              />
            </div>
            <div></div>
          </Card>
        </div>
        <div id="table_treatment">
          <TableTreatment
            onChangeRow={onChangeRow}
            dataSource={[...dataSource]}
            loading={loading}
          />
        </div>
      </div>
      {detailStatus == 'true' && <DetailSection dataSource={[...dataSource]} />}
    </div>
  );
};

export default TreatmentPage;
