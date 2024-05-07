import { useNavigate } from 'react-router-dom';
import { useStore } from '~/components/contexts/store';

export const SignInButton = () => {
  const navigate = useNavigate();
  const signIn = useStore((state) => state.signIn);

  const onClick = async () => {
    signIn(() => {
      navigate(-1);
    });
  };
  // const handleClick = () => {
  //   const provider = new GoogleAuthProvider();
  //   // @see https://firebase.google.com/docs/auth/web/google-signin
  //   auth.useDeviceLanguage();

  //   signInWithPopup(auth, provider);
  // };

  return (
    <button onClick={onClick} type="button" className="btn btn-primary normal-case w-full rounded-none">
      Sign In With Google
    </button>
  );
};
