import { User } from "firebase/auth";

interface State {
    currentUser:  User | null ; // Define your actual user type here (e.g., User or null)
}

interface Action {
    type: string;
    payload?: any; // Define the payload type based on your user data
}

const AuthReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "LOGIN": {
            return {
                currentUser: action.payload,
            };
        }

        case "LOGOUT": {
            return {
                currentUser: null,
            };
        }

        default:
            return state;
    }
};

export default AuthReducer;