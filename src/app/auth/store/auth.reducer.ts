import {UserModel} from '../user.model';
import * as AuthActions from "./auth.actions";

export interface State {
  user: UserModel
}

const initialState = {
  user: null
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new UserModel(action.payload.email, action.payload.id, action.payload.token, action.payload.expiration);
      return {...state, user: user};

    case AuthActions.LOGOUT:
      return {...state, user: null};

    default:
      return state;
  }
}
