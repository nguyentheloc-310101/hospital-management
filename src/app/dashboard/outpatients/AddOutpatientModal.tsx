// AddOutpatientModal.js

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Form, Input, Menu, MenuProps, Modal, Select, Typography, message } from 'antd';
import { DatePicker } from 'antd/lib';
import React, { useEffect, useRef } from 'react';

import { supabase } from '@/services/supabase/supabase-client';
import { generateId } from '@/utils/generate-id';
import { UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd/lib/radio';
import { useState } from 'react';
import dayjs from 'dayjs';
import InputForm from '@/components/common/input/InputForm';
import InputPhoneNumber from '@/components/common/input/inputPhone';

const { Title } = Typography;
interface AddOutpatientModalProps {
  dataInPatient: any,


  data: any[];

}

const AddOutpatientModal = ({ data, dataInPatient }: AddOutpatientModalProps) => {
  const [opCode, setOPCode] = React.useState('');
  const [fname, setFName] = React.useState('');
  const [lname, setLName] = React.useState('');
  const [birthdate, setBirthdate] = React.useState<any | null>(null);
  const [gender, setGender] = React.useState<any | null>(null);
  const [address, setAddress] = React.useState<any | null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState<any | null>('');
  const [department, setDepartment] = useState<any[]>([]);
  const [insertError, setInsertError] = React.useState<any | null>(null);
  const [form] = Form.useForm();
  const [startDate, setStartDate] = useState<string>('');
  const [dept, setDept] = useState<string>('');
  const [Dob, setDob] = useState<string>('');
  const formRef = useRef<any>(null);

  const genders: MenuProps['items'] = [
    {
      label: 'Male',
      key: 'Male',
    },
    {
      label: 'Female',
      key: 'Female',
    },
    {
      label: 'Not stated',
      key: 'notStated',
    },
  ];
  const handleGenderClick = (e: any) => {
    const selectedGender = e.key === 'notStated' ? null : e.key;
    setGender(selectedGender);
  };

  ;

  //! fetch department data

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSubmit = async (value:any) => {
    if(Dob==""){
      message.error('dont let Day of birth null')
      return;
    }
    else {
      const { data, error } = await supabase
        .from('outpatient')
        .insert([
          {
            UniqueCode: generateId(),
            OPCode: value?.OPCode,
            FName: value?.FName,
            LName: value?.LName,
            Dob: Dob,
            Gender: value?.Gender,
            Address: value?.Address,
            Phone: value?.phoneNumber,
  
          },
  
          // { DeptCode: department}
        ])

      console.log(data);
  
      if (error) {
        console.log(error);
        message.error(error.message)
      
        return;
      }
   message.success('create success');
      setModalVisible(false);
      setConfirmLoading(false);
    }
    
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };



  useEffect(() => {
    const fetchDepartment = async () => {
      const { data: department, error: errDepartment } = await supabase
        .from('department')
        .select('*');
      if (department) {
        const dataFormat = department.map((item: any) => {
          return {
            value: item?.DeptCode,
            label: item?.Title,
          };
        });
        setDepartment(dataFormat);
      }
      if (errDepartment) {
        message.error(errDepartment.message);
        return;
      }
    };
    fetchDepartment();
  }, []);

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}>
        {<UserAddOutlined />} Add Outpatient
      </Button>
      {/* <Modal
        title={'Add outpatient'}
        open={modalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText={'Add'}
        okButtonProps={{ style: { backgroundColor: '#16ABF2' } }}
        confirmLoading={confirmLoading}>
        <Title level={5}>OP Code</Title>
        <Input
          value={opCode}
          onChange={(e) => setOPCode(e.target.value)}
          placeholder={'Enter OPCode'}
        />
        <Title level={5}>First Name</Title>
        <Input
          value={fname}
          onChange={(e) => setFName(e.target.value)}
          placeholder={'Enter first name'}
        />
        <Title level={5}>Last Name</Title>
        <Input
          value={lname}
          onChange={(e) => setLName(e.target.value)}
          placeholder={'Enter last name'}
        />
        <Title level={5}>Birthdate</Title>
        <DatePicker
          size={'large'}
          value={birthdate}
          onChange={(date) => {
            setBirthdate(date);
          }}></DatePicker>
        <Title level={5}>Gender</Title>

        <Dropdown.Button
          dropdownRender={() => (
            <Menu
              items={genders}
              onClick={handleGenderClick}></Menu>
          )}
          trigger={['click']}
          icon={<DownOutlined />}>
          {gender === null ? 'Not Stated' : gender || 'Select Gender'}
        </Dropdown.Button>

        <Title level={5}>Address</Title>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={'Enter address'}
        />
        <Title level={5}>Phone</Title>
        <Input
          placeholder={'Enter phone number'}
          value={phoneNumber}
          onChange={(phoneNumber) => {
            setPhoneNumber(phoneNumber.target.value);
          }}></Input>
      </Modal> */}

      <Modal
        title="Add OutPatient"
        centered
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={() => (
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => setModalVisible(false)}
              type="default">
              cancel
            </Button>
            <Button
              onClick={() => {
                if (formRef.current) {
                  formRef.current.submit();
                }
              }}
              type="primary"
              className="bg-[#169fed]">
              Create
            </Button>
          </div>
        )}>
        <Form
          layout="vertical"
          form={form}
          ref={formRef}
        onFinish={ handleSubmit}
        >
          <InputForm
            required
            label={'OP Code'}
            name="OPCode"
          />
          <div className="grid grid-cols-2 gap-[1rem]">
            <InputForm
              required
              label={'First name'}
              name="FName"
            />
            <InputForm
              required
              label={'Last name'}
              name="LName"
            />
          </div>
          <div className="grid grid-cols-2 gap-[1rem] mt-2">
            <Form.Item
              label="Date of Birth"
              name="Dob">
              <DatePicker
                onChange={(e: any) => {
                  setDob(dayjs(e).format('YYYY-MM-DD'));
                }}
                format={'YYYY-MM-DD'}
              />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="Gender">
              <Select
                options={[
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <InputForm
              label={'Address'}
              name="Address"
            />
<InputPhoneNumber label={'Phone'} name={'phoneNumber'}/>
          </div>
         

        </Form>
      </Modal>
    </>
  );
};

export default AddOutpatientModal;
