/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import AuctionCard from './AuctionCard';
import { Auction, PageResult } from '@/types';

async function getData(): Promise<PageResult<Auction>> {
  const res = await fetch('http://localhost:6001/search?pageSize=10');

  if (!res.ok) throw new Error('Failed to fetch data');

  const dataFromSearch = await res.json();
  return dataFromSearch;
}

// Main Listning component
export default async function Listning() {
  const data = await getData();

  if (!data || !data.results) {
    return <div>No results found</div>;
  }

  return (
    <div className='grid grid-cols-4 grap-6'>
      {data.results.map((auction: Auction) => (
        <AuctionCard auction={auction} key={auction.id} />
      ))}
    </div>
  );
}
