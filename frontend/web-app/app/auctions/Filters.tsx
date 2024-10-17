import { Button, ButtonGroup } from 'flowbite-react';
import React from 'react';

type Props = {
  pageSize: number;
  setPageSize: (size: number) => void;
};

const pageSizeButtons = [4, 8, 12, 24];

export default function Filters({ pageSize, setPageSize }: Props) {
  return (
    <div className='flex justify-between items-center mb-4'>
      <div>
        <span className='uppercase texl-xs  text-white-500 mr-2'>
          {' '}
          Page size
        </span>
        <ButtonGroup>
          {pageSizeButtons.map((value, i) => (
            <Button
              key={i}
              onClick={() => setPageSize(value)}
              color={`${pageSize === value ? 'red' : 'grey'}`}
              className='text-blue-600 focus:ring-1'
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}
