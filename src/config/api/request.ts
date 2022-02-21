import axios, { Method, AxiosRequestConfig } from "axios";
import { useNotification } from "naive-ui";
// @ts-ignore
import store from "@/config/store/index";

export type TResult<T = any> = Promise<{
  data: T;
  code: number | string;
  count?: number;
  msg: string;
}>;

const notification = useNotification()
const request = axios.create({
  baseURL: import.meta.env.VITE_API_HOST as string,
  headers: { "Content-Type": "application/json" },
  withCredentials: false
});

request.interceptors.request.use(
  config => config,
  error => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (res: any) => {
    const { code, message } = res.data || {};
    if (code) {
      switch (Number(code)) {
        case 200:
          return res.data;
        case 505:
          return res.data;
        case 506:
          return res.data;
        case 1005: // 登录过期
          store.dispatch("loginOut");
          return;
        default:
          notification['error']({
            content: "错误提示" ,
            meta: message || "服务器错误",
          });
          return Promise.reject(res.data);
      }
    }
    return res.data;
  },
  err => {
    switch (err?.response?.status) {
      case 400:
        break;
      case 401:
        break;
      case 405:
      case 500:
      default:
        break;
    }
    return Promise.reject(err.response);
  }
);

interface RequestOptions extends Partial<AxiosRequestConfig> {
  isAuth?: boolean;
  urlFields?: string[];
  isForm?: boolean;
  transformParams?: (params: any) => any;
}

const createMethod = (method: Method = "get") => (
  url: string,
  options?: RequestOptions
) => {
  const {
    urlFields,
    isAuth = true,
    isForm = false,
    headers = {},
    transformParams,
    params,
    ...args
  } = options || {};

  let data = ["get"].includes(method) ? { params } : { data: params };

  // 处理formdata形式
  if (isForm) {
    const formParams = new FormData();
    for (const key in params) {
      formParams.append(key, params[key]);
    }
    data.data = formParams;
    (options as any).headers = Object.assign({}, options?.headers, {
      "Content-Type": "multipart/form-data"
    });
  }
  if (typeof transformParams === "function") {
    data = transformParams(params);
  }
  // 过滤URl参数
  if (urlFields) {
    for (const key of urlFields) {
      url = url.replace(new RegExp(`:${key}`), (params as any)[key]);
    }
  }

  //接口增加权限token
  if (isAuth) {
    const { users } = store.state;
    if (users && users["token"]) {
      (headers as any)["token"] = users["token"];
    }
  }

  return request(url, {
    method,
    headers,
    ...data,
    ...args
  } as any) as Promise<any>;
};

export const Post = createMethod("post");
export const Get = createMethod("get");
export const Delete = createMethod("delete");
export const Put = createMethod("put");

export default request;
