import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-react-1ae1b.firebaseio.com/",
});

export default instance;
