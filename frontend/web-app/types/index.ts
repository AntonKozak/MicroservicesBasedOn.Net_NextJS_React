export type PageResult<T> = {
  results: T[];
  pageCount: number;
  pageSize: number;
};

export type Auction = {
  reservePrice: number;
  seller: string;
  winner?: string;
  soldAmound: number;
  currentHightBid: number;
  createdAt: string;
  updatedAt: string;
  auctionEnd: string;
  status: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  imageUrl: string;
  id: string;
};
