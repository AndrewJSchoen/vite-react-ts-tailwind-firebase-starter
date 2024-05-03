import { Link } from 'react-router-dom';
import { useLoadedProject } from '../contexts/store';

export default function ProjectCard({ id }: { id: string }) {
  const { data: project, isLoading } = useLoadedProject(id);

  return (
    <div className="card bg-gray-500 rounded-md">
      <figure>{!isLoading && <img src={project?.image} alt={project?.name} />}</figure>
      <div className="card-body">
        <h2 className="card-title text-white">{isLoading ? 'Loading...' : project?.name}</h2>
        <p className="text-gray-300">{isLoading ? 'Loading...' : project?.description}</p>
        <div className="card-actions justify-end">
          <Link to={`/projects/${isLoading ? 'Loading...' : project?.id}`} className="btn btn-primary">
            Open
          </Link>
        </div>
      </div>
    </div>
  );
}
