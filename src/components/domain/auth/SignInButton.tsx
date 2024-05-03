import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '~/lib/firebase';

export const SignInButton = () => {
  const handleClick = () => {
    const provider = new GoogleAuthProvider();
    const auth = useAuth();
    // @see https://firebase.google.com/docs/auth/web/google-signin
    auth.useDeviceLanguage();

    signInWithPopup(auth, provider);
  };

  return (
    <button onClick={handleClick} type="button" className="btn btn-primary normal-case w-full">
      Sign In With Google
    </button>
  );
};
