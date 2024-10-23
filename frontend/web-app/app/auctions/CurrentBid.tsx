import React from 'react';

type Props = {
  amount?: number;
  reservePrice: number;
};

export default function CurrentBid({ amount, reservePrice }: Props) {
  const text = amount ? `$ ${amount}` : `No bids yet`;
  const color = amount
    ? amount > reservePrice
      ? 'bg-green-600'
      : 'bg-red-600'
    : 'bg-gray-600';

  return (
    <div
      className={`
    border-2
    border-white
    text-white
    p-1
    rounded-lg
    flex
    justify-center
    ${color}
    `}
    >
      {text}
    </div>
  );
}