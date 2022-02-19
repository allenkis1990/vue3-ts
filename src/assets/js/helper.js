/*****************************************************
 * JS辅助工具类
 ****************************************************/
import {postWeb} from './http';


var mediadevice = function () {

    var getDevices,
        getUserMedia,
        setVolume,
        getHeadphones,
        dispose;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;


    getDevices = function () {

        return new Promise(function (callback, reject) {
            if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
                navigator.mediaDevices.enumerateDevices().then(function (MediaDeviceInfo) {
                    var _devices = {
                        audio: [],
                        video: [],
                        headphones: []
                    };
                    var p1 = 1, p2 = 1, p3 = 1;
                    for (var mediaDeviceInfo in MediaDeviceInfo) {
                        var thisdevice = MediaDeviceInfo[mediaDeviceInfo],
                            temp = {};

                        temp.deviceId = thisdevice.deviceId;
                        temp.groupId = thisdevice.groupId;
                        temp.label = thisdevice.label;

                        // if(temp.label=='默认'||temp.label=='通讯')
                        //     continue;
                        if (thisdevice.kind === 'videoinput') {
                            if (temp.label === '') {
                                temp.label = '摄像头' + p2;
                                p2++;
                            }
                            if (temp.label.indexOf('前') >= 0 || temp.label.indexOf('正') >= 0)
                                _devices.video.splice(0, 0, temp);
                            else
                                _devices.video.push(temp);
                        }


                        /*麦克风*/
                        if (thisdevice.kind === 'audioinput'
                            && thisdevice.deviceId !== 'communications' && thisdevice.deviceId !== 'default') {
                            if (temp.label === '') {
                                temp.label = '麦克风' + p1;
                                p1++;
                            }

                            _devices.audio.push(temp)
                        }

                        /*耳机*/
                        if (thisdevice.kind === 'audiooutput'
                            && thisdevice.deviceId !== 'communications' && thisdevice.deviceId !== 'default') {
                            if (temp.label === '') {
                                temp.label = '扬声器' + p3;
                                p3++;
                            }
                            _devices.headphones.push(temp);
                        }
                    }
                    if (callback && typeof callback === 'function') callback(_devices);
                });
            } else {
                reject()
            }
        });
    };

    getUserMedia = function (option) {
        var _constraints = option || {
            audio: true,
            video: true
        };

        return new Promise(function (callback, reject) {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia(_constraints).then(function (mediaStream) {
                    // window.console.debug(1, mediaStream);

                    //1占用2没权限3没设备4未知
                    if (_constraints.video) {
                        var videoTracks = mediaStream.getVideoTracks();
                        if (!videoTracks.length) {
                            //无摄像头

                            callback(3)
                            return;
                        }
                        // window.console.debug('videoTracks[0].readyState : ' + videoTracks[0].readyState);
                        var createTime = Date.now();
                        videoTracks[0].onended = function () {
                            var diff = Date.now() - createTime;
                            window.console.debug('videoTracks[0].readyState : ' + diff);
                            if (diff > 2000) {
                                callback(mediaStream);
                                return;
                            }

                            callback(1);
                            return;
                        };
                    }
                    if (callback && typeof callback === 'function') callback(mediaStream);
                    // window.console.debug(2, mediaStream);
                }).catch(function (error) {
                    if (error) {
                        // window.console.error('getUserMedia error : ' + error.name);
                        var v;
                        switch (error.name) {
                            case 'NotAllowedError':
                            case 'PermissionDeniedError':
                                v = 2
                                break;
                            case 'TrackStartError':
                                v = 1

                                break;
                            case 'DevicesNotFoundError':
                                v = 3;
                                break;
                            case 'MediaStreamError':
                                //codova
                                if (error.message == 'getUserMedia() failed: video denied') {
                                    v = 2;
                                }
                                if (error.message == 'getUserMedia() failed: audio denied') {
                                    v = 2;
                                }
                                break;
                            default:
                                v = 4;
                                break;
                        }
                        callback(v);
                        return;
                    }

                    callback(4);
                    return;
                });
            } else {
                reject()
            }
        });
    };


    /**
     * 初始化 AudioContext 返回 mediaStreamSource && scriptProcessor
     * @param stream
     * @returns {Promise}
     */
    function initAudioContext(stream) {
        return new Promise(function (callback) {
            var mediaStreamSource, scriptProcessor, audioContext;
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                return window.console.warn('Web Audio API not supported.');
            }

            mediaStreamSource = audioContext.createMediaStreamSource(stream);
            scriptProcessor = audioContext.createScriptProcessor(0, 1, 1);
            mediaStreamSource.connect(scriptProcessor);
            scriptProcessor.connect(audioContext.destination);


            if (callback && typeof callback === 'function' && !!mediaStreamSource && !!scriptProcessor) callback({
                mediaStreamSource: mediaStreamSource,
                scriptProcessor: scriptProcessor,
                audioContext: audioContext

            });
        });
    }

    /**
     * 监听声音scriptProcessor
     * @param scriptProcessor
     * @param onprocess
     */
    function onAudioProcess(scriptProcessor, onprocess) {

        if (scriptProcessor)
            scriptProcessor.onaudioprocess = function (audioProcessingEvent) {

                var inputBuffer = audioProcessingEvent.inputBuffer;
                var outputBuffer = audioProcessingEvent.outputBuffer;

                for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
                    var inputData = inputBuffer.getChannelData(channel);
                    var outputData = outputBuffer.getChannelData(channel);

                    for (var sample = 0; sample < inputBuffer.length; sample++) {
                        outputData[sample] = inputData[sample];
                    }
                }
                if (onprocess) {
                    var input = audioProcessingEvent.inputBuffer.getChannelData(0);
                    var len = input.length;
                    var sum = 0.0;
                    for (var i = 0; i < len; ++i) {
                        sum += input[i] * input[i];
                    }
                    var volumeValue = Math.sqrt(sum / len);
                    volumeValue = (Math.sin(volumeValue * 3.1415 / 2)) * 100 >> 0;

                    onprocess(volumeValue);
                }


            }
    }

    /**
     * 声音显示
     * @param stream
     * @param dom
     * @returns {Promise}
     */
    setVolume = function (stream, onprocess) {
        return new Promise(function (callback) {
            initAudioContext(stream).then(function () {

                var mediaStreamSource = arguments[0].mediaStreamSource,
                    scriptProcessor = arguments[0].scriptProcessor,
                    audiocontext = arguments[0].audioContext;

                onAudioProcess(scriptProcessor, onprocess);
                var Acontext = {
                    mediaStreamSource: mediaStreamSource,
                    scriptProcessor: scriptProcessor,
                    audiocontext: audiocontext

                }
                callback(Acontext);

            });
        });
    };

    function initHeadphonesContext(stream) {
        return new Promise(function (callback) {
            var mediaStreamSource, scriptProcessor, audioContext;
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                return window.console.warn('Web Audio API not supported.');
            }

            mediaStreamSource = audioContext.createMediaStreamSource(stream);
            // scriptProcessor = audioContext.createScriptProcessor(0, 1, 1);
            // mediaStreamSource.connect(scriptProcessor);
            // scriptProcessor.connect(audioContext.destination);

            var biquadFilter = audioContext.createBiquadFilter();
            biquadFilter.type = "lowshelf";
            biquadFilter.frequency.value = 1000;
            biquadFilter.gain.value = 25;


            mediaStreamSource.connect(biquadFilter);
            biquadFilter.connect(audioContext.destination);


            if (callback && typeof callback === 'function' && !!mediaStreamSource && !!scriptProcessor) callback({
                mediaStreamSource: mediaStreamSource,
                scriptProcessor: scriptProcessor,
                audioContext: audioContext

            });
        });
    }

    function onHeadProcess(scriptProcessor, onprocess) {

        if (scriptProcessor)
            scriptProcessor.onaudioprocess = function (audioProcessingEvent) {

                if (onprocess) {
                    var input = audioProcessingEvent.inputBuffer.getChannelData(0);
                    var len = input.length;
                    var sum = 0.0;
                    for (var i = 0; i < len; ++i) {
                        sum += input[i] * input[i];
                    }
                    var volumeValue = Math.sqrt(sum / len);
                    volumeValue = (Math.sin(volumeValue * 3.1415 / 2)) * 100 >> 0;

                    onprocess(volumeValue);
                }

            }
    }

    getHeadphones = function (stream, onprocess) {

        return new Promise(function (callback) {
            initAudioContext(stream).then(function () {

                var mediaStreamSource = arguments[0].mediaStreamSource,
                    scriptProcessor = arguments[0].scriptProcessor,
                    audiocontext = arguments[0].audioContext;

                onHeadProcess(scriptProcessor, onprocess);
                let Acontext = {
                    mediaStreamSource: mediaStreamSource,
                    scriptProcessor: scriptProcessor,
                    audiocontext: audiocontext

                }
                callback(Acontext);

            });
        });
    }

    dispose = function (stream, audiocontext) {


        return new Promise(function (callback) {
            if (stream) {
                var trackList = stream.getTracks();
                for (var index in trackList) {
                    trackList[index].stop();
                }
                stream = null;
            }

            if (audiocontext) {
                if (audiocontext.mediaStreamSource) audiocontext.mediaStreamSource.disconnect();
                if (audiocontext.scriptProcessor) {
                    audiocontext.scriptProcessor.disconnect();
                    audiocontext.scriptProcessor.onaudioprocess = null;
                }
                if (audiocontext.audiocontext) {
                    audiocontext.audiocontext.close();
                    audiocontext.audiocontext = null;
                }
                audiocontext = null;
            }
            callback();
        });
    };


    return {
        getDevices: getDevices,
        getUserMedia: getUserMedia,
        setVolume: setVolume,
        getHeadphones: getHeadphones,
        dispose: dispose

    };
}();

