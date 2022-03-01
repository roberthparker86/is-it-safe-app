const authReducer = (state = {}, action) => {

    switch (action.type) {

        case 'LOGIN':
            // return user ID
            return {
                uid: action.uid
            };

        case 'LOGOUT':
            // reset user state to empty object
            return {};

        default:
            return state;
    };
};

export default authReducer;