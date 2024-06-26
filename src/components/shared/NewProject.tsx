import { useAddProject } from '../contexts/store';

export function NewProject() {
  const addProject = useAddProject();

  return (
    <div>
      <button className="btn btn-primary normal-case w-full rounded-none" onClick={() => addProject({})}>
        New Project
      </button>
    </div>
  );
}