var pdfHelper = function () {


    function getBrowserName() {

        var userAgent = navigator ? navigator.userAgent.toLowerCase() : "other";
        if (userAgent.indexOf("chrome") > -1) return "chrome";

        else if (userAgent.indexOf("safari") > -1) return "safari";

        else if (userAgent.indexOf("msie") > -1 || userAgent.indexOf("trident") > -1)

            return "ie";

        else if (userAgent.indexOf("firefox") > -1) return "firefox";

        return userAgent;

    }


    function getActiveXObject(name) {

        try {
            return new ActiveXObject(name);
        } catch (e) {
            window.console.log(e)
        }

    }


    function getNavigatorPlugin(name) {

        for (let key in navigator.plugins) {

            var plugin = navigator.plugins[key];

            if (plugin.name == name)

                return plugin;

        }

    }


    function getPDFPlugin() {

        if (getBrowserName() == 'ie') {
            return getActiveXObject('AcroPDF.PDF')
                || getActiveXObject('PDF.PdfCtrl');
        } else {
            return getNavigatorPlugin('Adobe Acrobat') || getNavigatorPlugin('Chrome PDF Viewer') || getNavigatorPlugin('WebKit built-in PDF');
        }

    }


    function isAcrobatInstalled() {
        return getPDFPlugin();
    }


    function getAcrobatVersion() {

        try {

            var plugin = getPDFPlugin();

            if (getBrowserName() == 'ie') {

                var versions = plugin.GetVersions().split(',');

                var latest = versions[0].split('=');

                return parseFloat(latest[1]);

            }

            if (plugin.version)

                return parseInt(plugin.version);

            return plugin.name;

        } catch (e) {

            return null;

        }

    }


    return {
        goPdf(path) {
            if (isAcrobatInstalled) {
                let popup = window.open('about:blank', '_blank')
                popup.document.write('<h2>加载中</h2>')
                popup.location = path
            } else {
                alert("你可能还没有安装pdf阅读器，为了方便你查看pdf文档，请下载！");
                window.location.href = "http://ardownload.adobe.com/pub/adobe/reader/win/9.x/9.3/chs/AdbeRdr930_zh_CN.exe";
            }
        }
    }
}()

