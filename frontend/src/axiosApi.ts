import axios from "axios";
import {apiURl} from "./constans";

const axiosApi = axios.create({
  baseURL: apiURl
});

export default axiosApi;