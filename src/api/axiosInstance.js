import { CONFIG } from "@/config/config";
import axios from "axios";
import store from "../store/index";
import router from "../router/index";
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "multipart/form-data"
  },
  baseURL: CONFIG.beastRoot
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = store.state.userInfo.token;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.config.url === "/api/info/logo") {
      Promise.reject(error);
      return;
    }
    if (!error.response) {
      router.push("/error/networkerror");
    } else {
      switch (error.response.status) {
        case 401:
          router.push("/error/401");
          break;
        case 404:
          router.push("/error/404");
          break;
        default:
          router.push("/error/500");
          break;
      }
    }
    Promise.reject(error);
  }
);
export default axiosInstance;
