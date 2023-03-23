import { ModeType } from "@/types";
import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";

export type ResultType<T = unknown> = {
  code: number;
  data: T;
  message: string;
  error: string;
};

export type BaseUrlMapType = {
  [key in ModeType]: string;
};

const BASE_URL_MAP = {
  dev: process.env.PROXY_URL,
  sandbox: process.env.SANDBOX_URL,
  test: process.env.TEST_URL,
  prod: process.env.PROD_URL,
};

const { MODE } = process.env;

// 一般接口请求
const request = axios.create({
  baseURL: BASE_URL_MAP[MODE as ModeType] ?? "",
  timeout: 60000,
});

// 请求前拦截
request.interceptors.request.use((config: AxiosRequestConfig) => {
  let { data = {} } = config;
  if (config.method === "post") {
    if (Object.prototype.toString.call(data) === "[object FormData]") {
      // 提交文件
      // 添加公共参数 start
      // data.append("key", "value");
      // 添加公共参数 end
    } else if (Object.prototype.toString.call(data) === "[object URLSearchParams]") {
      // 提交表单参数
      // 添加公共参数 start
      // data.append("key", "value");
      // 添加公共参数 end
    } else {
      data = { ...data };
      // 添加公共参数 start
      // 添加公共参数 end
      Object.keys(data).forEach((item) => {
        if (data[item] === undefined || data[item] === null || data[item] === "") {
          delete data[item];
        }
      });
    }
    config.data = data;
  } else {
    config.params = data;
  }
  return config;
});

// 请求成功回调
function successCallback<T>(response: AxiosResponse<ResultType<T>>) {
  return response.data;
}
// 请求错误回调
function errorCallback<T>(error: AxiosError<ResultType<T>>) {
  return Promise.reject(error);
}

// 响应拦截
request.interceptors.response.use(successCallback, errorCallback);

export default request;
