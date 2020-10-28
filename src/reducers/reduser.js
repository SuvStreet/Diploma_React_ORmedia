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
    articlesPopTag: "",
    tab: "",
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
          ...state.user
        }
      };
    case "POPULAR_TAGS":
      console.log("####: action", action)
      const { article, tab, tag } = action.payload;
      return {
        ...state,
        articlePopularTags: {
          articlesPopTag: article,
          tab: tab,
          tag: tag,
        }
      };
    case "POPULAR_TAGS_FOUS_LOST":
      return {
        ...state,
        articlePopularTags: {
          articlesPopTag: "",
          tab: "",
          tag: "",
        }
      };
    default:
      return state;
  }
};

export default reducer;
