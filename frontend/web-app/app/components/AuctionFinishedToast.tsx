import { Auction, AuctionFinished } from '@/types';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { numberWithCommas } from '@/lib/numberWithComma';

//Connected to Contracts AuctionFinished
type Props = {
  auction: Auction;
  finishedAuction: AuctionFinished;
};

export default function AuctionFinishedToast({
  auction,
  finishedAuction,
}: Props) {
  return (
    <Link
      href={`/auctions/details/${auction.id}`}
      className='flex flex-col items-center'
    >
      {' '}
      <div className='flex flex-row items-center gap-2'>
        <Image
          src={auction.imageUrl}
          alt='Car image here'
          height={80}
          width={80}
          className='rounded-lg w-auto h-auto'
        />
        <div className='flex flex-col'>
          <span>
            Auction for {auction.make} {auction.model} has finished
          </span>
          {finishedAuction.itemSold && finishedAuction.amount ? (
            <p>
              Congrats to {finishedAuction.winner} with cost off $$
              {numberWithCommas(finishedAuction.amount)}
            </p>
          ) : (
            <p>This item was not sold</p>
          )}
        </div>
      </div>
    </Link>
  );
}
