'use client';

import React from 'react';
import { placeBidForAuction } from '@/app/actions/auctionActions';
import { useBidStore } from '@/app/hooks/useBidStore';
import { FieldValues, useForm } from 'react-hook-form';
import { numberWithCommas } from '@/lib/numberWithComma';
import toast from 'react-hot-toast';

type Props = {
  auctionId: string;
  highBid: number;
};

export default function BidForm({ auctionId, highBid }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm();
  const addBid = useBidStore((state) => state.addBid);

  function onSubmit(data: FieldValues) {
    if (data.amount <= highBid) {
      reset();
      return toast.error(
        'Your bid must be higher than the current bid atleast $' +
          numberWithCommas(highBid + 1)
      );
    }
    placeBidForAuction(auctionId, +data.amount)
      .then((bid) => {
        if (bid.error) throw bid.error;
        addBid(bid);
        reset();
      })
      .catch((error) => {
        toast.error(error.message);
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
