const userReducer = (state = { user: {} }, action) => {

  switch (action.type) {

      case 'LOGIN':
          return {
              user: action.user
          };

      case 'LOGOUT':
          // reset user state to empty object
          return {};

      case 'GET_FOOD':
        return {
          ...state,
          user: {
            freezer: action.freezer,
            refrigerator: action.refrigerator
          }
        }

      default:
          return state;
  };
};

export default userReducer;