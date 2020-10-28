const userLoginIn = (user) => {
  return {
    type: "USER_LOG_IN",
    payload: {
      ...user
    }
  };
};

const userLoginOut = (user) => {
  return {
    type: "USER_LOG_OUT",
    payload: {
      ...user
    }
  };
};

const popularTags = (article, tab, tag) => {
  return {
    type: "POPULAR_TAGS",
    payload: {
      article,
      tab,
      tag
    }
  };
};

const popularTagsFocusLost = () => {
  return {
    type: "POPULAR_TAGS_FOUS_LOST",
  };
};

export { userLoginIn, userLoginOut, popularTags, popularTagsFocusLost };