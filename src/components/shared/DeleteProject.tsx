import { useDeleteProject } from '../contexts/store';
import { useNavigate } from 'react-router-dom';

export function DeleteProject({ id }: { id: string }) {
  const navigate = useNavigate();
  const deleteProject = useDeleteProject(id, () => navigate('/'));

  return (
    <div>
      <button className="btn btn-primary normal-case w-full rounded-none" onClick={() => deleteProject()}>
        Delete Project
      </button>
    </div>
  );
}
