import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProject, useStore } from '../contexts/store';
import { Project } from '~/lib/firebase';

export function NewProject() {
  const { currentUser } = useStore((state) => state.authState);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (props?: Partial<Project>) => {
      if (!currentUser) return;
      await addProject(currentUser.uid, props);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      console.log('Project added');
    },
  });

  return (
    <div>
      <button className="btn btn-primary normal-case w-full" onClick={() => mutate({})}>
        New Project
      </button>
    </div>
  );
}
