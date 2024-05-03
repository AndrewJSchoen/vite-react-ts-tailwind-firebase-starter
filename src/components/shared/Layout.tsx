// import { Dialog } from '@headlessui/react';
import { Outlet } from 'react-router-dom';
import SignInOut from './SignInOut';

export default function Layout() {
  return (
    <div className="flex flex-row h-screen bg-red-400">
      <div className="h-full basis-1/4 bg-gray-500 p-2">
        <h1 className="text-lg text-gray-100  text-center"> SIDEBAR </h1>
        <SignInOut />
      </div>
      <div className="h-full basis-3/4 bg-gray-500 text-center p-1">
        <Outlet />
      </div>
    </div>
  );
}
