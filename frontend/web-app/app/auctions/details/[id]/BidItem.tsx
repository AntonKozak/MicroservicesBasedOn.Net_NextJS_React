import { Bid } from '@/types';
import React from 'react';
import { format } from 'date-fns';
import { numberWithCommas } from '@/lib/numberWithComma';

type Props = {
  bid: Bid;
};

export default function BidItem({ bid }: Props) {
  function getBidInfo() {
    let bgColor = '';
    let text = '';
    switch (bid.bidStatus) {
      case 'Accepted':
        bgColor = 'bg-green-500';
        text = 'Bid accepted';
        break;
      case 'AcceptedBelowReserve':
        bgColor = 'bg-amber-500';
        text = 'Reserve not met';
        break;
      case 'TooLow':
        bgColor = 'bg-red-200';
        text = 'Bid too low';
        break;
      default:
        bgColor = 'bg-red-200';
        text = 'Too late to bid';
        break;
    }

    return { bgColor, text };
  }

  const bidTime = new Date(bid.bidTime);

  const formattedTime = isNaN(bidTime.getTime())
    ? 'Invalid Date'
    : format(bidTime, 'dd MMM yyyy h:mm a');

  return (
    <div
      className={`border-white text-black border-2 px-3 py-2 rounded-lg flex justify-between items-center mb-2 ${getBidInfo().bgColor}`}
    >
      <div className='flex flex-col'>
        <span>Bidder: {bid.bidder}</span>
        <span className='text-sm'>Time: {formattedTime}</span>
      </div>
      <div className='flex flex-col text-right'>
        <div className='text-xl font-semibold'>
          ${numberWithCommas(bid.amount)}
        </div>
        <div className='flex flex-row items-center'>
          <span>{getBidInfo().text}</span>
        </div>
      </div>
    </div>
  );
}
