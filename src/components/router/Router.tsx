// import { Dialog } from '@headlessui/react';
import { lazy, Suspense } from 'react';
import { store } from 'components/contexts/store';
import { RouteObject, useRoutes, BrowserRouter, LoaderFunctionArgs, redirect } from 'react-router-dom';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

// const IndexScreen = lazy(() => import('~/components/screens/Index'));
const ProjectsScreen = lazy(() => import('~/components/screens/Projects'));
const ProjectScreen = lazy(() => import('~/components/screens/Project'));
const Page404Screen = lazy(() => import('~/components/screens/404'));
const Layout = lazy(() => import('~/components/shared/Layout'));
const SignInScreen = lazy(() => import('~/components/screens/SignIn'));
const AccountScreen = lazy(() => import('~/components/screens/Account'));

const authLoader = async (loaderFnArgs: LoaderFunctionArgs) => {
  const currentUser = store.getState().authState.currentUser;
  if (!currentUser) {
    return redirect('/');
  } else {
    return loaderFnArgs.request;
  }
};

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ProjectsScreen />,
          // loader: (obj) => {
          //   return true;
          // },
        },
        {
          path: 'projects/:projectId',
          element: <ProjectScreen />,
          loader: authLoader,
        },
        // TODO: Add projects routes
        {
          path: '*',
          element: <Page404Screen />,
        },
        {
          path: '/signin',
          element: <SignInScreen />,
        },
        {
          path: '/account',
          element: <AccountScreen />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};
