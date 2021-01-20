


export default asyncFetch =(url, request) => {
    return fetch(url, request)
      .then((response) => response.json())
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw {message: error.message}
      });
  };