import { Dialog } from '@headlessui/react';
import { useRef, useState, useEffect } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import { useFirestore, AuthStateVariant } from '~/lib/firebase';
import {
  CollectionReference,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  DocumentData,
  Firestore,
} from 'firebase/firestore';

export type Project = {
  id: string;
  name: string;
  size: number;
  // description: string;
};

export async function fetchFirebaseProjects(projectsCollectionRef: CollectionReference): Promise<Project[]> {
  const snapshot = await getDocs(projectsCollectionRef);
  return snapshot.docs.map((doc) => {
    const data = doc.data() as Project;
    return { ...data, id: doc.id };
  });
}

export const createProject = async (
  projectsCollectionRef: CollectionReference,
  project: Omit<Project, 'id'>,
): Promise<DocumentData> => {
  return await addDoc(projectsCollectionRef, project);
};

export const updateProject = async (
  id: string,
  update: Partial<Omit<Project, 'id'>>,
  store: Firestore,
): Promise<void> => {
  const projectDoc = doc(store, 'projects', id);
  await updateDoc(projectDoc, update);
};

export const deleteProject = async (id: string, store: Firestore): Promise<void> => {
  const projectDoc = doc(store, 'projects', id);
  await deleteDoc(projectDoc);
};

function Index() {
  const { state } = useAuthState();
  const [isOpen, setIsOpen] = useState(false);
  const completeButtonRef = useRef(null);
  const firestore = useFirestore();
  const projectsCollectionRef = collection(firestore, 'projects');

  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const newProjects = await fetchFirebaseProjects(projectsCollectionRef);
    setProjects(newProjects);
  };

  useEffect(() => {
    if (state.state === AuthStateVariant.SIGNED_IN) {
      fetchProjects();
    } else {
      setProjects([]);
    }
  }, [state.state]);

  console.log(projects, state);

  return (
    <>
      <Head title="Home" />
      <div className="flex h-full bg-white rounded-md">
        <div className="text-center hero-content">
          <div>
            <h1 className="text-3xl font-bold">
              <a className="link link-primary" target="_blank" href="https://vitejs.dev/" rel="noreferrer">
                Vite
              </a>{' '}
              +{' '}
              <a className="link link-primary" target="_blank" href="https://reactjs.org/" rel="noreferrer">
                React
              </a>{' '}
              +{' '}
              <a className="link link-primary" target="_blank" href="https://www.typescriptlang.org/" rel="noreferrer">
                TypeScript
              </a>{' '}
              +{' '}
              <a className="link link-primary" target="_blank" href="https://tailwindcss.com/" rel="noreferrer">
                TailwindCSS
              </a>{' '}
              Starter
            </h1>
            <p className="mt-4 text-lg">
              For fast <b>prototyping</b>. Already set up{' '}
              <a
                className="link link-primary"
                target="_blank"
                href="https://github.com/firebase/firebase-js-sdk"
                rel="noreferrer"
              >
                Firebase(v9)
              </a>
              ,{' '}
              <a className="link link-primary" target="_blank" href="https://daisyui.com/" rel="noreferrer">
                daisyUI
              </a>
              ,{' '}
              <a className="link link-primary" target="_blank" href="https://github.com/eslint/eslint" rel="noreferrer">
                ESLint
              </a>
              ,{' '}
              <a
                className="link link-primary"
                target="_blank"
                href="https://github.com/prettier/prettier"
                rel="noreferrer"
              >
                Prettier
              </a>
              .
            </p>
            <div className="mt-4 grid gap-2">
              {state.state}
              {state.state === AuthStateVariant.UNKNOWN ? null : state.state === AuthStateVariant.SIGNED_OUT ? (
                <SignInButton />
              ) : (
                <SignOutButton />
              )}
              <button onClick={() => setIsOpen(true)}>Display Dialog</button>
            </div>
            <div className="mt-4 grid gap-2">
              <button
                onClick={() =>
                  createProject(projectsCollectionRef, { name: 'test', size: 1 }).then(() => fetchProjects())
                }
              >
                Create
              </button>
              {/* <button onClick={() => updateProject('1', { name: 'test2' }, firestore)}>Update</button>
              <button onClick={() => deleteProject('1', firestore)}>Delete</button> */}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        className="flex fixed inset-0 z-10 overflow-y-auto"
        initialFocus={completeButtonRef}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex items-center justify-center min-h-screen w-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded max-w-120 p-8 mx-auto">
            <Dialog.Title>Dialog Title</Dialog.Title>
            <Dialog.Description>Dialog description</Dialog.Description>
            <button
              ref={completeButtonRef}
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Index;
