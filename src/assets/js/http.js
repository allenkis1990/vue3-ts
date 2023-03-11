/*****************************************************
 * 基于Axios封装的Http请求类，可支持不同域源的调用
 ****************************************************/
import { enc, HmacSHA256 } from "crypto-js";
import Axios from "axios";
import md5 from './md5.js';

/**
 * 获取访问token
 * @return "token"
 */
let getToken = function() {
  let vm = window.vm || null;
  let accountInfo =
    (vm && vm.$store && vm.$store.getters["account/info"]) || {};
  return getQueryVariable('a') || accountInfo.token ||"2fcf5ddcb232e63ecccf1173713dc1e8grlsvug2";
};

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
/**
 * 获取签名串sign
 * @param "path"
 * @param {data}
 * @param "path"
 * @return "sign"
 */
let SecretKey = "piw38kulfozrea7ydmjnvbc965q1gt2x";
let createSign = function(method, URL, param, ClientTimestamp) {
  if(param!=undefined&&typeof (param["password"]) !== 'undefined'){
    param["password"] = md5.hex_md5(md5.hex_md5(param["password"] + 'FE605C9343A3A47764598FDC184EC66F').toUpperCase() + 'FE605C9343A3A47764598FDC184EC66F').toUpperCase();
  }
  let StringToSign =
    method +
    "\n" +
     "/zykj-api/student-web"+URL +
    "\n" +
    ClientTimestamp +
    "\n" +
    (param ? JSON.stringify(param) : "");
  // console.log(StringToSign);
  // debugger
  let HmacSignature = enc.Base64.stringify(HmacSHA256(StringToSign, SecretKey));
  let Base64URL = function(base64Str) {
    let safeB64 = base64Str.replace(/\+/g, "-");
    safeB64 = safeB64.replace(/\//g, "_");
    let mod4 = safeB64.length % 4;
    let modAddStr = "====";
    safeB64 = safeB64 + modAddStr.substring(0, mod4);
    return safeB64;
  };
  //console.log(HmacSignature, Base64URL(HmacSignature), StringToSign);
  return Base64URL(HmacSignature);
};

/**
 * 全局默认配置
 */
Axios.defaults.baseURL = process.env.VUE_APP_SERVER;
Axios.defaults.timeout = 60000;
Axios.defaults.withCredentials = true;
let transformRequest = (req, headers) => {
  if (headers && headers["Content-Type"].indexOf("multipart/form-data") != -1) {
    let formData = new FormData();
    for (let key in req) {
      formData.append(key, req[key]);
    }
    return formData;
  }

  return JSON.stringify(req);
};
let transformResponse = (res) => {
  res = JSON.parse(res);
  let { error_code, message } = res;
  if (error_code) {
    let duration = 4500;
    //登录失效
  }
  return res;
};

export default function request(method, url, path, d_p, config) {
  let data = undefined;
  let params = undefined;
  method = method.toUpperCase();
  url = url + (path.indexOf("/") === 0 ? path.substr(1) : path);
  //开发环境启用mock
  let isMock = window.isMock;
  if (typeof config !== "undefined") {
    if (typeof config.isMock !== "undefined") {
      isMock = config.isMock;
      delete config.isMock;
    }
  }
  if (isMock) {
    //mock接口要禁用上传进度回调
    if (config && config.onUploadProgress) {
      delete config.onUploadProgress;
    }
  }
  // 签名规则url前必须含有斜杆
  let signPath = path
  if (path[0] !== '/') {
     signPath = '/' + path
  }
  //合并请求
  let timestamp = new Date().getTime();
  let headers = {
    ts: timestamp,
    sign: createSign(method, signPath, d_p, timestamp),
    token: getToken(),
  };
  switch (method) {
    case "Get":
      params = d_p || {};
      break;
    default:
    case "POST":
      data = d_p || {};
      headers["Content-Type"] =
        config && config.contentType ? config.contentType : "application/json";
      break;
  }
  if (url instanceof Array) {
    return Axios.all([]).then(Axios.spread(function() {}));
  } else {
    return Axios(
      Object.assign(
        {
          headers,
          method,
          url,
          data,
          params,
          transformRequest,
          transformResponse,
        },
        config
      )
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        errorZYKJ('服务端请求/响应错误：', error, error.config);
        if(error.message === 'Network Error'){
          vm.$store.dispatch('account/reset',{},{root:true});
          window.location.replace('/');
          vm.$message.error('服务器异常');
        }
        return Promise.reject(error);
      });
  }
}

export const httpGet = (path, params, config) =>
  request("GET", "/oe/b/", path, params, config);
export const httpPost = (path, body, config) =>
  request("POST", "/oe/b/", path, body, config);
export const httpPatch = (path, body, config) =>
  request("PATCH", "/oe/b/", path, body, config);
export const httpPut = (path, body, config) =>
  request("PUT", "/oe/b/", path, body, config);
export const httpDelete = (path, body, config) =>
  request("DELETE", "/oe/b/", path, body, config);

export const getWeb = (path, params, config) =>
  request("GET", "", path, params, config);
export const postWeb = (path, body = {}, config) =>
  request("POST", "", path, body, config);
export const uploadWeb = (path, body = {}, config) => {
  config = Object.assign({}, config, {
    contentType:
      "multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
  });
  return request("POST", "/oe/b/", path, body, config);
};

/**
 * Array/Object原型扩展，根据URL赋值数组
 * @author liubaohuo
 * @param variable <Array/Object> 变量
 * @param path <String> 支持完整URL，默认资源中心地址
 * @param params <Object> 数据参数
 * @param config <Object> 请求配置
 */
export const assignByUrl = (variable, path, params, config) => {
  let self = variable;
  //不能直接赋值，因为Vue对组件定义的数组进行观察者模式的封装
  if (self instanceof Array) {
    self.splice(0, self.length);
  } else {
    for (var key in self) {
      delete self[key];
    }
  }
  postWeb(path, params || {}, config).then((res) => {
    let { error_code, data } = res;
    if (!error_code) {
      //不能直接赋值，因为Vue对组件定义的数组进行观察者模式的封装
      let fieldData = data;
      if (config && config.field) {
        fieldData = data[config.field];
        delete config.field;
      }
      if (fieldData instanceof Array) {
        self.push(...fieldData);
      } else {
        for (var key in fieldData) {
          if (vm) {
            vm.$set(variable, key, fieldData[key]);
          } else {
            self[key] = fieldData[key];
          }
        }
      }
    }
  });
};
export const changeBaseUrl = url => {
  Axios.defaults.baseURL = url
};
