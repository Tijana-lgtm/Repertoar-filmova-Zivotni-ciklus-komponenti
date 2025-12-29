import axios from "axios";

const AxiosConfig = axios.create({
  baseURL: "http://localhost:5111",
});

export default AxiosConfig;