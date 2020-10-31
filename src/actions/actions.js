const userLoginIn = (user) => {
  return {
    type: "USER_LOG_IN",
    payload: {
      ...user
    }
  };
};

const userLoginOut = () => {
  return {
    type: "USER_LOG_OUT"
  };
};

const userUpdata = (user) => {
  return {
    type: "USER_UPDATA",
    payload: {
      ...user
    }
  };
};

const popularTags = (tab, tag) => {
  return {
    type: "POPULAR_TAGS",
    payload: {
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

export { userLoginIn, userLoginOut, userUpdata, popularTags, popularTagsFocusLost };