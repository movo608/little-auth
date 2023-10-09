export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

export enum AuthActionsEnum {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

export interface AuthAction {
  type: AuthActionsEnum;
  token: string | null;
}

export interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}
