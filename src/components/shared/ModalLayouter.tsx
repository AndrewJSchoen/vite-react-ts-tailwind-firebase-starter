import { ReactNode } from 'react';

export interface ModalLayouterProps {
  left: ReactNode;
  right: ReactNode;
}

export function ModalLayouter({ left, right }: ModalLayouterProps) {
  return (
    <div className="flex flex-row min-h-0.5">
      <div className="flex-1">{left}</div>
      <div className="flex-1">{right}</div>
    </div>
  );
}
