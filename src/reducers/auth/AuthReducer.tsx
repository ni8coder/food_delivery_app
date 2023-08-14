import {SIGN_IN, RESTORE_TOKEN, SIGN_OUT} from '../../constants/auth_actions';
import {AuthState} from '../../models/AuthModel.js';

type ACTION_TYPE =
  | {type: typeof RESTORE_TOKEN; token: string | null}
  | {type: typeof SIGN_IN; token: string | null}
  | {type: typeof SIGN_OUT; token?: string | null};

const AuthReducer = (prevState: AuthState, action: ACTION_TYPE) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case SIGN_IN:
      return {
        ...prevState,
        userToken: action.token,
        isSignOut: false,
      };
    case SIGN_OUT:
      return {
        ...prevState,
        userToken: null,
        isSignOut: true,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default AuthReducer;
