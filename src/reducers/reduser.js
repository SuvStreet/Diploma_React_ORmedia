const initialState = {
  user: {
    bio: null,
    createdAt: "",
    email: "",
    id: null,
    image: "",
    token: "",
    updatedAt: "",
    username: "",
  }
};

/* console.log("####: action", action);
console.log("####: state", state); */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOG_IN":
      const { bio, createdAt, email, id, image, token, updatedAt, username } = action.payload;
      return {
        bio,
        createdAt,
        email,
        id,
        image,
        token,
        updatedAt,
        username,
      };
    case "USER_LOG_OUT":
      return {
        ...state.user,
      };
    default:
      return state;
  }
};

export default reducer;
