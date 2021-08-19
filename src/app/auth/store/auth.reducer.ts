import {UserModel} from '../user.model';
import * as AuthActions from "./auth.actions";

export interface State {
  user: UserModel,
  error: string,
  loading: boolean
}

const initialState = {
  user: null,
  error: null,
  loading: false
}

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new UserModel(action.payload.email, action.payload.id, action.payload.token, new Date(new Date().getTime() + +action.payload.expiration * 1000));
      return {...state, error: null, user: user, loading: false};

    case AuthActions.LOGOUT:
      return {...state, error: null, user: null};

    case AuthActions.LOGIN_START:
      return {...state, error: null, loading: true};

    case AuthActions.LOGIN_FAIL:
      return {...state, error: action.payload.error, loading: false};

    case AuthActions.SIGNUP_START:
      return {...state, error: null, loading: true}

    default:
      return state;
  }
}
