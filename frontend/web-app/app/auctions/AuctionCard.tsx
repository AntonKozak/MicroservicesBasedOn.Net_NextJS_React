import React from 'react';
import CountdownTimer from './CountdownTimer';
import CarImage from './CarImage';
import { Auction } from '@/types';

type Props = {
  auction: Auction;
};

export default function AuctionCard({ auction }: Props) {
  return (
    <a href='#' className='m-4 group'>
      <div className='relative w-full bg-gray-200 aspect-[16/10] rounded-lg overflow-hidden '>
        <CarImage
          imageUrl={auction.imageUrl}
          make={auction.make}
          model={auction.model}
        />

        <div className='absolute bottom-2 right-2'>
          <CountdownTimer auctionEnd={auction.auctionEnd} />
        </div>
      </div>

      <div className='flex justify-between items-center mt-4'>
        <h3 className='text-blue-500'>
          {auction.make} {auction.model}
        </h3>

        <p className='font-semibold text-blue-500 text-sm'>{auction.year}</p>
      </div>
    </a>
  );
}
