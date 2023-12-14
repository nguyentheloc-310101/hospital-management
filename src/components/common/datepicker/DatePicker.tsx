import { Form, DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
 interface DatePickerFormProps {
  name: string;
  label?: string;
  subLabel?: string;
  value?: any;
  required?: boolean;
  message?: string;
  size?: SizeType;
  defaultValue?: string;
  onChange?: any;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  hasTime?: boolean;
}

const DatePickerV2 = ({
  name,
  label,
  subLabel,
  value,
  required,
  message,
  size,
  disabled,
  readOnly,
  onChange,

  hasTime = false,
  placeholder,
}: DatePickerFormProps) => {
  let nowHour = dayjs().hour();
  let nowMins = dayjs().minute();
  const style = {
    alignLabel: 'flex items-end mb-[8px] lg:text-[16px] text-[12px]',
    label: 'mb-0 not-italic font-normal text-md leading-5 text-gray-900',
    subLabel: 'text-xs text-[#B9BDC1] ml-1',
    inputBox:
      'px-3 py-[6px] w-[100%] mt-[-8px] d-block w-100 not-italic h-[40px] font-normal text-base tracking-[0.5px] text-[#36383A] rounded-lg border-solid border-1px ',
    icon: { color: '#36383A', fontSize: 20 },
  };
  style.inputBox = style.inputBox + (readOnly ? ' pointer-events-none' : '');
  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    const now = new Date();
    const oneMinuteBefore = new Date(now.getTime() - 60000);

    return current && current < dayjs(oneMinuteBefore);
  };

  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(0, nowHour),
    disabledMinutes: () => range(0, nowMins),
    // disabledSeconds: () => [55, 56],
  });

  return (
    <>
      <Form.Item
        name={name}
        className="w-[100%] mb-0 not-italic font-normal text-sm leading-5 text-gray-900 relative before:invisible"
        style={
          readOnly
            ? { pointerEvents: 'none', flex: '1 1 0' }
            : { flex: '1 1 0' }
        }
        label={
          label && (
            <div className={style.alignLabel}>
              <span>{label}</span>
              <span className={style.subLabel}>{subLabel}</span>
            </div>
          )
        }
        rules={[
          {
            required: required ? true : false,
            message: message,
          },
        ]}>
        {hasTime ? (
          <DatePicker
            size={size}
            placeholder={placeholder}
            className={style.inputBox}
            allowClear={false}
            disabled={disabled}
            format="DD/MM/YYYY HH:mm"
            onChange={onChange}
            disabledDate={disabledDate}
            // disabledTime={disabledDateTime}
            showTime
          />
        ) : (
          <DatePicker
            value={value}
            format={'DD/MM/YYYY'}
            // suffixIcon={
            //   <CalendarDaysIcon
            //     width={24}
            //     height={24}
            //     color="black"
            //   />
            // }

            size={size}
            placeholder={placeholder}
            className={style.inputBox}
            allowClear={false}
            onChange={onChange}
            disabled={disabled}
          />
        )}
      </Form.Item>
    </>
  );
};

export default DatePickerV2;
