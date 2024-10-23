'use client';

import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useAuctionStore } from '../hooks/useAuctionStore';
import { useBidStore } from '../hooks/useBidStore';
import { useParams } from 'next/navigation';
import { Auction, AuctionFinished, Bid } from '@/types';
import { User } from 'next-auth';
import toast from 'react-hot-toast';
import AuctionCreatedToast from '../components/AuctionCreatedToast';
import { getDetailedViewData } from '../actions/auctionActions';
import AuctionFinishedToast from '../components/AuctionFinishedToast';

type SignalRProviderProps = {
  children: ReactNode;
  user: User | null;
};

export default function SignalRProvider({
  children,
  user,
}: SignalRProviderProps) {
  const connection = useRef<HubConnection | null>(null);
  const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);
  const params = useParams<{ id: string }>();

  const handelAuctionFinished = useCallback(
    (finishedAuction: AuctionFinished) => {
      const auction = getDetailedViewData(finishedAuction.auctionId);
      return toast.promise(
        auction,
        {
          loading: 'Loading auction data...',
          success: (auction) => (
            <AuctionFinishedToast
              auction={auction}
              finishedAuction={finishedAuction}
            />
          ),
          error: () => 'AuctionFinished',
        },
        { success: { duration: 5000, icon: null } }
      );
    },
    []
  );

  const handelAuctionCreated = useCallback(
    (auction: Auction) => {
      if (user?.username !== auction.seller) {
        return toast(<AuctionCreatedToast auction={auction} />, {
          duration: 5000,
        });
      }
    },
    [user?.username]
  );

  const handelBidPlaced = useCallback(
    (bid: Bid) => {
      if (bid.bidStatus.includes('Accepted')) {
        setCurrentPrice(bid.auctionId, bid.amount);
      }

      if (params.id === bid.auctionId) {
        addBid(bid);
      }
    },
    [setCurrentPrice, addBid, params.id]
  );

  useEffect(() => {
    if (!connection.current) {
      connection.current = new HubConnectionBuilder()
        .withUrl('http://localhost:6001/notifications')
        .withAutomaticReconnect()
        .build();

      connection.current
        .start()
        .then(() => 'Connected to notification hub')
        .catch((error) => console.log(error));
    }

    connection.current.on('BidPlaced', handelBidPlaced);
    connection.current.on('AuctionCreated', handelAuctionCreated);
    connection.current.on('AuctionFinished', handelAuctionFinished);

    return () => {
      connection.current?.off('BidPlaced', handelBidPlaced);
      connection.current?.off('AuctionCreated', handelAuctionCreated);
      connection.current?.off('AuctionFinished', handelAuctionFinished);
    };
  }, [
    setCurrentPrice,
    handelBidPlaced,
    handelAuctionCreated,
    handelAuctionFinished,
  ]);

  return children;
}
