import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignOutButton } from '../domain/auth/SignOutButton';

const AccountModal = () => {
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
        <h3>Account</h3>
        <SignOutButton />
      </div>
    </dialog>
  );
};

export default AccountModal;
