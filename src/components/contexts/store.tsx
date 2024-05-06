import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { create, useStore as useZustandStore } from 'zustand';
import { AuthStateVariant, setupFirebase, type Project, Role } from '~/lib/firebase';
import {
  Auth,
  User,
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import {
  DocumentReference,
  collection,
  doc,
  addDoc,
  getFirestore,
  query,
  where,
  onSnapshot,
  Firestore,
  DocumentData,
} from 'firebase/firestore';
// import { useQuery, QueryClient, useMutation } from '@tanstack/react-query';
import { subscribeWithSelector } from 'zustand/middleware';
import { FirebaseApp } from 'firebase/app';

// For now removing react-query.
// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchIntervalInBackground: true,
//       refetchInterval: 5000,
//     },
//   },
// });

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
  firebase: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  authState: AuthState;
  currentProject: Project | null;
}

export interface StoreActions {
  signIn: () => void;
  signOut: () => void;
  updateAuth: (user?: User) => void;
  setProject: (project: Project) => void;
}

export type Store = StoreActions & StoreData;

export interface StoreProviderProps {
  children: ReactNode;
}

// These can either be initialized here or in the store. Here it is located external to the store, even if they are referenced in the store.
const firebase = setupFirebase();
if (!firebase) {
  throw new Error('Firebase not initialized');
}
const auth = getAuth(firebase);
const firestore = getFirestore(firebase);

export const createStore = () => {
  // Commented out. Should be either this or the section above.
  // const firebase = setupFirebase();
  // if (!firebase) {
  //   throw new Error('Firebase not initialized');
  // }
  // const auth = getAuth(firebase);
  // const firestore = getFirestore(firebase);

  const user = auth.currentUser;
  const authState: AuthState = user
    ? { state: AuthStateVariant.SIGNED_IN, currentUser: user }
    : { state: AuthStateVariant.SIGNED_OUT, currentUser: null };

  const s = create<Store>()(
    subscribeWithSelector((set, get) => ({
      firebase,
      auth,
      firestore,
      authState,
      currentProject: null,
      signIn: async () => {
        const provider = new GoogleAuthProvider();
        // @see https://firebase.google.com/docs/auth/web/google-signin
        auth.useDeviceLanguage();

        signInWithPopup(auth, provider).then(
          (userCred: UserCredential) => {
            get().updateAuth(userCred.user);
          },
          (error) => {
            console.error(error);
          },
        );
      },
      updateAuth: (user) => {
        const authState: AuthState = user
          ? { state: AuthStateVariant.SIGNED_IN, currentUser: user }
          : { state: AuthStateVariant.SIGNED_OUT, currentUser: null };
        set({ authState });
      },
      signOut: async () => {
        signOut(get().auth).then(() => {
          get().updateAuth();
        });
      },
      setProject: (project) => set({ currentProject: project }),
    })),
  );

  onAuthStateChanged(auth, (user) => {
    console.log('USER', user);
    s.getState().updateAuth(user || undefined);
  });

  return s;
};

export const store = createStore();
export type StoreType = typeof store;
export const StoreContext = createContext<StoreType | null>(null);

export function StoreProvider({ children }: StoreProviderProps): ReactNode {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export type Selector<T> = (state: Store) => T;

export function useStore<T>(selector: Selector<T>): T {
  const store = useContext(StoreContext);
  if (!store) throw new Error('Missing StoreProvider in the tree');
  return useZustandStore(store, selector);
}

export function useProjectIds(): string[] {
  const [projectIds, setProjectIds] = useState<string[]>([]);
  // Testing out including/excluding these variables in the store.
  // const firestore = useStore((state) => state.firestore);

  const projectsCollection = collection(firestore, 'projects');
  const authState = useStore((state) => state.authState);

  useEffect(() => {
    const listener = onSnapshot(
      query(projectsCollection, where(`roles.${authState.currentUser?.uid}`, '==', Role.OWNER)),
      (snapshot) => {
        setProjectIds(snapshot.docs.map((doc) => doc.id));
      },
    );
    return listener;
  }, [authState.currentUser?.uid]);

  return projectIds;
}

export function useProject(id: string): Project | null {
  const [project, setProject] = useState<Project | null>(null);
  // Testing out including/excluding these variables in the store.
  // const firestore = useStore((state) => state.firestore);
  const authState = useStore((state) => state.authState);
  const docRef = doc(firestore, 'projects', id);

  useEffect(() => {
    if (authState.currentUser?.uid) {
      const listener = onSnapshot(docRef, (snapshot) => {
        setProject({ id, image: '', name: '', description: '', ...snapshot.data() } as Project);
      });
      return listener;
    }
  }, [id, authState.currentUser?.uid]);

  return project;
}

export function useAddProject(): (project: Partial<Project>) => Promise<DocumentReference<DocumentData, DocumentData>> {
  // Testing out including/excluding these variables in the store.
  // const firestore = useStore((state) => state.firestore);
  const currentUser = useStore((state) => state.authState.currentUser);

  const addProjectFn = async (project?: Partial<Project>) => {
    if (!currentUser) {
      throw new Error('User not signed in');
    }
    const result = await addDoc(collection(firestore, 'projects'), {
      name: 'New Project',
      description: 'A new project',
      image: 'https://via.placeholder.com/250x150',
      roles: {
        [currentUser?.uid]: Role.OWNER,
      },
      ...project,
    });

    return result;
  };
  return addProjectFn;
}
