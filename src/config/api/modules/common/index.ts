import { Post, TResult, Get } from "../../request";

/**
 * @description 登录
 * @api http://api-center-bigdata.huan.tv/project/529/interface/api/8925
 */
export const LoginApi = (params: any): TResult<any> => {
  return Post("/test", { params });
};

export const GetAdTreeApi = (params: any): TResult<any> => {
  return Get(`/getAdTree`, { params });
};

// 保存或者修改自定义列头
export const UpdateCustomColumnsApi = (
  pageName: string,
  params: any[]
): TResult<any> => {
  return Post(`/custom_columns/${pageName}`, { params });
};
// 保存或者修改自定义列头
export const UpdateColumnsWidthApi = (
  pageName: string,
  params: any
): TResult<any> => {
  return Post(`/custom_columns/${pageName}/column_width`, { params });
};
// 获取验证码
export const GetCaptchaApi = (params: any): TResult<any> => {
  return Get(`/system/auths/code?email=${params}`);
};
// 重置密码
export const ResetPasswordsApi = (params: any): TResult<any> => {
  return Post("/system/auths/reset", { params });
};
