'use client';

import React, { useEffect, useState } from 'react';
import AuctionCard from './AuctionCard';
import { Auction, PageResult } from '@/types';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import Filters from './Filters';
import { useParamsStore } from '../hooks/useParamsStore';
import { useShallow } from 'zustand/react/shallow';
import qs from 'query-string';

// Main Listning component
export default function Listning() {
  const [data, setData] = useState<PageResult<Auction>>();
  const params = useParamsStore(
    useShallow((state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
    }))
  );
  const setPrams = useParamsStore((state) => state.setParams);
  const url = qs.stringifyUrl({ url: '', query: params });

  function setPageNumber(pageNumber: number) {
    setPrams({ pageNumber });
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
    });
  }, [url]);

  if (!data) return <h3>Loading...</h3>;

  return (
    <>
      <Filters />

      <div className='grid grid-cols-4 grap-6'>
        {data.results.map((auction: Auction) => (
          <AuctionCard auction={auction} key={auction.id} />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <AppPagination
          pageChange={setPageNumber}
          currentPage={params.pageNumber}
          pageCount={data.pageCount}
        />
      </div>
    </>
  );
}
