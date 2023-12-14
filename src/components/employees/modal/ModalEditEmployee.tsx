import DatePickerV2 from '@/components/common/datepicker/DatePicker';
import InputForm from '@/components/common/input/InputForm';
import InputPhoneNumber from '@/components/common/input/inputPhone';
import { supabase } from '@/services/supabase/supabase-client';
import { Form, Modal, Select } from 'antd'
import message from 'antd/lib/message';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
interface ModalEditEmployeeProps {
    open: boolean;
    setOpen: (e: boolean) => void
    employee: any
}

const ModalEditEmployee = ({ open, setOpen, employee }: ModalEditEmployeeProps) => {
    const [department, setDepartment] = useState<any[]>([])
    useEffect(() => {
        const fetchDepartment = async () => {
            const { data: department, error: errDepartment } = await supabase
                .from('department')
                .select('*');
            if (department) {
                const dataFormat = department.map(item => {
                    return {
                        value: item?.Title,
                        label: item?.DeptCode
                    }
                })
                setDepartment(dataFormat);
            }
            if (errDepartment) {
                message.error(errDepartment.message);

                return;
            }
        }
        fetchDepartment()
    }, [])
    console.log(employee)

    // const dataStart = dayjs(employee?.StartDate).format("DD/MM/YYYY")
    // const birth = dayjs(employee?.Dob).format("DD/MM/YYYY")
    const dataStart = employee?.StartDate
    const birth = employee?.Dob
    console.log(dataStart)
    console.log(birth)
    return (
        <Modal
            title="Edit employee"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
        >
            <Form layout="vertical" initialValues={{ FName: employee?.FName,
                 LName: employee?.LName, 
                //   Dob: employee?.Dob, 
                 Gender: employee?.Gender,
                  address: employee?.Address,
                  DegreeName:employee?.DegreeName,
                DegreeYear:employee?.DegreeYear,
                // StartDate:employee?.StartDate,
                Role:employee?.Role,
                Department:employee?.department.Title
                }} >
                <div className="grid grid-cols-2 gap-[1rem]">
                    <InputForm label={"First name"} name="FName" />
                    <InputForm label={"Last name"} name="LName" />

                </div>
                <div className="grid grid-cols-2 gap-[1rem]"><DatePickerV2 label="Birthdate" name={'Dob'} hasTime={true} defaultValue={birth}/>
                    <Form.Item label="Gender" name="Gender">
                        <Select>
                            <Select options={[{ value: 'Male', label: 'Male' },
                            { value: 'Female', label: 'Female' },]} />
                        </Select>
                    </Form.Item>
                </div>
                <div>
                    <InputForm label={"Address"} name="address" />
                    {/* <InputPhoneNumber label={"PhoneNumber"} name="phoneNumber" /> */}
                    <InputForm label={"Degree "} name="DegreeName" />
                    <InputForm label={"Degree Year"} name="DegreeYear" />
                </div>
                <div className="grid grid-cols-2 gap-[1rem]">
                    <DatePickerV2 label="Start Date " name={'StartDate'} hasTime={true} defaultValue={dataStart}/>
                    <Form.Item label="Role" name='Role'>
                        <Select>
                            <Select options={[{ value: 'Doctor', label: 'Doctor' },
                            { value: 'Nurse', label: 'Nurse' },]} />
                        </Select>
                    </Form.Item>
                </div>
                <Form.Item label="Department" name='Department'>
                    <Select>
                        <Select options={department} />
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalEditEmployee