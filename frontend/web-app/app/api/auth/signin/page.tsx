import EmptyFilter from '@/app/components/EmptyFilter';
import React from 'react';

export default function SignIn({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  return (
    <EmptyFilter
      title='You need to be logged in !'
      subtitle='Please login to access this page'
      showLogin
      callbackUrl={searchParams.callbackUrl}
    />
  );
}
