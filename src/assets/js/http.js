/*****************************************************
 * 基于Axios封装的Http请求类，可支持不同域源的调用
 ****************************************************/
import md5 from './md5';
import fun from './fun';
import cryptoJS from 'crypto-js';
import Axios from 'axios';
import Cookie from 'cookie';
import helper from '@src/assets/js/helper'

/**
 * 数据加密
 * @param {data}
 * @param "ekey"
 * @return "MD5加密后的字符串"
 */
function encrypt(data, ekey) {
    data = cryptoJS.enc.Utf8.parse(data);
    let md5Key = md5.hex_md5(ekey);
    let key = cryptoJS.enc.Latin1.parse(md5Key.substring(0, 16));
    let iv = cryptoJS.enc.Latin1.parse(md5Key.substring(16, 32));
    let encrypted = cryptoJS.AES.encrypt(data, key, { iv: iv, mode: cryptoJS.mode.CBC, padding: cryptoJS.pad.ZeroPadding });
    return fun.urlsafe_b64encode(encrypted.toString());
}
function encryptStr(str) {
    let md5Str = md5.hex_md5(`${str}FE605C9343A3A47764598FDC184EC66F`).toUpperCase() + 'FE605C9343A3A47764598FDC184EC66F'.toUpperCase();
    return md5.hex_md5(md5Str)
}
function encryptData(path, data, expand, token) {
  token = '6680eea13f32f4a8f4e44718fb27c3fbj2ulfii1'
    const aes = 'AA22BF8D8F2B72DF529C9CB678EB0CCC';
    const md5str = "716186C3471A38A2828DA07D366EC4F2";
    let staffId =  0;
    let verison = 10000
    let encryptData = {};
    let ts = (new Date()).getTime().toString().substr(0, 10);
    let guid = fun.GUID();

    encryptData["function"] = path;
    encryptData["unique_data"] = `${staffId}|${verison}|${ts}|education_platform_web_${token}|5873575|${guid}`;
    encryptData["api_version"] = verison;
    encryptData["token"] = token;
    encryptData["input_data"] = fun.sortDict(data);
    if(encryptData["input_data"].password){
       encryptData["input_data"].password = encryptStr(encryptData["input_data"].password)
    }
    let encryptDataJson = JSON.stringify(encryptData);
    let encryptDataStr = encrypt(encryptDataJson, aes);
    let expandData = expand != null ? expand : {};
    let expandDataJson = JSON.stringify(expandData)
    let signStr = md5.hex_md5(encryptDataStr + "&" + expandDataJson + "&" + md5str);
    signStr =
      signStr.substring(0, 10) +
      guid.substring(0, 5) +
      signStr.substring(10, 20) +
      guid.substring(5, 10) +
      signStr.substring(20, 30) +
      guid.substring(10, 15) +
      signStr.substring(30, 32);

    let formData = new FormData();
    formData.append("encrypt", encryptDataStr)
    formData.append("expand", expandDataJson)
    formData.append("sign", signStr)
    if(data.file) {
      formData.append("file",data.file);
    }
    /*if(process.env.NODE_ENV !== 'production'){
      logZYKJ("API请求参数:", encryptData);
    }*/
    // logZYKJ("API请求参数:", encryptData);
    window.console.log("API请求参数:", encryptData)
    return formData;
}

/**
 * 数据解密
 * @param "word"
 * @param "ekey"
 * @return "MD5解密后的字符串"
 */
function decrypt(word, ekey) {
    word = fun.urlsafe_b64decode(word);
    let md5Key = md5.hex_md5(ekey);
    let key = cryptoJS.enc.Latin1.parse(md5Key.substring(0, 16));
    let iv = cryptoJS.enc.Latin1.parse(md5Key.substring(16, 32));
    let decrypted = cryptoJS.AES.decrypt(word, key, { iv: iv, mode: cryptoJS.mode.CBC, padding: cryptoJS.pad.ZeroPadding });
    return cryptoJS.enc.Utf8.stringify(decrypted).toString();
}

