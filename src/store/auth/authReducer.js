import { LOGIN, LOGOUT } from './authConstant';
const initalState = {
    isSignedIn: false,
    user: null,
    permission: null
};

const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isSignedIn: true,
                user: action.user,
                permission: action.permission
            };
        case LOGOUT:
            return {
                ...state,
                isSignedIn: false,
                user: null,
                permission: null
            };

        default:
            return state;
    }
};

export default authReducer;
