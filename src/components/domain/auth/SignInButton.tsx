import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useStore } from '~/components/contexts/store';

export const SignInButton = () => {
  const signIn = useStore((state) => state.signIn);
  // const handleClick = () => {
  //   const provider = new GoogleAuthProvider();
  //   // @see https://firebase.google.com/docs/auth/web/google-signin
  //   auth.useDeviceLanguage();

  //   signInWithPopup(auth, provider);
  // };

  return (
    <button onClick={signIn} type="button" className="btn btn-primary normal-case w-full">
      Sign In With Google
    </button>
  );
};
