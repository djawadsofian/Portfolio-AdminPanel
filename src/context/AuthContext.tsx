import { createContext, ReactNode, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { User } from "firebase/auth";

// Define the state type
interface State {
    currentUser: User | null;
}

// Define the context props type
interface AuthContextProviderProps {
    children: ReactNode;
}

// Initial state with correct type
const storedUser = localStorage.getItem("user");
const INITIAL_STATE: State = {
    currentUser: storedUser ? JSON.parse(storedUser) : null,
};

// Create the context with the correct type for state and dispatch
export const AuthContext = createContext({
    currentUser: INITIAL_STATE.currentUser,
    dispatch: (action: any) => {},
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect( () => {localStorage.setItem("user",JSON.stringify(state.currentUser) )} , 
    [state.currentUser]

    )

    return (
        <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
