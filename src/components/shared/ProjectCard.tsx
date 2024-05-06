import { Link } from 'react-router-dom';
import { useProject } from '../contexts/store';

export default function ProjectCard({ id }: { id: string }) {
  // const { data: project, isLoading } = useLoadedProject(id);
  const project = useProject(id);

  return (
    <div className="card bg-gray-500 rounded-md">
      <figure>
        <img src={project?.image} alt={project?.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">{project?.name || 'Loading...'}</h2>
        <p className="text-gray-300">{project?.description || 'Loading...'}</p>
        <div className="card-actions justify-end">
          <Link to={`/projects/${project?.id}`} className="btn btn-primary">
            Open
          </Link>
        </div>
      </div>
    </div>
  );
}
