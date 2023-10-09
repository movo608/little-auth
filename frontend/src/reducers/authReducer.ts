import { AuthAction, AuthActionsEnum, AuthState } from "@/types/auth";

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionsEnum.LOGIN:
      return { isAuthenticated: true, token: action.token };
    case AuthActionsEnum.LOGOUT:
      return { isAuthenticated: false, token: null };
    default:
      return state;
  }
};
