import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://finix-burger-default-rtdb.firebaseio.com/",
});

export default instance;
