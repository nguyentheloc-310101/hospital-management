// AddEmployeeModal.js

import React from 'react';
import { Alert, Dropdown, Input, Menu, MenuProps, Modal, Typography } from 'antd';
import { DatePicker } from 'antd/lib';
import { DownOutlined } from '@ant-design/icons';

import { useState } from 'react';
import { Button } from 'antd/lib/radio';
import { UserAddOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/services/supabase/supabase-client';
const { Title } = Typography;
//TODO: fix -> gom vao props
  //TODO: lay het record tu supabase ve xong roi console.log ra.

  //TODO: tao zustand (store) luu cac thong tin employee fetch ve./


const AddEmployeeModal = () => {

  const [id, setID] = React.useState('');
  
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
  const [insertError,setInsertError] = React.useState<any|null>(null);
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

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleSubmit = async (e:any)=>
  {
     

      if(!fname || !id) //in case of inserting null to non null
      {
          setInsertError("First name or id cannot be set blank")
          console.log(insertError)
          return
      }
      
      const {data, error} = await supabase
      .from('emeployee')
      .update({fname,lname,birthdate,gender,address,degree,degreeYear,startDate,role, department})
      .select()

      if(error)
      {
        console.log(error)
        setInsertError(error)

      }
      if(data)
      {
          console.log(data)
          setInsertError(null)
          handleCancel()
      }

  }
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setModalVisible(false);
      setConfirmLoading(false);
      handleSubmit("")
      // This is where to handle the adding states to the database.
    }, 2000);
    
  
  };
  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Button
      
        type="primary"
        onClick={showModal}
        
      >
        {<UserAddOutlined/>} Add Employee
      </Button>
    <Modal
      title={'Add employee'}
      open={modalVisible}
      onCancel={handleCancel}
      onOk={handleOk}
      okText={'Add'}
      okButtonProps={{ style: { backgroundColor: '#16ABF2' } }}
      confirmLoading={confirmLoading}>
        
      <Title level={5}>ID</Title> 
      {
        insertError && (
          <Alert message={insertError} type='error'></Alert>
        )
      }
      <Input
        value={id}
        onChange={(e) => setID(e.target.value)}
        placeholder={'Enter ID'}
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
                {department === null ? 'Not Stated' : department || 'Select Department'}
            </Dropdown.Button>
    </Modal>
    </>
  );
};

export default AddEmployeeModal;
