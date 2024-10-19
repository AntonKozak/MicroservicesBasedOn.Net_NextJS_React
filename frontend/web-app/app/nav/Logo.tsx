'use client';

import React from 'react';
import { TbSkiJumping } from 'react-icons/tb';
import { useParamsStore } from '../hooks/useParamsStore';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();
  const reset = useParamsStore((state) => state.reset);

  function doReset() {
    if (pathname !== '/') router.push('/');
    reset();
  }

  return (
    <div
      onClick={doReset}
      className='cursor-pointer flex items-center gap-2 text-3xl font-semibold text-blue-400'
    >
      <TbSkiJumping size={34} />
      <div>Anton Kozak</div>
    </div>
  );
}
