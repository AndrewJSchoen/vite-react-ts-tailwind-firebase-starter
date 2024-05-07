import { useStore } from '../contexts/store';
import { AuthStateVariant } from '~/lib/firebase';
import { Link, useLocation } from 'react-router-dom';

export default function SignInOut() {
  const authState = useStore((state) => state.authState);
  const location = useLocation();
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   if (authState.state === AuthStateVariant.SIGNED_IN) {
  //     navigate('/account');
  //   } else {
  //     navigate('/signin');
  //   }
  // };

  return (
    // <button onClick={handleClick} type="button" className="btn normal-case w-full">
    //   {authState.state === AuthStateVariant.SIGNED_IN ? 'Account' : 'Sign In'}
    // </button>
    <Link
      to={authState.state === AuthStateVariant.SIGNED_IN ? '/account' : '/signin'}
      className="btn normal-case w-full rounded-none"
      // This is from the tutorial here: https://dev.to/devmdmamun/create-contextual-modal-navigation-with-react-router-v6-28k2
      // But it doesn seem to work yet.
      state={{ background: location }}
    >
      {authState.state === AuthStateVariant.SIGNED_IN ? 'Account' : 'Sign In'}
    </Link>
  );
}
