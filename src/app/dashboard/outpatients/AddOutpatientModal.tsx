// AddOutpatientModal.js

import React from 'react';
import { Alert, Dropdown, Flex, Input, Menu, MenuProps, Modal, Typography } from 'antd';
import { DatePicker } from 'antd/lib';
import { DownOutlined } from '@ant-design/icons';

import { useState } from 'react';
import { Button } from 'antd/lib/radio';
import { UserAddOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/services/supabase/supabase-client';
import {Select} from 'antd';
import { generateId } from '@/utils/generate-id';

const { Title } = Typography;
//TODO: fix -> gom vao props
//TODO: lay het record tu supabase ve xong roi console.log ra.

//TODO: tao zustand (store) luu cac thong tin Outpatient fetch ve./
interface AddOutpatientModalProps {
  optionSelect: any[],
}

const AddOutpatientModal = ({ optionSelect }: AddOutpatientModalProps) => {

  const [opCode, setOPCode] = React.useState('');
  const [fname, setFName] = React.useState('');
  const [lname, setLName] = React.useState('');
  const [birthdate, setBirthdate] = React.useState<any | null>(null);
  const [gender, setGender] = React.useState<any | null>(null);
  const [address, setAddress] = React.useState<any | null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState<any | null>('');
  // const [admissionDate, setAdmissionDate] = React.useState<any | null>(null);
  // const [dateOfDischarge, setDateOfDischarge] = React.useState<any | null>(null);
  // const [sickRoom, setSickRoom] = React.useState<any | null>(null);
  // const [fee, setFee] = React.useState<any | null>(null);
  // const [nCode, setNCode] = React.useState<any | null>(null);
  // const [diagnosis, setDiagnosis] = React.useState<any | null>(null);
  const [insertError, setInsertError] = React.useState<any | null>(null);
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

  // const roles: MenuProps['items'] = [
  //   {
  //     label: 'Doctor',
  //     key: 'Doctor',
  //   },
  //   {
  //     label: 'Nurse',
  //     key: 'Nurse',
  //   },
  //   {
  //     label: 'Not stated',
  //     key: 'notStated',
  //   },
  // ];
  // const handleRolesClick = (e: any) => {
  //   const selectedRole = e.key === 'notStated' ? null : e.key;
  //   setRole(selectedRole);
  // };
  
  //! fetch department data 
 

  

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleSubmit = async () => {


    if (!fname) //in case of inserting null to non null
    {
      setInsertError("First name or id cannot be set blank")
      console.log(insertError)
      return
    }


    const { data, error } = await supabase
      .from('outpatient')
      .insert([
        {
          UniqueCode: generateId(),
          OPCode: opCode,
          FName: fname,
          LName: lname,
          Dob: birthdate,
          Gender: gender,
          Address: address,
          Phone: phoneNumber,
          // AdmissionDate: admissionDate,
          // DateOfDischarge: dateOfDischarge,
          // SickRoom: sickRoom,
          // Fee: fee,
          // NCode: nCode,
          // Diagnosis: diagnosis,
        },
        // { FName: fname },
        // { LName: lname},
        // { Dob: birthdate},
        // { Gender: gender},
        // { Address: address},
        // { DegreeName:degree},
        // { DegreeYear:degreeYear},
        // { StartDate: startDate},
        // { Role: role},
        // { DeptCode: department}

      ])
      .select()
    console.log(data)

    if (error) {
      console.log(error)
      setInsertError(error)

    }
    if (data) {
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
      handleSubmit()
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
        {<UserAddOutlined />} Add Outpatient
      </Button>
      <Modal
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
          dropdownRender={() => (<Menu items={genders} onClick={handleGenderClick}></Menu>)}
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
      </Modal>
    </>
  );
};

export default AddOutpatientModal;
