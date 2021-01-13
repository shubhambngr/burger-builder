import axios from "axios";

const instance = axios.create({
  baseURL: "https://myburger-97d2b-default-rtdb.firebaseio.com",
});

export default instance;
