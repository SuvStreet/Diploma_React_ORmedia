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
  },
  articlePopularTags: {
    tab: 2,
    tag: "",
  }
};

/* console.log("####: action", action);
console.log("####: state", state); */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOG_IN":
      const { bio, createdAt, email, id, image, token, updatedAt, username } = action.payload;
      return {
        ...state,
        user: {
          bio,
          createdAt,
          email,
          id,
          image,
          token,
          updatedAt,
          username,
        }
      };
    case "USER_LOG_OUT":
      return {
        ...state,
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
    case "USER_UPDATA":
      return {
        ...state,
        user: {
          bio: action.payload.bio,
          createdAt: action.payload.createdAt,
          email: action.payload.email,
          id: action.payload.id,
          image: action.payload.image,
          token: action.payload.token,
          updatedAt: action.payload.updatedAt,
          username: action.payload.username,
        }
      };
    case "POPULAR_TAGS":
      const { tab, tag } = action.payload;
      return {
        ...state,
        articlePopularTags: {
          tab: tab,
          tag: tag,
        }
      };
    case "POPULAR_TAGS_FOUS_LOST":
      return {
        ...state,
        articlePopularTags: {
          tab: 2,
          tag: "",
        }
      };
    default:
      return state;
  }
};

export default reducer;
