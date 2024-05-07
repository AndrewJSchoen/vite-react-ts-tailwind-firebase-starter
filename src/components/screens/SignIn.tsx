import { SignInButton } from '../domain/auth/SignInButton';
import { useNavigate } from 'react-router-dom';
import { Modal } from '~/components/shared/Modal';

const SignInModal = () => {
  const navigate = useNavigate();

  return (
    <Modal open onClickBackdrop={() => navigate('/')} title="SignIn">
      <div className="p-2">
        <SignInButton />
      </div>
    </Modal>
  );
};

export default SignInModal;
