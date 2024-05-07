import { Head } from '../shared/Head';
import ProjectCard from '../shared/ProjectCard';
import { useProjectIds } from '../contexts/store';
import { NewProject } from '../shared/NewProject';
import { Breadcrumb } from '../shared/Breadcrumb';

export default function Projects() {
  const projectIds = useProjectIds();

  return (
    <>
      <Head title="Home" />
      <div className="flex h-full dark:bg-black bg-white rounded-none scroll-auto overflow-y-scroll p-2 justify-start">
        <div className="w-full">
          <Breadcrumb items={[{ href: '/', label: 'Home' }]}>
            <NewProject />
          </Breadcrumb>

          <div className="grid grid-cols-3 gap-3 justify-start w-full pb-2">
            {projectIds.map((id) => (
              <ProjectCard key={id} id={id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
