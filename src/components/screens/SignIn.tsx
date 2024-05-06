import { SignInButton } from '../domain/auth/SignInButton';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInModal = () => {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef) {
      dialogRef.current?.showModal();
    }
  }, [dialogRef]);

  return (
    <dialog ref={dialogRef} className="modal" onClick={() => navigate('/')}>
      <div className="modal-box">
        <h3>SignIn</h3>
        <SignInButton />
      </div>
    </dialog>
  );
};

export default SignInModal;
