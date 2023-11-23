import HeaderTreatment from '@/components/treatments/header/HeaderTreatment';
import TableTreatment from '@/components/treatments/table/TableTreatment';
import React from 'react';

const TreatmentPage = () => {
  return (
    <div className="flex flex-col gap-[0.5rem]">
      <HeaderTreatment />
      <TableTreatment />
    </div>
  );
};

export default TreatmentPage;
