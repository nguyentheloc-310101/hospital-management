import React from 'react';
type TItemDoctorProps = {
  nurse_name: string;
  doctor_name: string;
};
export const ItemDoctor = ({ nurse_name, doctor_name }: TItemDoctorProps) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <div>
        <span className="font-bold">Doctor: </span>

        <span className="font-light">{doctor_name}</span>
      </div>
      <div>
        <span className="font-bold">Nurse : </span>

        <span className="font-light">{nurse_name}</span>
      </div>
    </div>
  );
};
