import dayjs from 'dayjs';
import React from 'react';
type TItemTimeProps = {
  timeIn: string;
  timeOut: string;
};
export const ItemTime = ({ timeIn, timeOut }: TItemTimeProps) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <div>
        <span className="font-bold">Admission: </span>
        <span className="font-light">{dayjs(timeIn).format('DD/MM/YYYY')}</span>
      </div>
      <div>
        <span className="font-bold">Discharge : </span>

        <span className="font-light">
          {dayjs(timeOut).format('DD/MM/YYYY')}
        </span>
      </div>
    </div>
  );
};
