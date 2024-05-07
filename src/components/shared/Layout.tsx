// import { Dialog } from '@headlessui/react';
import { Head } from '~/components/shared/Head';
import { Outlet } from 'react-router-dom';
import SignInOut from './SignInOut';
import { ThemeChooser } from './ThemeChooser';

export default function Layout() {
  return (
    <>
      <Head title="" />
      <div className="flex flex-row h-screen">
        <div className="h-full basis-1/4 p-2">
          <h1 className="text-lg text-gray-800 dark:text-gray-200 text-center"> SIDEBAR </h1>
          <ThemeChooser />
          <SignInOut />
        </div>
        <div className="h-full basis-3/4 dark:bg-gray-800 bg-gray-500 text-center">
          <Outlet />
        </div>
      </div>
    </>
  );
}
