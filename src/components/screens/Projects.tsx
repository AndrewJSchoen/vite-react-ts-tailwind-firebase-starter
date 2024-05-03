import { Head } from '../shared/Head';
import ProjectCard from '../shared/ProjectCard';
import { getProjectIds } from '../contexts/store';
import { useQuery } from '@tanstack/react-query';
import { NewProject } from '../shared/NewProject';

export default function Projects() {
  const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjectIds,
  });

  console.log('Projects', data);

  // const projectIds = useStore((state) => state.projects);

  return (
    <>
      <Head title="Home" />
      <div className="flex h-full bg-white rounded-md scroll-auto overflow-y-scroll p-1 justify-start">
        <div className="w-full">
          <div className="p-1 mb-1 bg-gray-200 rounded-md flex align-middle">
            <h1 className="text-4xl text-gray-900 text-left flex-1 p-1">Projects</h1>
            <NewProject />
          </div>

          <div className="grid grid-cols-3 gap-1 justify-start w-full pb-1">
            {data?.map((id) => <ProjectCard key={id} id={id} />)}
          </div>
        </div>
      </div>
    </>
  );
}
