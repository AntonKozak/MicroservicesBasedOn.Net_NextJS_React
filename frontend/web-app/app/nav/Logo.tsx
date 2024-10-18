'use client';

import React from 'react';
import { TbSkiJumping } from 'react-icons/tb';
import { useParamsStore } from '../hooks/useParamsStore';

export default function Logo() {
  const reset = useParamsStore((state) => state.reset);

  return (
    <div
      onClick={reset}
      className='cursor-pointer flex items-center gap-2 text-3xl font-semibold text-blue-400'
    >
      <TbSkiJumping size={34} />
      <div>Anton Kozak</div>
    </div>
  );
}
