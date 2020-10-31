import axios from "axios";

const token = localStorage.getItem("diplomaToken");

const API = axios.create({
  baseURL: "https://conduit.productionready.io/api",
  responseType: "json",
});

API.defaults.headers.common['Authorization'] = ` ${token ? `Token ${token}` : ""}`;

export { API }