const authReducer = (state = { isAuthenticated: false }, action) => {

    switch (action.type) {

        case 'LOGIN':
            /**
             * Boolean for whether or not Authenticated. ONLY FOR FRONTEND ROUTING.
             * BACKEND requests handled via JWT
             */
            return {
                isAuthenticated: action.isAuthenticated
            };

        case 'LOGOUT':
            // reset user state to empty object
            return {};

        default:
            return state;
    };
};

export default authReducer;