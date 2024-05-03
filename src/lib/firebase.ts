import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

export enum AuthStateVariant {
  SIGNED_IN = 'SIGNED_IN',
  SIGNED_OUT = 'SIGNED_OUT',
  UNKNOWN = 'UNKNOWN',
}

export enum AuthAction {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export enum Role {
  OWNER = 'owner',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  roles: { [key: string]: Role };
}

// let firebaseApp: FirebaseApp;
const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;

let firebaseApp: FirebaseApp;

export const setupFirebase = (): FirebaseApp | null => {
  try {
    firebaseApp = initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
      databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
      projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
      appId: import.meta.env.VITE_FIREBASE_APPID,
    });
    console.log('Firebase app initialized', firebaseApp);
    return firebaseApp;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

let auth: Auth;
let firestore: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;

export const useAuth = () => {
  auth = getAuth(firebaseApp);
  if (useEmulator()) {
    connectAuthEmulator(auth, 'http://localhost:9099');
  }
  return auth;
};

export const useFirestore = () => {
  if (!firestore) {
    firestore = getFirestore(firebaseApp);
    if (useEmulator()) {
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
  }
  return firestore;
};

export const useStorage = () => {
  if (!storage) {
    storage = getStorage();
    if (useEmulator()) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
  }
  return storage;
};
