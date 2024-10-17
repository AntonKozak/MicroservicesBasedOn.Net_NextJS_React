import React from 'react';
import { TbSkiJumping } from 'react-icons/tb';

export default function Home() {
  return (
    <header className='sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md'>
      <div className='flex items-center gap-2 text-3xl font-semibold text-blue-400'>
        <TbSkiJumping size={34} />
        <div>Anton Kozak</div>
      </div>
      <div>Search</div>
      <div>Login</div>
    </header>
  );
}
