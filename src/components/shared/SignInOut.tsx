import { useStore } from '../contexts/store';
import { SignInButton } from '../domain/auth/SignInButton';
import { SignOutButton } from '../domain/auth/SignOutButton';
import { AuthStateVariant } from '~/lib/firebase';

export default function SignInOut() {
  const authState = useStore((state) => state.authState);

  return <div>{authState.state === AuthStateVariant.SIGNED_IN ? <SignOutButton /> : <SignInButton />}</div>;
}
