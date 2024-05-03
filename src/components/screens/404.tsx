import { useNavigate } from 'react-router-dom';
import { Head } from '~/components/shared/Head';

function Page404() {
  const navigate = useNavigate();

  return (
    <>
      <Head title="The page is not found" />
      <div className="hero h-full w-full bg-white flex rounded-md p-1 justify-center">
        <div className="text-center hero-content text-3xl font-bold">
          <div>
            <h1>The page is not found.</h1>
            <div className="mt-4">
              <button onClick={() => navigate('/')} className="btn btn-primary">
                Top Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page404;
