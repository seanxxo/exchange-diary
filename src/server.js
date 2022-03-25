const GET = (uri) => {
  return fetch(`dummy${uri}.json`).then((response) => response.json());
};

export { GET };
