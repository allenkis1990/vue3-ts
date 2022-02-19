/*****************************************************
 * JS公共函数，不对外产生依赖，可独立运行
 ****************************************************/

/**
 * 字典排序
 * @param <Object> dict
 * @return "替换后的字符串"
 */
function sortDict(dict) {
  let sortDic = {};
  let keys = Object.keys(dict);
  let keysLen = keys.length;
  for (let index = 0; index < keysLen; index++) {
    sortDic[keys[index]] = dict[keys[index]];
  }
  // logZYKJ(sortDic);
  return sortDic;
}

/**
 * 生成全局唯一标识
 * @author liubaohuo#gmail.com
 * @return <String>
 */
function GUID() {
  let guid = "";
  for (let i = 1; i <= 32; i++) {
    let n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
    // if((i==8)||(i==12)||(i==16)||(i==20))
    // guid += "-";
  }
  return guid;
}

/**
 * 把字符+和/分别变成-和_,把=去掉
 * @author liubaohuo#gmail.com
 * @param base64Str <String>
 * @return <String> 替换后的字符串
 */
function urlsafe_b64encode(base64Str) {
  let safeB64 = base64Str.replace(/\+/g, "-");
  safeB64 = safeB64.replace(/\//g, "_");
  safeB64 = safeB64.replace(/\=/g, "");
  return safeB64;
}

/**
 * 需要加上=把Base64字符串的长度变为4的倍数，就可以正常解码
 * @author liubaohuo#gmail.com
 * @param base64Str <String>
 * @return <String> 替换后的字符串
 */
function urlsafe_b64decode(base64Str) {
  let safeB64 = base64Str.replace(/\-/g, "+");
  safeB64 = safeB64.replace(/\_/g, "/");
  let mod4 = safeB64.length % 4;
  let modAddStr = "====";
  safeB64 = safeB64 + modAddStr.substring(0, mod4);
  return safeB64;
}

/**
 * 将File对象转换成二进制文件URL
 * @author liubaohuo#gmail.com
 * @param file <FileObject>
 * @return <String> 二进制文件URL
 */
function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

/**
 * 获取URL的后缀名
 * @author liubaohuo#gmail.com
 * @param url <String>
 * @return <String> 后缀名
 */
function getExtName(url) {
  let extName = url.substring(url.lastIndexOf(".") + 1, url.indexOf("?"));
  return extName;
}

/**
 * 格式化日期时间
 * @author liubaohuo#gmail.com
 * @param dt <Date, Number>
 * @param fmt <String>
 * @return <String> 格式化日期时间
 */
function fmtDateTime(dt, fmt) {
  let datetime = null;
  if (dt instanceof Date) {
    datetime = dt;
  } else {
    datetime = new Date(dt);
    if (dt.length === 10) {
      datetime = new Date(dt * 1000);
    }
    if (dt.length === 13) {
      datetime = new Date(+dt);
    }
  }

  if ((datetime instanceof Date) && !isNaN(datetime.valueOf())) {
    return datetime.format(fmt || 'yyyy-MM-dd hh:mm:ss');
  } else {
    return "";
  }
}

/**
 * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
 * @author liubaohuo
 * @param fn <Function> 需要调用的函数
 * @param delay <Number> 延迟时间，单位毫秒
 * @param isImmediate <Boolean> 是否立即执行函数，而不是delay后执行
 * @param isDebounce <Boolean> 是否去抖动
 * @return <Function> 实际调用函数
 */
function throttle(fn, delay, isImmediate, isDebounce) {
  var curr = +new Date(), //当前事件
    last_call = 0,
    last_exec = 0,
    timer = null,
    diff, //时间差
    context = this, //上下文
    args,
    exec = function () {
      last_exec = curr;
      fn.bind(context, ...args)();
    };
  return function () {
    curr = +new Date();
    context = this;
    args = arguments;
    diff = curr - (isDebounce ? last_call : last_exec) - delay;
    clearTimeout(timer);
    if (isDebounce) {
      if (!isImmediate) {
        timer = setTimeout(exec, delay);
      } else if (diff >= 0) {
        exec();
      }
    } else {
      if (diff >= 0) {
        exec();
      } else if (!isImmediate) {
        timer = setTimeout(exec, -diff);
      }
    }
    last_call = curr;
  }
}

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
 * @author liubaohuo
 * @param fn <Function> 要调用的函数
 * @param delay <Number> 空闲时间
 * @param immediate <Boolean> 是否立即执行函数，而不是delay后执行
 * @return <Function> 实际调用函数
 */
function debounce2(fn, delay, isImmediate = false) {
  return throttle(fn, delay, isImmediate, true);
}

/**
 * 深拷贝对象
 * @author zengxiaofang
 * @param <Object> 对象
 * @return <Object> 新对象
 */
function copyDeepObject(obj) {
  let newObj;
  if (Object.prototype.toString.call(obj) === "[object Object]") {
    newObj = {};
    for (let key in obj) {
      if (typeof obj[key] == "object") {
        newObj[key] = copyDeepObject(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  } else if (Object.prototype.toString.call(obj) === "[object Array]") {
    newObj = [];
    obj.forEach(item => {
      if (typeof item == "object") {
        newObj.push(copyDeepObject(item));
      } else {
        newObj.push(item);
      }
    });
  }
  return newObj;
}

/**
 * 判断两个对象是否相等
 * @author zengxiaofang
 * @param obj1 <Object> 对象1
 * @param obj2 <Object> 对象2
 * @return <Boolean> 是否相等
 */
function diffObject(obj1, obj2) {
  if (Object.keys(obj1).length != Object.keys(obj2).length) {
    return false;
  }
  for (let key in obj1) {
    if (obj2.hasOwnProperty(key)) {
      if (!Object.is(obj1[key], obj2[key])) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  }
}

/**
 * 判断两个数组是否相等
 * @author liubaohuo
 * @param arr1 <Array> 数组1
 * @param arr2 <Array> 数组2
 * @return <Boolean> 是否相等
 */
function diffArray(arr1, arr2) {
  if (arr1.length != arr2.length) {
    return false;
  }
  let isExist = true;
  arr1.forEach((item, index) => {
    if(!Object.is(item, arr2[index])){
      isExist = false;
    }
  })
  return isExist;
}

/**
 * 格式化富文本(JSON转HTML)
 * @author liubaohuo#gmail.com
 * @param content <String> 
 * @return <String>
 */
function fmtJSON2HTML(content) {
  const args = Array.from(arguments);
  if (args.length === 4) content = args[2];
  try {
    content = JSON.parse(content);
    content = $.json2html({}, content);
  } catch (Ex) {
    warnZYKJ('json2html转化出错：', Ex);
  }
  return content;
}

/**
 * 格式化富文本(HTML转JSON)
 * @author liubaohuo#gmail.com
 * @param content <String> 
 * @return <String>
 */
function fmtHTML2JSON(content) {
  const args = Array.from(arguments);
  if (args.length === 4) content = args[2];
  try {
    content = $.html2json($(content));
    content = JSON.stringify(content);
  } catch (Ex) {
    warnZYKJ('html2json转化出错：', Ex);
  }
  return content;
}

/**
 * 格式化时长
 * @author liubaohuo#gmail.com
 * @param second <Number> 
 * @return <String>
 */
function fmtSecond(second) {
  let ss = Math.floor(second % 60);
  let mm = Math.floor((second / 60) % 60);
  let HH = Math.floor(second / 60 / 60);
  let result = [];
  if (HH) {
    result.push(HH + '时');
  }
  if (mm) {
    result.push(mm + '分');
  }
  if (ss) {
    result.push(ss + '秒');
  }
  return result.join(' ');
}

/**
 * 格式化浮点串
 * @author liubaohuo#gmail.com
 * @param float_nubmer <Number> 
 * @return <String>
 */
function fmtFloatNumber(float_nubmer) {
  return parseFloat(float_nubmer).toString();
}

/**
 * 获取深层的数据
 * @author liubaohuo
 * @param parent <Objecy/Array> 
 * @param level <String> 
 * @param defaultValue <Any> 
 * @return <Any>
 */
function getDeepData(parent, level, defaultValue) {
  if (!parent) { return undefined; }
  let levels = level.match(/(\w+)/gi);
  let child = null;
  if(parent instanceof Array){
    child = parent.slice(0);
  }else{
    child = Object.assign({}, parent);
  }
  levels.forEach((item, index) => {
    if(typeof(child) !== 'undefined'){
      if(child instanceof Array){
        child = child.slice(item-1, 1);
      }else{
        child = child[item];
      }
    }
  })
  return child || defaultValue;
}

/**
 * 判断一个对象/数组/字符串是否为空
 * @author liubaohuo
 * @param arg <Objecy/Array/String> 
 * @return isEmpty
 */
function isEmpty2(arg) {
  if (!arg) { return true; }
  let isEmpty = false;
  if(typeof(arg) === "object"){
    if (arg instanceof Array) {
      isEmpty = (arg.length === 0);
    }else{
      isEmpty = (Object.keys(arg).length === 0);
    }
  }else{
    isEmpty = (arg.trim().length === 0);
  }
  return isEmpty;
}
/* 数字滚动方法 */
/* CountUp('显示数字dom','原数字','需滚动到的新数字','数字小数点后保留的位数','数字增长特效的时间,此处为2秒','其他配置项') 数字滚动方法 */
/* options: {
  useEasing: true, // 过渡动画效果，默认ture
  useGrouping: true, // 千分位效果，例：1000->1,000。默认true
  separator: ",", // 使用千分位时分割符号
  decimal: ".", // 小数位分割符号
  prefix: "", // 前置符号
  suffix: "", // 后置符号，可汉字
} */
/* CountUp.start() 开始滚动数字*/
function CountUp(target, startVal, endVal, decimals, duration, options) {
  var self = this;
  self.version = function() {
    return "1.9.2";
  };
  self.options = {
    useEasing: true,
    useGrouping: true,
    separator: ",",
    decimal: ".",
    easingFn: easeOutExpo,
    formattingFn: formatNumber,
    prefix: "",
    suffix: "",
    numerals: [],
  };
  if (options && typeof options === "object") {
    for (var key in self.options) {
      if (options.hasOwnProperty(key) && options[key] !== null) {
        self.options[key] = options[key];
      }
    }
  }
  if (self.options.separator === "") {
    self.options.useGrouping = false;
  } else {
    self.options.separator = "" + self.options.separator;
  }
  var lastTime = 0;
  var vendors = ["webkit", "moz", "ms", "o"];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] ||
      window[vendors[x] + "CancelRequestAnimationFrame"];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
  function formatNumber(num) {
    num = num.toFixed(self.decimals);
    num += "";
    var x, x1, x2, x3, i, l;
    x = num.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? self.options.decimal + x[1] : "";
    if (self.options.useGrouping) {
      x3 = "";
      for (i = 0, l = x1.length; i < l; ++i) {
        if (i !== 0 && i % 3 === 0) {
          x3 = self.options.separator + x3;
        }
        x3 = x1[l - i - 1] + x3;
      }
      x1 = x3;
    }
    if (self.options.numerals.length) {
      x1 = x1.replace(/[0-9]/g, function(w) {
        return self.options.numerals[+w];
      });
      x2 = x2.replace(/[0-9]/g, function(w) {
        return self.options.numerals[+w];
      });
    }
    return self.options.prefix + x1 + x2 + self.options.suffix;
  }
  function easeOutExpo(t, b, c, d) {
    return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
  }
  function ensureNumber(n) {
    return typeof n === "number" && !isNaN(n);
  }
  self.initialize = function() {
    if (self.initialized) {
      return true;
    }
    self.error = "";
    self.d =
      typeof target === "string" ? document.getElementById(target) : target;
    if (!self.d) {
      self.error = "[CountUp] target is null or undefined";
      return false;
    }
    self.startVal = Number(startVal);
    self.endVal = Number(endVal);
    if (ensureNumber(self.startVal) && ensureNumber(self.endVal)) {
      self.decimals = Math.max(0, decimals || 0);
      self.dec = Math.pow(10, self.decimals);
      self.duration = Number(duration) * 1000 || 2000;
      self.countDown = self.startVal > self.endVal;
      self.frameVal = self.startVal;
      self.initialized = true;
      return true;
    } else {
      self.error =
        "[CountUp] startVal (" +
        startVal +
        ") or endVal (" +
        endVal +
        ") is not a number";
      return false;
    }
  };
  self.printValue = function(value) {
    var result = self.options.formattingFn(value);
    if (self.d.tagName === "INPUT") {
      this.d.value = result;
    } else {
      if (self.d.tagName === "text" || self.d.tagName === "tspan") {
        this.d.textContent = result;
      } else {
        this.d.innerHTML = result;
      }
    }
  };
  self.count = function(timestamp) {
    if (!self.startTime) {
      self.startTime = timestamp;
    }
    self.timestamp = timestamp;
    var progress = timestamp - self.startTime;
    self.remaining = self.duration - progress;
    if (self.options.useEasing) {
      if (self.countDown) {
        self.frameVal =
          self.startVal -
          self.options.easingFn(
            progress,
            0,
            self.startVal - self.endVal,
            self.duration
          );
      } else {
        self.frameVal = self.options.easingFn(
          progress,
          self.startVal,
          self.endVal - self.startVal,
          self.duration
        );
      }
    } else {
      if (self.countDown) {
        self.frameVal =
          self.startVal -
          (self.startVal - self.endVal) * (progress / self.duration);
      } else {
        self.frameVal =
          self.startVal +
          (self.endVal - self.startVal) * (progress / self.duration);
      }
    }
    if (self.countDown) {
      self.frameVal = self.frameVal < self.endVal ? self.endVal : self.frameVal;
    } else {
      self.frameVal = self.frameVal > self.endVal ? self.endVal : self.frameVal;
    }
    self.frameVal = Math.round(self.frameVal * self.dec) / self.dec;
    self.printValue(self.frameVal);
    if (progress < self.duration) {
      self.rAF = requestAnimationFrame(self.count);
    } else {
      if (self.callback) {
        self.callback();
      }
    }
  };
  self.start = function(callback) {
    if (!self.initialize()) {
      return;
    }
    self.callback = callback;
    self.rAF = requestAnimationFrame(self.count);
  };
  self.pauseResume = function() {
    if (!self.paused) {
      self.paused = true;
      cancelAnimationFrame(self.rAF);
    } else {
      self.paused = false;
      delete self.startTime;
      self.duration = self.remaining;
      self.startVal = self.frameVal;
      requestAnimationFrame(self.count);
    }
  };
  self.reset = function() {
    self.paused = false;
    delete self.startTime;
    self.initialized = false;
    if (self.initialize()) {
      cancelAnimationFrame(self.rAF);
      self.printValue(self.startVal);
    }
  };
  self.update = function(newEndVal) {
    if (!self.initialize()) {
      return;
    }
    newEndVal = Number(newEndVal);
    if (!ensureNumber(newEndVal)) {
      self.error =
        "[CountUp] update() - new endVal is not a number: " + newEndVal;
      return;
    }
    self.error = "";
    if (newEndVal === self.frameVal) {
      return;
    }
    cancelAnimationFrame(self.rAF);
    self.paused = false;
    delete self.startTime;
    self.startVal = self.frameVal;
    self.endVal = newEndVal;
    self.countDown = self.startVal > self.endVal;
    self.rAF = requestAnimationFrame(self.count);
  };
  if (self.initialize()) {
    self.printValue(self.startVal);
  }
}
/* 判断pc或者移动端 */
function getEnvironment(){
  let result = ''
  if (/(iPhone|iPad|iPhone OS|Phone|iPod|iOS|Mac|Android)/i.test(navigator.userAgent)) {
      //移动端
      if(/Android/i.test(navigator.userAgent)) {
          result = "mobile";
      }else if(/Safari/i.test(navigator.userAgent)) {//为了解决ipad pro 和Mac 笔记本身份相同的问题；在Mac osx上不会有Safari标识；
          result = "pc";
      } else {
          result = "mobile";
      }
  } else {
      result = "pc";
  }
  return result
}

export default {
  debounce2,
  throttle,
  sortDict,
  GUID,
  urlsafe_b64encode,
  urlsafe_b64decode,
  getObjectURL,
  getExtName,
  fmtDateTime,
  fmtJSON2HTML,
  fmtHTML2JSON,
  fmtSecond,
  fmtFloatNumber,
  copyDeepObject,
  diffObject,
  diffArray,
  getDeepData,
  isEmpty2,
  CountUp,
  getEnvironment
}