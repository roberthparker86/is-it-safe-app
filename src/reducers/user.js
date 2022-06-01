const userReducer = (state = {}, action) => {

  switch (action.type) {

      case 'LOGIN':
          return {
            ...action.user
          };

      case 'LOGOUT':
          // reset user state to empty object
          return {};

      case 'UPDATE_FOOD':
        console.log({...state});
        return {
          ...state,
          freezer: action.freezer,
          refrigerator: action.refrigerator
        }

      default:
        return state;
  };
};

export default userReducer;