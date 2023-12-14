'use client';
import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import TableSkeleton from '../skeleton/TableSkeleton';

interface Props {
  columns: any[];
  dataSource: any[];
  footer?: boolean;
  loading: boolean;
  activeReject?: any;
  activeApprove?: any;
  onRow?: any;
}

export function CustomTable({
  columns,
  dataSource,
  loading,
  onRow,
  activeReject,
  activeApprove,
  footer = false,
}: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const [formatData, setFormatData] = useState<any[]>([]);
  useEffect(() => {
    formatDataSource();
  }, [dataSource]);

  const formatDataSource = () => {
    if (dataSource.length == 0) {
      return;
    }
    const result = dataSource?.map((item, index) => {
      return {
        ...item,
        key: index + 1,
      };
    });
    setFormatData(result);
  };

  const onSelectChange = (newSelectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <TableSkeleton
      columns={columns}
      loading={loading}>
      {footer ? (
        <Table
          onRow={onRow}
          className="cursor-pointer"
          rowSelection={rowSelection}
          pagination={false}
          columns={columns}
          dataSource={[...formatData]}
          scroll={{ x: 1000, y: `calc(100vh - 24.5rem)` }}
          footer={() => {
            return (
              <div className="flex items-center justify-between">
                <div style={{ marginLeft: 8 }}>
                  {hasSelected
                    ? `Đã chọn ${selectedRowKeys.length} yêu cầu`
                    : ''}
                </div>
                <div className="flex gap-[0.5rem]">
                  <Button
                    type="default"
                    className="border border-[#f16f58] text-[#f16f58]"
                    onClick={activeReject}>
                    Từ chối
                  </Button>
                  <Button
                    type="primary"
                    onClick={activeApprove}>
                    Duyệt
                  </Button>
                </div>
              </div>
            );
          }}
        />
      ) : (
        <Table
          onRow={onRow}
          className="cursor-pointer"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={[...formatData]}
          scroll={{ x: 1000, y: `calc(100vh - 21rem)` }}
        />
      )}
    </TableSkeleton>
  );
}
