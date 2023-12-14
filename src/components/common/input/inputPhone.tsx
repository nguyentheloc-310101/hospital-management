import { Form, Input } from 'antd';
import { ReactNode, useState } from 'react';

import { SizeType } from 'antd/es/config-provider/SizeContext';
interface Props {
  name: string;
  label?: string;
  subLabel?: string;
  defaultValue?: string;
  required?: boolean;
  message?: string;
  size?: SizeType;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  suffixIcon?: ReactNode;
  onChange?: any;
}
const InputPhoneNumber = ({
  name,
  label,
  subLabel,
  onChange,
  defaultValue,
  required,
  message,
  size,
  disabled,
  readOnly,
  placeholder,
  suffixIcon,
}: Props) => {
  const style = {
    alignLabel: 'flex items-end mb-[10px] lg:text-[16px] text-[12px] ',
    label: 'mb-0 not-italic font-normal text-md leading-5 text-gray-900',
    subLabel: 'text-xs text-[#B9BDC1] ml-1',
    inputBox:
      `px-3 py-[6px] w-[100%] mt-[-8px] d-block w-100 not-italic font-normal text-base tracking-[0.5px] text-[#36383A] rounded-lg border-solid border-1px border-[#B9BDC1]` +
      (readOnly && ' pointer-events-none'),
    icon: { color: '#36383A', fontSize: 20 },
  };

  function handleOnKeyDown(event: any) {
    const regex = /[0-9]/; // Only allow numeric key presses
    if (event.key !== 'Backspace' && event.key !== 'Delete') {
      if (!regex.test(event.key)) {
        event.preventDefault();
      }
    }
  }

  return (
    <>
      <Form.Item
        name={name}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className="w-[100%] mb-0 not-italic font-normal text-sm leading-5 text-gray-900 relative before:invisible"
        style={readOnly ? { pointerEvents: 'none' } : {}}
        label={
          <div className={style.alignLabel}>
            <span className="d-block">{label}</span>
            <span className={style.subLabel}>{subLabel}</span>
          </div>
        }
        rules={[
          {
            required: required ? true : false,
            message: message,
          },
        ]}>
        <Input
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          size={size}
          className="w-[100%] mt-[-8px] not-italic font-normal text-base tracking-[0.5px] text-[#36383A] rounded-lg border-solid border-1px"
          allowClear={false}
          disabled={disabled}
          suffix={suffixIcon}
          onKeyDown={handleOnKeyDown}
        />
      </Form.Item>
    </>
  );
};

export default InputPhoneNumber;
