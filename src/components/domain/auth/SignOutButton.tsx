import { useAuth } from '~/lib/firebase';
import { useNavigate } from 'react-router-dom';

export const SignOutButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const auth = useAuth();
    auth.signOut();
    navigate('/');
  };

  return (
    <button onClick={handleClick} type="button" className="btn normal-case w-full">
      Sign Out
    </button>
  );
};
