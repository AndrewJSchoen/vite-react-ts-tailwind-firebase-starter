import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignOutButton } from '../domain/auth/SignOutButton';
import { Modal } from '~/components/shared/Modal';
import { ModalLayouter } from '../shared/ModalLayouter';

const AccountModal = () => {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef) {
      dialogRef.current?.showModal();
    }
  }, [dialogRef]);

  return (
    <Modal open onClickBackdrop={() => navigate('/')} title="Account">
      <ModalLayouter
        left={<div>Left</div>}
        right={
          <div className="p-2">
            <SignOutButton />
          </div>
        }
      />
    </Modal>
  );
};

export default AccountModal;
