import { Card, Divider, Input, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SearchOutlined } from '@ant-design/icons';
import { ItemInfo } from '../item';
import { useRouter, useSearchParams } from 'next/navigation';
import { DetailsTreatmentProps } from '@/types/props';
import dayjs from 'dayjs';

const DetailSection = ({ dataSource }: DetailsTreatmentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const treatment_id = searchParams.get('treatment_id');
  const [treatmentQuery, setTreatmentQuery] = useState<any>();
  const [departures, setDepartures] = useState<any>();
  useEffect(() => {
    if (treatment_id == '') {
      return;
    }
    const findVisitorById = dataSource.findIndex(
      (item) => item?.treatment?.TreatCode == treatment_id
    );
    if (findVisitorById == -1) {
      return;
    }
    console.log('dataSource[findVisitorById]:', dataSource[findVisitorById]);

    setTreatmentQuery(dataSource[findVisitorById]);
  }, [dataSource, treatment_id]);
  const onHandleCloseDetails = () => {
    router.push('/dashboard/treatments');
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
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-[1rem]">
          <Card
            bordered={true}
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
                label={'Doctor name'}
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
                info={treatmentQuery?.doctor?.DeptCode?.Title}
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
      </div>
    </div>
  );
};

export default DetailSection;
