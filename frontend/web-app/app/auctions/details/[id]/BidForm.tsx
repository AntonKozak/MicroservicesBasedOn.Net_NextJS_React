'use client';

import React from 'react';
import { placeBidForAuction } from '@/app/actions/auctionActions';
import { useBidStore } from '@/app/hooks/useBidStore';
import { FieldValues, useForm } from 'react-hook-form';
import { numberWithCommas } from '@/app/lib/numberWithComma';

type Props = {
  auctionId: string;
  highBid: number;
};

export default function BidForm({ auctionId, highBid }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const addBid = useBidStore((state) => state.addBid);

  function onSubmit(data: FieldValues) {
    placeBidForAuction(auctionId, +data.amount).then((bid) => {
      addBid(bid);
      reset();
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex items-center border-2 rounded-lg py-2'
    >
      <input
        type='number'
        {...register('amount')}
        className='input-custom  text-sm  text-blue-500'
        placeholder={`Enter your bid minimum $${numberWithCommas(highBid + 1)}`}
      />
    </form>
  );
}
