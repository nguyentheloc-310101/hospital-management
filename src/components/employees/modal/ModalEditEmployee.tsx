import InputForm from '@/components/common/input/InputForm';
import { supabase as subbase } from '@/services/supabase/supabase-client';
import { Button, DatePicker, Form, Modal, Select } from 'antd';
import message from 'antd/lib/message';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
interface ModalEditEmployeeProps {
  open: boolean;
  setOpen: (e: boolean) => void;
  employee: any;
  setData: any;
  data: any[];
}

const ModalEditEmployee = ({
  open,
  setOpen,
  employee,
  setData,
  data,
}: ModalEditEmployeeProps) => {
  const [form] = Form.useForm();
  const formRef = useRef<any>(null);
  const [department, setDepartment] = useState<any[]>([]);

  const dateStart = dayjs(employee?.StartDate).format('YYYY-MM-DD');
  const birth = dayjs(employee?.Dob).format('YYYY-MM-DD');
  const [startDate, setStartDate] = useState<string>(dateStart);
  const [dept, setDept] = useState<string>(employee?.DeptCode);
  const [Dob, setDob] = useState<string>(birth);

  useEffect(() => {
    const fetchDepartment = async () => {
      const { data: department, error: errDepartment } = await subbase
        .from('department')
        .select('*');
      if (department) {
        const dataFormat = department.map((item) => {
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

  const handleEditEmployee = async (value: any) => {
    const employeeInform = {
      UniqueCode: employee.UniqueCode,
      FName: value?.FName,
      LName: value?.LName,
      Gender: value?.Gender,
      Address: value?.Address,
      DegreeName: value?.DegreeName,
      DegreeYear: value?.DegreeYear,
      Role: value?.Role,
      DeptCode: dept,
      Dob: Dob,
      StartDate: startDate,
    };

    const { error } = await subbase
      .from('employee')
      .update([employeeInform])
      .eq('UniqueCode', employee.UniqueCode);
    if (error) {
      message.error(error.message);
      return;
    }
    const idxFind = data.findIndex(
      (item) => item.UniqueCode == employee.UniqueCode
    );
    data[idxFind] = employeeInform;
    setData(data);
    setOpen(false);
  };
  return (
    <Modal
      title="Edit employee"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={() => (
        <>
          <Button
            onClick={() => setOpen(false)}
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
            Save changes
          </Button>
        </>
      )}>
      <Form
        layout="vertical"
        form={form}
        ref={formRef}
        onFinish={handleEditEmployee}
        initialValues={{
          FName: employee?.FName,
          LName: employee?.LName,
          Gender: employee?.Gender,
          Address: employee?.Address,
          DegreeName: employee?.DegreeName,
          DegreeYear: employee?.DegreeYear,
          Role: employee?.Role,
          Department: employee?.DeptCode,
        }}>
        <div className="grid grid-cols-2 gap-[1rem]">
          <InputForm
            label={'First name'}
            name="FName"
          />
          <InputForm
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
              defaultValue={dayjs(birth, 'YYYY-MM-DD')}
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
          {/* <InputPhoneNumber label={"PhoneNumber"} name="phoneNumber" /> */}
          <InputForm
            label={'Degree '}
            name="DegreeName"
          />
          <InputForm
            label={'Degree Year'}
            name="DegreeYear"
          />
        </div>
        <div className="grid grid-cols-2 gap-[1rem] mt-2">
          <Form.Item
            label="Start Date"
            name="StartDate">
            <DatePicker
              onChange={(e: any) => {
                setStartDate(dayjs(e).format('YYYY-MM-DD'));
              }}
              defaultValue={dayjs(dateStart, 'YYYY-MM-DD')}
              format={'YYYY-MM-DD'}
            />
          </Form.Item>
          <Form.Item
            label="Role"
            name="Role">
            <Select>
              <Select
                options={[
                  { value: 'Doctor', label: 'Doctor' },
                  { value: 'Nurse', label: 'Nurse' },
                ]}
              />
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          label="Department"
          name="Department">
          <Select
            options={department}
            onSelect={(e: any) => setDept(e)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditEmployee;
