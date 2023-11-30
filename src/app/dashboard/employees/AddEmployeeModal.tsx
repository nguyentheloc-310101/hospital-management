// AddEmployeeModal.js

import React from 'react';
import { Dropdown, Input, Menu, MenuProps, Modal, Typography } from 'antd';
import { DatePicker } from 'antd/lib';
import { DownOutlined } from '@ant-design/icons';
import useItems from 'antd/es/menu/hooks/useItems';
import { supabase } from '@supabase/auth-ui-shared';

const { Title } = Typography;
//TODO: fix -> gom vao props
  //TODO: lay het record tu supabase ve xong roi console.log ra.

  //TODO: tao zustand (store) luu cac thong tin employee fetch ve./
interface AddEmployeeModalProps {
  open: boolean;
  onCancel: any;
  onOk: any;
  confirmLoading: boolean;
}

const AddEmployeeModal = ({
  open,
  onCancel,
  onOk,
  confirmLoading,
}: AddEmployeeModalProps) => {
  // const [id, setID] = React.useState('');
  const [fname, setFName] = React.useState('');
  const [lname, setLName] = React.useState('');
  const [birthdate, setBirthdate] = React.useState<any | null>(null);
  const [startDate, setStartDate] = React.useState<any | null>(null);
  const [gender, setGender] = React.useState<any | null>(null);
  const [address, setAddress] = React.useState<any | null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState<any | null>('');
  const [degree, setDegree] = React.useState<any | null>(null);
  const [degreeYear, setDegreeYear] = React.useState<any | null>(null);
  const [role, setRole] = React.useState<any | null>(null);
  const [department, setDepartment] = React.useState<any | null>(null);
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

  const roles: MenuProps['items'] = [
    {
      label: 'Doctor',
      key: 'Doctor',
    },
    {
      label: 'Nurse',
      key: 'Nurse',
    },
    {
      label: 'Not stated',
      key: 'notStated',
    },
  ];
  const handleRolesClick = (e: any) => {
    const selectedRole = e.key === 'notStated' ? null : e.key;
    setRole(selectedRole);
  };

  const departments: MenuProps['items'] = [
    {
      label: 'Not stated',
      key: 'notStated',
    },
    {
      label: 'Nursery',
      key: 'Nursery',
    },
    {
      label: 'Patient Services',
      key: 'Patient Services',
    },
    {
      label: 'Elderly Services',
      key: 'Elderly Services',
    },
    {
      label: 'Ophthalmology',
      key: 'Ophthalmology',
    },
    {
      label: 'Neurology',
      key: 'Neurology',
    },
    {
      label: 'Dermatology',
      key: 'Dermatology',
    },
    {
      label: 'Cardiology',
      key: 'Cardiology',
    },
    {
      label: 'Odontology',
      key: 'Odontology',
    },
  ];
  const handleDeparmentClick = (e: any) => {
    const selectedDepartment = e.key === 'notStated' ? null : e.key;
    setDepartment(selectedDepartment);
  };
  return (
    <Modal
      title={'Add employee'}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      okText={'Add'}
      okButtonProps={{ style: { backgroundColor: '#16ABF2' } }}
      confirmLoading={confirmLoading}>
        
      {/*<Title level={5}>ID</Title> // * NO NEED FOR ID 
      <Input
        value={id}
        onChange={(e) => setID(e.target.value)}
        placeholder={'Enter ID'}
      /> */}
      
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
        dropdownRender={()=>(<Menu items={genders} onClick={handleGenderClick}></Menu>)}
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

      <Title level={5}>Degree</Title>
      <Input
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
        placeholder={'Enter degree name'}
      />
      <Title level={5}>Degree Year</Title>
      <Input
        value={degreeYear}
        onChange={(e) => setDegreeYear(e.target.value)}
        placeholder={'Enter degree year'}
      />
      <Title level={5}>Start Date</Title>
      <DatePicker
        size={'large'}
        value={startDate}
        onChange={(date) => {
          setStartDate(date);
        }}></DatePicker>
      <Title level={5}>Role</Title>

      <Dropdown.Button
                
                dropdownRender={()=>(<Menu items={roles} onClick={handleRolesClick}/>)}
                trigger={['click']}
                icon={<DownOutlined/>}
            >
                {role === null ? 'Not Stated' : role || 'Select Role'}
            </Dropdown.Button>

      <Title level={5}>Department Name</Title>
      <Dropdown.Button
                dropdownRender={()=>(<Menu items={departments} onClick={handleDeparmentClick}></Menu>)}
                
                trigger={['click']}
                icon={<DownOutlined/>}
            >
                {department === null ? 'Not Stated' : department || 'Select Role'}
            </Dropdown.Button>
    </Modal>
  );
};

export default AddEmployeeModal;
