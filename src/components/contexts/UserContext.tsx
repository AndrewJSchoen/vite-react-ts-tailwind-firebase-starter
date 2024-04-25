import { createContext, ReactNode, useContext, useReducer } from 'react';
import { User } from 'firebase/auth';
import { AuthStateVariant, AuthAction } from '~/lib/firebase';

type SigninAction = { type: AuthAction.SIGN_IN; payload: { user: User } };
type SignoutAction = { type: AuthAction.SIGN_OUT };

type AuthActions = SigninAction | SignoutAction;

type AuthState =
  | {
      state: AuthStateVariant.SIGNED_IN;
      currentUser: User;
    }
  | {
      state: AuthStateVariant.SIGNED_OUT;
    }
  | {
      state: AuthStateVariant.UNKNOWN;
    };

const AuthReducer = (_state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthAction.SIGN_IN:
      return {
        state: AuthStateVariant.SIGNED_IN,
        currentUser: action.payload.user,
      };
    // break
    case AuthAction.SIGN_OUT:
      return {
        state: AuthStateVariant.SIGNED_OUT,
      };
  }
};

type AuthContextProps = {
  state: AuthState;
  dispatch: (value: AuthActions) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  state: { state: AuthStateVariant.UNKNOWN },
  dispatch: (val) => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, { state: AuthStateVariant.UNKNOWN });

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

const useAuthState = () => {
  const { state } = useContext(AuthContext);
  return {
    state,
  };
};

const useSignIn = () => {
  const { dispatch } = useContext(AuthContext);
  return {
    signIn: (user: User) => {
      dispatch({ type: AuthAction.SIGN_IN, payload: { user } });
    },
  };
};

const useSignOut = () => {
  const { dispatch } = useContext(AuthContext);
  return {
    signOut: () => {
      dispatch({ type: AuthAction.SIGN_OUT });
    },
  };
};

export { useAuthState, useSignIn, useSignOut, AuthProvider };
