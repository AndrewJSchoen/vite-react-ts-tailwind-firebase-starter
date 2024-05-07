import { useNavigate } from 'react-router-dom';
import { useStore } from '~/components/contexts/store';

export const SignOutButton = () => {
  const navigate = useNavigate();
  const signOut = useStore((state) => state.signOut);

  const handleClick = () => {
    signOut(() => {
      navigate('/');
    });
  };

  return (
    <button onClick={handleClick} type="button" className="btn normal-case w-full rounded-none">
      Sign Out
    </button>
  );
};
