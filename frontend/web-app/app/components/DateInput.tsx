import { Label } from 'flowbite-react';
import React from 'react';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import { useController, UseControllerProps } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  label: string;
  type?: string;
  showLabel?: string;
} & UseControllerProps &
  DatePickerProps;

export default function DateInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });

  return (
    <div className='mb-3'>
      {props.showLabel && (
        <div className='mb-2 block'>
          <Label htmlFor={field.name} value={props.label} />
        </div>
      )}
      <DatePicker
        {...props}
        {...field}
        placeholderText={props.label}
        selected={field.value}
        className={`text-gray-800 rounded-lg w-full flex flex-col 
            ${
              fieldState.error
                ? 'border-red-50 text-red-900'
                : !fieldState.invalid && fieldState.isDirty
                  ? 'border-green-50 text-green-900'
                  : ''
            }`}
      />
      {fieldState.error && (
        <div className='text-red-500 text-sm'>{fieldState.error.message}</div>
      )}
    </div>
  );
}
