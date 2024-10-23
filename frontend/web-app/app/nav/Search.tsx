'use client';

import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useParamsStore } from '../hooks/useParamsStore';
import { usePathname, useRouter } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const path = usePathname();
  const setParams = useParamsStore((state) => state.setParams);
  const setSearchValue = useParamsStore((state) => state.setSearchValue);
  const searchValue = useParamsStore((state) => state.searchValue);

  function onCahnge(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function search() {
    if (path !== '/') router.push('/');
    setParams({ searchTerm: searchValue });
  }

  return (
    <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
      <input
        value={searchValue}
        onKeyDown={(e) => e.key === 'Enter' && search()}
        onChange={onCahnge}
        type='text'
        placeholder='Search for cars by color, model, brand, etc.'
        className='
        input-custom 
         text-sm
         text-blue-500'
      />
      <button onClick={search}>
        <FaSearch
          size={34}
          className='bg-yellow-400 text-white rounded-full p-2 cursor-pointer mx-4'
        />
      </button>
    </div>
  );
}
