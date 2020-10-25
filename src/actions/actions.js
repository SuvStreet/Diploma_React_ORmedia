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

export { userLoginIn, userLoginOut };