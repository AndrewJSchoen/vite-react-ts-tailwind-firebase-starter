import { ReactNode, createContext, useContext, useEffect, useMemo } from 'react';
import { create, useStore as useZustandStore } from 'zustand';
import { AuthStateVariant, setupFirebase, type Project, Role } from '~/lib/firebase';
import { Auth, User, getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  CollectionReference,
  DocumentReference,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  addDoc,
  getFirestore,
  setDoc,
  query,
  where,
} from 'firebase/firestore';
import { useQuery, QueryClient, useMutation } from '@tanstack/react-query';
import { subscribeWithSelector } from 'zustand/middleware';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: true,
      refetchInterval: 5000,
    },
  },
});

export const firebase = setupFirebase();
if (!firebase) {
  throw new Error('Firebase not initialized');
}
const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);
// console.log('Creating Store');

export const projectsCollection = collection(firestore, 'projects');

export async function getProjectIds(): Promise<string[]> {
  console.log('getting project ids');
  const projectsSnapshot = await getDocs(
    query(projectsCollection, where(`roles.${auth.currentUser?.uid}`, '==', Role.OWNER)),
  );
  console.log('snapshot', projectsSnapshot);
  return projectsSnapshot.docs.map((doc) => doc.id);
}

export async function addProject(userId: string, project?: Partial<Project>): Promise<DocumentReference> {
  const result = await addDoc(collection(firestore, 'projects'), {
    name: 'New Project',
    description: 'A new project',
    image: 'https://via.placeholder.com/250x150',
    roles: {
      [userId]: Role.OWNER,
    },
    ...project,
  });

  return result;
}

type AuthState =
  | {
      state: AuthStateVariant.SIGNED_IN;
      currentUser: User;
    }
  | {
      state: AuthStateVariant.SIGNED_OUT;
      currentUser: null;
    }
  | {
      state: AuthStateVariant.UNKNOWN;
      currentUser: null;
    };

export interface StoreData {
  authState: AuthState;
  currentProject: Project | null;
}

export interface StoreActions {
  signIn: (user: User) => void;
  signOut: () => void;
  setProject: (project: Project) => void;
}

export type Store = StoreActions & StoreData;

export interface StoreProviderProps {
  children: ReactNode;
}

export const createStore = () => {
  return create<Store>()(
    subscribeWithSelector((set) => ({
      authState: { state: AuthStateVariant.UNKNOWN, currentUser: null },
      currentProject: null,
      signIn: async (user) => {
        set({
          authState: { state: AuthStateVariant.SIGNED_IN, currentUser: user },
        });
      },
      signOut: () => set({ authState: { state: AuthStateVariant.SIGNED_OUT, currentUser: null } }),
      setProject: (project) => set({ currentProject: project }),
    })),
  );
};

export const store = createStore();
export type StoreType = typeof store;
export const StoreContext = createContext<StoreType | null>(null);

export function StoreProvider({ children }: StoreProviderProps): ReactNode {
  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          store.getState().signIn(user);
        } else {
          store.getState().signOut();
        }
      });
    }
  }, [auth]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export type Selector<T> = (state: Store) => T;

export function useStore<T>(selector: Selector<T>): T {
  const store = useContext(StoreContext);
  if (!store) throw new Error('Missing StoreProvider in the tree');
  return useZustandStore(store, selector);
}

// const function useProject(id): DefinedUseQueryResult<Project,Error> {

// }

export const useLoadedProject = (id: string) => {
  const docRef = doc(firestore, 'projects', id);
  return useQuery({
    queryKey: ['projects', id],
    queryFn: async ({ queryKey: [, id] }) => {
      const response = await getDoc(docRef);
      return { id, image: '', name: '', description: '', ...response.data() } as Project;
    },
  });
};

export const useStoredProject = (id: string) => {
  const setProject = useStore((state) => state.setProject);
  const { mutate } = useMutation({
    mutationFn: async (project: Project) => {
      return await setDoc(doc(firestore, 'projects', id), project);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', id] });
    },
  });

  useEffect(() => {
    const unsubscribe = store.subscribe(
      (state) => state.currentProject,
      (project) => {
        if (project) {
          mutate(project);
        }
      },
    );

    return unsubscribe;
  }, [id]);
  //   queryKey: ['projects', id],
  //   queryFn: async ({ queryKey: [, id] }) => {
  //     const response = await getDoc(doc(firestore, 'projects', id));

  //     return { id, image: '', name: '', description: '', ...response.data() } as Project;
  //   },
  // });
};
