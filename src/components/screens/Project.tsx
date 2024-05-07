import { redirect, useParams, useNavigate } from 'react-router-dom';
import { Head } from '~/components/shared/Head';
import { DeleteProject } from '~/components/shared/DeleteProject';
import { Breadcrumb } from '../shared/Breadcrumb';
import { useProject } from '../contexts/store';

export default function Project() {
  const params = useParams();
  const navigate = useNavigate();

  if (!params.projectId) {
    redirect('/404');
  }

  const project = useProject(params.projectId || '');

  if (!project) {
    redirect('/404');
    return null;
  }

  return (
    <>
      <Head title={project?.name || ''} />
      <div className="flex-col h-full dark:bg-black bg-white rounded-none scroll-auto overflow-y-scroll p-2 justify-start">
        <div className="w-full">
          <Breadcrumb
            items={[
              { href: '/', label: 'Home' },
              { href: `/projects/${project?.id}`, label: project?.name },
            ]}
          >
            <DeleteProject id={project.id} />
          </Breadcrumb>

          <div
            className="hero flex-1 w-full rounded-none p-1 justify-center"
            style={{ backgroundImage: `url(${project?.image})` }}
          >
            <div className="hero-content">
              <div>
                <input
                  className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={project?.name}
                  placeholder="Project Name"
                />
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={project?.description}
                  placeholder="Project Description"
                />
                {/* <p>{isLoading ? 'Loading...' : project?.description}</p> */}
                <div className="mt-4">
                  <button onClick={() => navigate('/')} className="btn btn-primary">
                    Top Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
