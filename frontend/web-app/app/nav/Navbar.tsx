import Search from './Search';
import Logo from './Logo';
import LoginButton from './LoginButton';
import { getCurrentUser } from '../actions/authActions';
import UserActions from './UserActions';

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <header className='sticky top-0 z-50 flex justify-between p-5 items-center text-blue-400 text-2xl shadow-md bg-slate-800'>
      <Logo /> <Search /> {user ? <UserActions user={user} /> : <LoginButton />}
    </header>
  );
}