var browserTester = {
    chrome() {
        return navigator.userAgent.indexOf("Chrome") > -1
    },
    safari() {
        return navigator.userAgent.indexOf("Safari") > -1
    },
    edge() {
        return navigator.userAgent.indexOf("Edge") > -1
    }
}

var cookieUtils = {
    setItem(key, value, expires) {
        let result = {key: key}
        let method = expires ? 'localStorage' : 'sessionStorage'
        result.value = value
        setExpires()
        window[method].setItem(key, JSON.stringify(result))

        function setExpires() {
            if (method === 'localStorage') {
                result.expires = expires
            }
        }
    },
    getItem(key,hasExpires){
        let res = null
        let method = hasExpires ? 'localStorage' : 'sessionStorage'
        let result = window[method].getItem(key)
        if(result){
            result = JSON.parse(result)
            if(Object.prototype.toString.call(result)==='[object Object]'){
                let value =  result.value
                if(method==='localStorage'){
                    let expireTime = result.expires
                    if(expireTime - new Date().getTime() <= 0){
                        this.removeItem(key)
                    }else{
                        res = value
                    }
                }else{
                    res = value
                }
            }
        }
        return res
    },
    removeItem(key){
        window.localStorage.removeItem(key)
        window.sessionStorage.removeItem(key)
    }
}


function deepCopy(target){
    var result
    var objType = isObj(target)?'object':(Array.isArray(target)?'array':'')
    if(typeof target!=='object'&&target!==null){
        result = target
    }else if(objType==='object'){
        result = {}
        for(let key in target){
            if(typeof target[key]==='object'){
                result[key] = deepCopy(target[key])
            }else{
                result[key] = target[key]
            }
        }
    }else if(objType==='array'){
        result = []
        for(let i = 0;i<target.length;i++){
            if(typeof target[i]==='object'){
                result[i] = deepCopy(target[i])
            }else{
                result[i] = target[i]
            }
        }
    }else{
        result = target
    }
    return result
}
function isObj(obj){
    var type = Object.prototype.toString.call(obj)
    if(type==='[object Object]'){
        return true
    }else{
        return false
    }
}

function windowOpen(url,type = '_blank'){
  let popup = window.open('about:blank',type)
  popup.document.write('<h2>加载中</h2>')
  popup.location =url
}

export default {
    mediadevice,
    pdfHelper,
    browserTester,
    cookieUtils,
    isObj,
    deepCopy,
    windowOpen
}