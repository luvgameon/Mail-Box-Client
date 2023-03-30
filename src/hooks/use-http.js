import axios from "axios";
const usehttp = (url, myfun) => {
  const fetch = async () => {
    const data = await axios.get(url);
    const respose = await data.data;

    myfun(respose);
  };

  return fetch;
};

export default usehttp;
