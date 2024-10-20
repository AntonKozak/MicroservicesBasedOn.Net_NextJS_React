'use client';

import { Dropdown } from 'flowbite-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai';
import { HiCog, HiUser } from 'react-icons/hi2';
import { useParamsStore } from '../hooks/useParamsStore';
import { User } from 'next-auth';

type Props = {
  user: User;
};

export default function UserActions({ user }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const setParams = useParamsStore((state) => state.setParams);

  function setWiner() {
    setParams({ winner: user.username, seller: undefined });
    if (pathname !== '/') {
      router.push('/');
    }
  }

  function setSeller() {
    setParams({ seller: user.username, winner: undefined });
    if (pathname !== '/') {
      router.push('/');
    }
  }

  return (
    <Dropdown inline label={`Welcome ${user.name}`}>
      <Dropdown.Item icon={HiUser} onClick={setSeller}>
        My cars
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy} onClick={setWiner}>
        Auctions won
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillCar}>
        <Link href='/auctions/create'>Sell my car</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <Link href='/session'>Session developers</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        icon={AiOutlineLogout}
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Logout
      </Dropdown.Item>
    </Dropdown>
  );
}
