import { Button, ButtonGroup } from 'flowbite-react';
import React from 'react';
import { useParamsStore } from '../hooks/useParamsStore';
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai';
import { BsFillStopCircleFill, BsStopwatchFill } from 'react-icons/bs';
import { GiFinishLine, GiFlame } from 'react-icons/gi';

const pageSizeButtons = [4, 8, 12, 24];

const orderButtons = [
  {
    label: 'Alfabetical',
    icon: AiOutlineSortAscending,
    value: 'make',
  },
  {
    label: 'End date',
    icon: AiOutlineClockCircle,
    value: 'endingSoon',
  },
  {
    label: 'Recently added',
    icon: BsFillStopCircleFill,
    value: 'new',
  },
];

const filterButtons = [
  {
    label: 'Live Auction',
    icon: GiFlame,
    value: 'live',
  },
  {
    label: 'End in 6 hours',
    icon: GiFinishLine,
    value: 'endingSoon',
  },
  {
    label: 'Completed',
    icon: BsStopwatchFill,
    value: 'finished',
  },
];

export default function Filters() {
  const pageSize = useParamsStore((state) => state.pageSize);
  const setParams = useParamsStore((state) => state.setParams);
  const orderBy = useParamsStore((state) => state.orderBy);
  const filterBy = useParamsStore((state) => state.filterBy);

  return (
    <div className='flex justify-between items-center mb-4'>
      <div>
        <span className='uppercase texl-xs  text-white-500 mr-2'>
          Filter by
        </span>

        <ButtonGroup>
          {filterButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ filterBy: value })}
              color={`${filterBy === value ? 'red' : 'grey'}`}
              className='text-blue-600 focus:ring-1 bg-slate-800 focus:bg-slate-700 focus-within:bg-red-500 focus:border-l-orange-800 active:bg-amber-300 '
            >
              <Icon size={20} className='mr-3 h-4 w-4' />
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div>
        <span className='uppercase texl-xs  text-white-500 mr-2'>Order by</span>

        <ButtonGroup>
          {orderButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ orderBy: value })}
              color={`${orderBy === value ? 'red' : 'grey'}`}
              className='text-blue-600 focus:ring-1 bg-slate-800 focus:bg-slate-700 focus-within:bg-red-500 focus:border-l-orange-800 active:bg-amber-300 '
            >
              <Icon size={20} className='mr-3 h-4 w-4' />
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div>
        <span className='uppercase texl-xs  text-white-500 mr-2'>
          {' '}
          Page size
        </span>
        <ButtonGroup>
          {pageSizeButtons.map((value, i) => (
            <Button
              key={i}
              onClick={() => setParams({ pageSize: value })}
              color={`${pageSize === value ? 'red' : 'grey'}`}
              className='text-blue-600 focus:ring-1 bg-slate-800'
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}
