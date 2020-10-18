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



export { fetchRequst, fetchPopularTags, fetchArticles }