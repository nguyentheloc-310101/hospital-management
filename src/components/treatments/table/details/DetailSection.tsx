import { Card, Divider, Input, Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SearchOutlined } from '@ant-design/icons';
import { ItemInfo } from '../item';
import { useRouter, useSearchParams } from 'next/navigation';
import { DetailsTreatmentProps } from '@/types/props';
import dayjs from 'dayjs';
import useDepartment from '@/stores/departments';
import { IDepartment } from '@/types/interfaces';
import { supabase } from '@/services/supabase/supabase-client';
import { numberFormatComma, numberFormatDot } from '@/utils/helpers';

const DetailSection = ({ dataSource }: DetailsTreatmentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const treatment_id = searchParams.get('treatment_id');
  const { allDepartments } = useDepartment();
  const [treatmentQuery, setTreatmentQuery] = useState<any>();
  const [departureNurse, setDepartureNurse] = useState<string>('');
  const [patientExam, setPatientExam] = useState<any>();
  const [patientBatch, setPatientBatch] = useState<any>();

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const fetchDetail = async () => {
      if (treatment_id == '') {
        return;
      }
      const findVisitorById = dataSource.findIndex(
        (item) => item?.treatment?.TreatCode == treatment_id
      );
      if (findVisitorById == -1) {
        return;
      }
      const tmpDeptCodeNurse = findDept(
        dataSource[findVisitorById].treatment?.PCode?.NCode?.DeptCode
      );

      await fetchBatchByBCode(dataSource[findVisitorById]?.medication?.BCode);
      await fetchExaminationByPCode(
        dataSource[findVisitorById]?.medication?.PCode
      );

      setDepartureNurse(tmpDeptCodeNurse);
      setTreatmentQuery(dataSource[findVisitorById]);
      setLoading(false);
    };
    fetchDetail();
  }, [dataSource, treatment_id]);
  const onHandleCloseDetails = () => {
    router.push('/dashboard/treatments');
  };
  const findDept = (id: string) => {
    if (allDepartments.length == 0) {
      return '';
    }
    const result = allDepartments?.filter(
      (item: IDepartment) => item?.DeptCode
    );
    if (result.length > 0) {
      return result[0].Title;
    } else {
      return '';
    }
  };

  const fetchBatchByBCode = async (BCode: string) => {
    const { data: batch, error } = await supabase
      .from('batch')
      .select('*,ProCode(*)')
      // Filters
      .eq('BCode', BCode);
    if (error) {
      message.error(error.message);
      return [];
    }
    if (batch) {
      console.log('batch', batch);
      setPatientBatch(batch[0]);
    }
  };
  const fetchExaminationByPCode = async (id: string) => {
    const { data: examination, error } = await supabase
      .from('examination')
      .select('*,DCode(*)')

      // Filters
      .eq('PCode', id);
    if (error) {
      message.error(error.message);
      return [];
    }
    if (examination) {
      console.log('examination', examination);

      setPatientExam(examination[0]);
    }
  };
  return (
    <div className="flex  flex-col overflow-y-hidden ">
      <Card
        className="w-full flex items-center justify-between pb-2 rounded-b-[0px]"
        title={<div className="text-[24px] font-[700]">Treatment Details</div>}>
        <div onClick={onHandleCloseDetails}>
          <XMarkIcon className="h-6 w-6  cursor-pointer" />
        </div>
      </Card>
      <div className="bg-white rounded-[8px] mt-2  p-3 overflow-y-scroll  rounded-t-[0px]">
        <div className="text-[2rem] font-bold text-[blue]">
          Basic information
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-[1rem]">
          <Card
            bordered={true}
            loading={loading}
            className="border-[2px]"
            bodyStyle={{ padding: '1rem' }}>
            <div className="flex gap-[1rem] items-center">
              <div className="text-[18px] font-[700]">Patient Information</div>
            </div>

            <div className="mt-[1.5rem]">
              <ItemInfo
                label={'Patient ID'}
                info={
                  <div className="text-[blue]">
                    #{treatmentQuery?.treatment?.PCode?.UniqueCode}
                  </div>
                }
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'In-Patient ID'}
                info={
                  <div className="text-[blue]">
                    #{treatmentQuery?.treatment?.PCode?.IPCode}
                  </div>
                }
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'Patient name'}
                info={
                  <div className="">
                    {treatmentQuery?.treatment?.PCode?.FName +
                      ' ' +
                      treatmentQuery?.treatment?.PCode?.LName}
                  </div>
                }
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'Phone number'}
                info={
                  <div className="">
                    {treatmentQuery?.treatment?.PCode?.Phone}
                  </div>
                }
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'Gender'}
                info={treatmentQuery?.treatment?.PCode?.Gender}
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'Date of birth'}
                info={dayjs(treatmentQuery?.treatment?.PCode?.Dob).format(
                  'DD/MM/YYYY'
                )}
              />
            </div>
          </Card>
          <Card
            bordered={true}
            loading={loading}
            className="border-[2px]"
            bodyStyle={{ padding: '1rem' }}>
            <div className="flex gap-[1rem] items-center">
              <div className="text-[18px] font-[700]">Doctor Information</div>
            </div>

            <div className="mt-[1.5rem]">
              <ItemInfo
                label={'Doctor ID'}
                info={
                  <div className="text-[blue]">
                    #{treatmentQuery?.doctor?.UniqueCode}
                  </div>
                }
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'Doctor name'}
                info={
                  <div className="">
                    {treatmentQuery?.doctor?.FName +
                      ' ' +
                      treatmentQuery?.doctor?.LName +
                      ', ' +
                      treatmentQuery?.doctor?.DegreeYear +
                      ' years exp'}
                  </div>
                }
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'Majority'}
                info={treatmentQuery?.doctor?.DegreeName}
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'Departure'}
                info={treatmentQuery?.doctor?.DeptCode?.Title}
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'Gender'}
                info={treatmentQuery?.doctor?.Gender}
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'Start date working'}
                info={
                  <div>
                    {dayjs(treatmentQuery?.doctor?.StartDate).format(
                      'DD/MM/YYYY'
                    )}
                  </div>
                }
              />
            </div>
          </Card>
          <Card
            bordered={true}
            loading={loading}
            className="border-[2px]"
            bodyStyle={{ padding: '1rem' }}>
            <div className="flex gap-[1rem] items-center">
              <div className="text-[18px] font-[700]">Nurse Information</div>
            </div>

            <div className="mt-[1.5rem]">
              <ItemInfo
                label={'Nurse ID'}
                info={
                  <div className="text-[blue]">
                    #{treatmentQuery?.treatment?.PCode?.NCode?.UniqueCode}
                  </div>
                }
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'Nurse name'}
                info={
                  <div className="">
                    {treatmentQuery?.treatment?.PCode?.NCode?.FName +
                      ' ' +
                      treatmentQuery?.treatment?.PCode?.NCode?.LName}
                  </div>
                }
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'Address'}
                info={treatmentQuery?.treatment?.PCode?.NCode?.Address}
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'Departure'}
                info={departureNurse}
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'Gender'}
                info={treatmentQuery?.treatment?.PCode?.NCode?.Gender}
              />
              <Divider className="my-[10px]" />
              <ItemInfo
                label={'Start date working'}
                info={
                  <div>
                    {dayjs(
                      treatmentQuery?.treatment?.PCode?.NCode?.StartDate
                    ).format('DD/MM/YYYY')}
                  </div>
                }
              />
            </div>
          </Card>
        </div>
        <Divider className="my-[10px]" />
        <div className="text-[2rem] font-bold text-[blue]">
          Treatment information
        </div>
        <Card
          bordered={true}
          loading={loading}
          className="border-[2px] mt-[1rem]"
          bodyStyle={{ padding: '1rem' }}>
          <div className="flex gap-[1rem] items-center">
            <div className="text-[18px] font-[700]">Examination</div>
          </div>
          <div className="mt-[1.5rem]">
            <ItemInfo
              label={'Treatment ID'}
              info={
                <div className="text-[blue]">
                  #{treatmentQuery?.treatment?.TreatCode}
                </div>
              }
            />
            <Divider className="my-[10px]" />
            <ItemInfo
              label={'Admission Date: '}
              info={
                <div>
                  {dayjs(
                    treatmentQuery?.treatment?.PCode?.AdmissionDate
                  ).format('DD/MM/YYYY')}
                </div>
              }
            />
            <Divider className="my-[10px]" />
            <ItemInfo
              label={'Discharge Date: '}
              info={
                <div>
                  {dayjs(
                    treatmentQuery?.treatment?.PCode?.DateOfDischarge
                  ).format('DD/MM/YYYY')}
                </div>
              }
            />
            <Divider className="my-[10px]" />
            <ItemInfo
              label={'Room patient stay: '}
              info={'Room ' + treatmentQuery?.treatment?.PCode?.SickRoom}
            />
            <Divider className="my-[10px]" />
            <ItemInfo
              label={'Diagnosis: '}
              info={treatmentQuery?.treatment?.PCode?.Diagnosis}
            />{' '}
            <Divider className="my-[10px]" />
            <div className="flex gap-[1rem] items-center mt-[1rem]">
              <div className="text-[18px] font-[700]">Treatment</div>
            </div>
          </div>
          <div className="mt-[1rem] grid lg:grid-cols-2 grid-cols-1 gap-[1rem]">
            <Card
              bordered={true}
              loading={loading}
              className="border-[2px] mb-[1rem]"
              bodyStyle={{ padding: '1rem' }}>
              <div className="flex gap-[1rem] items-center">
                <div className="text-[18px] font-[700]">Medicine</div>
              </div>
              <div className="mt-[1.5rem]">
                <ItemInfo
                  label={'Medicine name: '}
                  info={treatmentQuery?.medication?.medication?.Name}
                />
                <Divider className="my-[10px]" />
                <ItemInfo
                  label={'Package: '}
                  info={
                    treatmentQuery?.medication?.Quantity +
                    ' ' +
                    treatmentQuery?.medication?.Unit
                  }
                />
                <Divider className="my-[10px]" />
                <ItemInfo
                  label={'Effects: '}
                  info={treatmentQuery?.medication?.medication?.Effects}
                />
                <Divider className="my-[10px]" />
                <ItemInfo
                  label={'Expired date: '}
                  info={dayjs(
                    treatmentQuery?.medication?.medication?.ExpirationDate
                  ).format('DD/MM/YYYY')}
                />
              </div>
            </Card>
            <Card
              bordered={true}
              loading={loading}
              className="border-[2px] mb-[1rem]"
              bodyStyle={{ padding: '1rem' }}>
              <div className="flex gap-[1rem] items-center">
                <div className="text-[18px] font-[700]">Medicine Provider</div>
              </div>
              <div className="mt-[1.5rem]">
                <ItemInfo
                  label={'Provider name: '}
                  info={patientBatch?.ProCode?.Name}
                />
                <Divider className="my-[10px]" />
                <ItemInfo
                  label={'Provider Phone: '}
                  info={patientBatch?.ProCode?.ProPhone}
                />
                <Divider className="my-[10px]" />
                <ItemInfo
                  label={'Provider Adrress: '}
                  info={patientBatch?.ProCode?.Address}
                />
                <Divider className="my-[10px]" />

                <ItemInfo
                  label={'Imported Date: '}
                  info={dayjs(patientBatch?.ImportedDate).format('DD/MM/YYYY')}
                />
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DetailSection;
