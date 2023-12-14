import React from 'react';

import { Form, Input } from 'antd';
 interface InputFormProps {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: any;
  required?: boolean;
  classNameInput?: string;
  message?: string;
  size?: string;
  type?: string;
  onChange?: (value: any) => void;
}

const InputForm = (props: InputFormProps) => {
  const {
    label,
    name,
    required = false,
    message = '',
    placeholder,

    type,
    size = 'large',
    value,
    onChange,
  } = props;

  return (
    <Form.Item
      className="w-[100%] mb-0 font-normal  leading-5 text-gray-900 relative before:invisible"
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: message != '' ? message : 'Hãy nhập ' + label,
        },
      ]}>
      <Input
        size={size as any}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        className="w-[100%]  text-[#36383A] rounded-lg border-solid border"
      />
    </Form.Item>
  );
};

export default InputForm;
