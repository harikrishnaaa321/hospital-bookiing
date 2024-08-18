import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  user: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
};

export const AuthContext = createContext(initialState);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      return {
        user: null,
        role: null,
        token: null,
      };
    default:
      console.error(`Unhandled action type: ${action.type}`);
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
    localStorage.setItem("role", state.role);
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
