import axios from "axios";

const fetchRequst = async (numberPage) => {
  const res = await fetch(
    `https://conduit.productionready.io/api/articles?limit=10&amp;offset=${numberPage}.`
  );
  const body = await res.json();
  return body;
};

const fetchPopularTags = async () => {
  const res = await fetch(
    `https://conduit.productionready.io/api/tags`
  );
  const body = await res.json();
  return body;
};

const fetchArticles = async (slug) => {
  const res = await fetch(
    `https://conduit.productionready.io/api/articles/${slug}`
  );
  const body = await res.json();
  return body;
};

const fetchAPI = async (emailValue, passwordValue) => {
  const data = {
    user: {
      email: emailValue,
      password: passwordValue,
    }
  };
  const res = await fetch(
    `https://conduit.productionready.io/api/users/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const body = await res.json();
  return body;
};

const API = axios.create({
  baseURL: "https://conduit.productionready.io/api",
  responseType: "json",
});

const fetchFeedArticles = async (numberPage) => {
  const res = await fetch(
    `https://conduit.productionready.io/api/articles/feed?limit=10&offset=${numberPage}`
  );
  const body = await res.json();
  return body;
};

export { fetchRequst, fetchPopularTags, fetchArticles, API, fetchAPI, fetchFeedArticles }