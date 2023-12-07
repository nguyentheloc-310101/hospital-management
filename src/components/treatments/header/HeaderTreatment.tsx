import { SearchOutlined } from '@ant-design/icons';
import { Card, Input } from 'antd';
import React from 'react';

const HeaderTreatment = () => {
  return (
    <div>
      <Card className="flex items-center justify-between rounded-b-[0px]">
        <div className="">
          <Input suffix={<SearchOutlined />} />
        </div>
        <div></div>
      </Card>
    </div>
  );
};

export default HeaderTreatment;