function resetLoginDo(){
    let expires = new Date();
    document.cookie = Cookie.serialize('accountInfo', '', {path: "/", expires});
    document.cookie = Cookie.serialize('loginTime', '', {path: "/", expires});
    helper.cookieUtils.removeItem('remeberPsw')
    helper.cookieUtils.removeItem('student_list')
}
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
 * 全局默认配置
 */
Axios.defaults.baseURL = process.env.VUE_APP_SERVER;
Axios.defaults.timeout = 60000;
Axios.defaults.withCredentials = true;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Axios.defaults.transformRequest = (req, headers) => {
    if(typeof(req["function"]) !== 'undefined'){
        let path = req["function"];
        delete req["function"];
        // let info = vm.$store.getters['account/info'];
        // let token = '123';
        let token
        // 移动端需要用到token
        if(getQueryVariable('a')){
            token = getQueryVariable('a')
        }else{
            // token = info.token;
        }
        // console.log(getQueryVariable('a'),'djsadjaskdkjas')
        req = encryptData(path, req, {}, token);
    }
    return req;
};
Axios.defaults.transformResponse = (res,a,b,c) => {
    res = JSON.parse(res);
    let {error_code, message, data} = res;
    // error_code = 20000 //更新后登录卡死测试
    if(error_code){
        let duration = 4500;
        if (error_code == 19004) {

        }
        if(error_code == 19005){
            //localStorage.clear();
            duration = 2000;
            resetLoginDo()
            setTimeout(() => {
                if(typeof(vm) !== 'undefined') {
                    if(vm.$store){
                        vm.$store.dispatch('account/updateStatus', -1);
                    }else{
                      vm.$router.push({name: 'sign_in'});
                    }
                }else{
                    window.location.href = '/home/login';
                }
            }, 2000);
        } 
        if(typeof(vm) !== 'undefined') {
          let type = error_code!=0?'error':'warning';
          let customClass = "message-" + error_code;
          let isExist = !!document.querySelectorAll('.'+ customClass).length;
          if(error_code!=20002 && error_code!=20003&&error_code != 19004){
              !isExist && vm.$message({type, customClass, message, duration,offset:150});
          }
        }else{
            if(error_code!=20002 && error_code!=20003&&error_code != 19004){
                alert(message);
            }
        } 
    }
    return res;
};

export default function request(method, url, path, d_p, config) {
    // debugger
    let data = undefined;
    let params = undefined;
    method = method.toLowerCase();
    if (method === 'get') {
        params = d_p || {};
    }else{
        data = d_p || {};
    }
    //开发环境启用mock
    // window.console.log(process.env.NODE_ENV,999);
    let isMock = (process.env.NODE_ENV === 'development') && false;
    if(typeof(config) !== 'undefined'){
        if(typeof(config.isMock) !== 'undefined'){
            isMock = config.isMock;
            delete config.isMock;
        }
    }
    if(isMock){
        url = url + (path.indexOf('/') === 0 ? path.substr(1) : path);
    }else{
        data = d_p || {};
        data["function"] = path;
    }
    //合并请求
    if(url instanceof Array){
        return Axios.all([

        ]).then(Axios.spread(function () {
            
        }));
    }else{
        return Axios(Object.assign({
            method,
            url,
            data,
            params
        }, config)).then((response) => {
            let res = response.data
            if(res.error_code){
                window.console.log('请求报错======>', path);
            }
            return response.data;
        }).catch((error) => {
            console.log('服务端请求/响应错误：', error, error.config);
            return Promise.reject(error);
        })
    }
}

export const getWeb = (path, params, config) => request('GET', '', path, params, config);
export const postWeb = (path, body, config) => request('POST', '', path, body, config);
export const uploadWeb = (path, body, config) => request('POST', '/upload/', path, body, config);

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
  postEduWeb(path, (params || {}), config).then((res) => {
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
  })
};
export const changeBaseUrl = url => {
    Axios.defaults.baseURL = url
}