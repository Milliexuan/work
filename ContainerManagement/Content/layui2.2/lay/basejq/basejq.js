/*
*前端网页数据处理（jQuery）
*张琪2016-1-27
*温州
*/
layui.define(["jquery", "layer", "bjconfig"], function (exports) {
    var layer = layui.layer, o = window, $ = layui.jquery;

    /*检查参数是否定义
    *@param para 必选
    *@return true false
    */
    var isDefine = function (para) {
        try {
            if (typeof (para) != "undefined") {
                return true;
            }
        } catch (e) { }
        return false;
    };
    //IE9以上或者非IE浏览器器返回ture,否则返回false
    var isUpIE = function () {
        var browser = navigator.appName;
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        if (version.length > 1) {
            var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));
            if (trim_Version < 9) {
                return false;
            }
        }
        return true;
    }
    var programType = layui.bjconfig.clientType;; //WX=微信项目,PC=桌面项目,YZL=云助理项目
    var setProgramType = function (j) {
        //var oo = j;
        //var value = "";
        //if (oo && (t = oo.match(/([^&=]+)=([^=&]+)/g))) {
        //    for (var l = 0; l < t.length; l++) {
        //        r = t[l];
        //        var tt = r.match(/([^&=]+)=([^=&]+)/);
        //        if (tt && tt[1] == "t")
        //            value = tt[2];
        //        break;
        //    }
        //}
        programType = j;
    }
    //JS路径
    var n = document;
    //jsPath = function () { var e = n.scripts, t = e[e.length - 1].src; return t.substring(0, t.lastIndexOf("/") + 1) }(),
    var jsPath = function () {
        var a = n.scripts;
        var e = "";
        for (i = 0; i < a.length; i++) {
            var d = a[i].src;
            //console.log(typeof d);
            if (d != '' && d.indexOf("layui") > 0) {
                var e = d.substring(0, d.lastIndexOf("layui"));
                if (d.indexOf("?") > 0) {
                    setProgramType(d.substring(d.indexOf("?") + 1, d.length));
                }
                break;
            }
        }
        return e + "lay/basejq/";
    }();
    //动态加载js
    loadJs = function (src, wtype) {
        y = n.getElementsByTagName("head")[0];
        var v = n.createElement("script");
        v.async = !0;
        v.charset = "utf-8";
        v.src = src;
        //+ function () {
        //  var e = o.version === !0 ? o.v || (new Date).getTime() : o.version || ""; return e ? "?v=" + e : ""
        // }();
        //u = "undefined" != typeof opera && "[object Opera]" === opera.toString();
        var p = function () {
            count--;
            if (eval("typeof " + wtype) == "undefined" && count > 0) {
                setTimeout(p, 20);
            }
            else {
                y.appendChild(v);
            }
        }
        var count = 100;
        if (typeof wtype == "string") {
            p();
        }
        else y.appendChild(v);

        //!v.attachEvent || v.attachEvent.toString && v.attachEvent.toString().indexOf("[native code") < 0 || u ? v.addEventListener("load", function (e) { s(e, h) }, !1) : v.attachEvent("onreadystatechange", function (e) { s(e, h) });
        //document.write('<script type="text/javascript" src="' + src + '"></script>');
    };

    //加载全部加密用JS
    var loadEncryptJs = function () {
        loadJs(jsPath + "encrypt/Barrett.js");
        loadJs(jsPath + "encrypt/BigInt.js");
        loadJs(jsPath + "encrypt/CodeManage.js");
        loadJs(jsPath + "encrypt/RSA.js");
        loadJs(jsPath + "encrypt/tripledes.js");
        loadJs(jsPath + "encrypt/mode-ecb-min.js", "CryptoJS");

    }
    /*JS加载完成后执行c,
    *@param b       字符串或者数组，需要检查等待准备好的方法
    *@param c       function,加载完需要执行的方法
    *@param a       可选 需要加载的JS  可以函数  也可以字符串
    */
    var afterLoad = function (b, c, a) {
        if (isDefine(a) && a != "") typeof a == "string" ? loadJs(a) : a();
        if (isDefine(b)) {
            if (isString(b)) { isDefine(eval("typeof " + b)) ? void (1) : void (1); }
        }
    }
    //jquery
    //if (!isUpIE()) {
    //    layui.link(jsPath + 'artdialog/css/ui-dialog.css"/>');
    //    loadJs(jsPath + "artdialog/dist/dialog-min.js");
    //}
    //if (typeof (JSON) == "undefined") loadJs(jsPath + "json.js");
    loadEncryptJs();
    //文件上传JS
    //loadJs(jsPath + "jquery-form.js", "$");
    //根路径计算
    var url = layui.bjconfig.bootUrl;
    //获取网站URL根目录
    var getRootUrl = function () {
        return url;
    }
    //加载弹出层JS


    //检查是否为函数
    var isFunc = function (func) {
        try {
            if (isDefine(func) && typeof (eval(func)) == "function") {
                return true;
            }
        } catch (e) { }
        return false;
    };

    var msgIndex;
    /*弹框提示信息,
    *@param msg     需要提示的信息(必选)
    *@param time    时间 不传默认2秒关闭，time=0按确定键关闭，time>0 停留时间为time秒,time <0 关闭 可选
    *@param yesFun  添加确定按钮响应方法 可选
    *@param noFun   添加取消按钮响应方法 可选
    */
    var showMsg = function (msg, time, yesFun, noFun) {
        var msgJson = {};
        //if (isUpIE()) {
        if (isDefine(yesFun) && isFunc(yesFun)) {
            msgJson = {
                content: msg, shadeClose: false, btn: ['确定', '取消'], yes: function (index) {
                    layer.close(index);
                    yesFun();
                }, btn2: function (index) {
                    layer.close(index);
                    if (isDefine(noFun) && isFunc(noFun)) noFun();
                }
            };
            if (!isDefine(noFun)) {
                msgJson.btn = ['确定'];
                delete msgJson.btn2;
            }
        }
        else {
            time = isDefine(time) ? time : 2; //--如果time没有定义，默认2秒后关闭提示信息
            time = time * 1000;
            if (time > 0) msgJson = { content: msg, time: time };
            else if (time < 0) msgJson = { content: msg, shadeClose: false, closeBtn: 0, type: 1 };
            else if (time == 0) msgJson = { content: msg, shadeClose: false, btn: ['确定'] };
        }
        return layer.open(msgJson);

    };
    //打开加载动画层
    var openLoadImg = function () {
        //if (isUpIE())
        return layer.load(1, { shade: [0.1, '#fff'] });
        // else showMsg("<img src='" + jsPath + "artdialog/loading-1.gif'/>", -1);
    }
    //关闭弹出层
    var closeMsg = function (index) {
        //if (isUpIE())
        if (isDefine(index))
            layer.close(index);
        else layer.closeAll();
        //else if (isDefine(msgIndex)) msgIndex.close().remove();
    }
    //检查参数是否是字符串类型
    var isString = function (para) {
        try {
            if (typeof (para) == "string") {
                return true;
            }
        } catch (e) { }
        return false;
    };
    //检查参数是否是对象
    var isObject = function (para) {
        try {
            if (typeof (para) == "object") {
                return true;
            }
        } catch (e) { }
        return false;
    };
    function textencode(str) {
        str = str.replace(/&amp;/gi, '&');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/{{/g, '');
        str = str.replace(/}}/g, '');
        return str;
    }

    function textdecode(str) {
        str = str.replace(/&amp;/gi, '&');
        str = str.replace(/&lt;/gi, '<');
        str = str.replace(/&gt;/gi, '>');
        return str;
    }
    //存储并隐藏数据域
    var dom = {};
    $(function () {
        $("*[bj-area]").each(function (n, o) {
            //存数据区域
            var bjArea = isDefine($(o).attr("bj-area")) ? $(o).attr("bj-area") : "";
            if (bjArea != "") {
                $("body").data(bjArea, $(o).html());
                //存上级数据区域名称
                var d = {};
                var bjPre = isDefine($(o).attr("bj-pre")) ? $(o).attr("bj-pre") : "";
                d.bjPre = bjPre;
                var bjData = isDefine($(o).attr("bj-data")) ? $(o).attr("bj-data") : "";
                d.bjData = bjData;
                var bjPara = isDefine($(o).attr("bj-para")) ? $(o).attr("bj-para") : "";
                d.bjPara = bjPara;
                d.sunArea = [];
                eval("dom." + bjArea + "=d");
                $(o).hide();
            }
            //eval("dom." + $(o).attr("bj-area") + "=" + textencode($(o).html()));
        });
        $("*[bj-pre]").each(function (n, o) {
            var a = isDefine($(o).attr("bj-area")) ? $(o).attr("bj-area") : "";
            if (a != "") {

                var ajson = {};
                ajson.area = a;
                eval("dom." + $(o).attr("bj-pre") + ".sunArea.push(ajson)");
            }
        });
    })

    /*生成随机数
    *@param n 位数
    *@return 生成的随机数
    */
    var MathRand = function (n) {
        var Num = "";
        for (var i = 0; i < n; i++) {
            Num += Math.floor(Math.random() * 10);
        }
        return Num;
    }

    //复制一个参数
    var param = function () {
        //ajax交互参数
        var para = {};
        para.reqCode = ""; 	//申请代码
        para.encrypt = false; //是否加密 true=加密；false=不加密；默认：false
        para.serialNo = ""; 	//调用流水
        para.reqData = {}; 	//参数
        para.loadImg = false; //是否弹出加载画面，ture=加载；false=不加载；默认：false
        para.async = true; 	//异步或同步，true=异步；false=同步；默认：true
        para.area = "";         //数据绑定区域，默认为""，不做绑定
        para.append = false;    //true:扩展；默认false:不扩展
        para.retSecret = false; //true：返回数据加密，默认false：不加密
        para.submit = "";       //数据提交区域，默认为"",不做动态数据组织
        para.bindId = "";       //通过ID去绑定
        para.noErrTip = false;  //不提示-9999错误提示;false:提示，true 不提示
        return para;
        //return JSON.parse(JSON.stringify(para));
    };

    //停止JS前要调用的函数
    var stopBeforeFunc = "";
    var SetStopBeforeFunc = function (func) {
        stopBeforeFunc = func;
    }
    //抛出异常停止后面所有JS
    var stopJs = function (msg) {
        if (isDefine(stopBeforeFunc) && isFunc(stopBeforeFunc)) {
            var a = stopBeforeFunc;
            stopBeforeFunc = "";
            a();
        }
        throw new Error("****stopJs：" + isDefine(msg) ? msg : "" + "****");
    }
    /*弹框提示信息,并停止JS的执行
    *@param msg     需要提示的信息(必选)
    *@param time    时间 不传默认2秒关闭，time=0按确定键关闭，time>0 停留时间为time秒,time <0 关闭 可选
    *@param yesFun  添加确定按钮响应方法 可选
    *@param noFun   添加取消按钮响应方法 可选
    */
    var showMsgT = function (msg, time, yesFun, noFun) {
        closeMsg();
        showMsg(msg, time, yesFun, noFun);
        stopJs(msg);
    };
    //ajax执行成功默认调用函数
    var sucessF = function (data) {
        return data;
    }
    //ajax执行失败默认调用函数
    var errorF = function (XMLHttpRequest, textStatus, errorThrown) {
        showMsg(JSON.stringify(XMLHttpRequest) + ";textStatus=" + textStatus, 10);
    }
    /*DES对称解密字符串
    *@param para  需要解密的字符串
    *@param key   解密钥匙
    *@return 解密后字符串
    */
    var decryptByDES = function (ciphertext, key) {
        //C# dCSP.Mode = CipherMode.ECB; //DESCryptoServiceProvider.Mode  ecb 
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var decrypted = CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
        }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    /*DES对称解密JSON对象中bjj_开头的数据值
    *@param para  需要解密的para对象
    *@param key   解密钥匙
    *@return 解密的结果对象
    */
    var decryptRetByDES = function (para, key) {
        if ($.isArray(para)) {
            for (var n = 0; n < para.length; n++) {
                para[n] = decryptRetByDES(para[n], key);
            }
        }
        else {
            for (var item in para) {
                if ($.isArray(para[item])) {
                    for (var n = 0; n < para[item].length; n++) {
                        para[item][n] = decryptRetByDES(para[item][n], key);
                    }
                }
                else {
                    if (isObject(para[item])) para[item] = decryptRetByDES(para[item], key);
                    else if (item.indexOf("bjj_") == 0) para[item] = decryptByDES(para[item], key);
                }
            }
        }
        return para;
    }
    var RSAKey;
    var setEncryptKey = function () {
        if (!isDefine(RSAKey)) {
            if (sessionStorage.getItem("RSA_E") == null) {
                var para = param();
                para.reqCode = "001";
                para.async = false;
                var data = p(para);
                sessionStorage.setItem("RSA_E", data.RetData.RSA_E);
                sessionStorage.setItem("RSA_M", data.RetData.RSA_M);
            }
            setMaxDigits(131);
            RSAKey = new RSAKeyPair(sessionStorage.getItem("RSA_E"), "", sessionStorage.getItem("RSA_M"));
        }
    }
    var encrypt = function (para) {
        if ($.isArray(para)) {
            for (var n = 0; n < para.length; n++) {
                para[n] = encrypt(para[n]);
            }
        }
        else {
            for (var item in para) {
                if ($.isArray(para[item])) {
                    for (var n = 0; n < para[item].length; n++) {
                        para[item][n] = encrypt(para[item][n]);
                    }
                }
                else {
                    if (isObject(para[item])) para[item] = encrypt(para[item]);
                    else if (item.indexOf("bjj_") == 0) para[item] = encryptOne(para[item]);
                }
            }
        }
        return para;
    }
    var encryptOne = function (value) {
        setEncryptKey();
        value = encryptedString(RSAKey, base64encode(strUnicode2Ansi(value)));
        return value;
    }
    var ajaxUrl = url + 'AjaxCommonIntf.aspx';
    var goLoginPage = function () {
        if (isDefine(window.parent) && window.parent.document.location.href.indexOf("/FramePage/") > 0) {
            window.parent.document.location.href = url + "framepage/gogateway.aspx";
        }
        else if (window.document.location.href.indexOf("/FramePage/") > 0)
            document.location.href = url + "framepage/gogateway.aspx";
        else document.location.href = url + "FramePage/ErrPage/Errorpage.aspx?zjmsg=您的登录已过期，请重新登录！"
        stopJs();
    }
    /*同步简单提交
    *@param reqCode 调用代码
    *@param reqData 参数JSON对象
    *@param retSecret 可选参数，是否加密返回数据，true加密
    *@return ajax调用返回的json数据
    */
    var ajaxPost = function (reqCode, reqData, retSecret) {
        if (!$.isEmptyObject(reqData)) reqData = encrypt(reqData);
        var para = param();
        para.reqCode = reqCode;
        para.reqData = reqData;
        para.async = false;
        para.retSecret = false;
        var randKey = "";
        if (isDefine(retSecret) && retSecret == true) {
            randKey = MathRand(16);
            para.randKey = encryptOne(randKey);
            para.retSecret = true;
        }
        var applData = JSON.stringify(para);
        var rData = "";
        $.ajax({
            type: "post",
            async: para.async,
            url: ajaxUrl,
            data: applData,
            success: function (data) {

                rData = $.parseJSON(data);
                if (rData.IsError) {
                    if (rData.RetCode == '-9999') showMsgT(rData.RetMsg, 0); //系统错误信息
                    else if (programType == "PC" && data.RetCode == '-9998') {
                        goLoginPage(); //登录过期跳转到登录页面
                    }
                }
                if (isDefine(retSecret) && retSecret == true && isDefine(rData.RetData)) {
                    rData.RetData = decryptRetByDES(rData.RetData, randKey);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                isDefine(error) ? error(XMLHttpRequest, textStatus, errorThrown) : errorF(XMLHttpRequest, textStatus, errorThrown);
            }
        });
        return rData;
    }

    /*异步简单提交
   *@param reqCode 调用代码
   *@param reqData 参数JSON对象
   @param  success 成功返回函数
   *@param retAll 传入true 返回所有数据，空或者其他：只返回有效数据 
   *@param retSecret 可选参数，是否加密返回数据，true加密
   *@return 返回结果集，自动提示所有IsError为true的所有信息
   */
    var postSim = function (reqCode, reqData, success, retAll, retSecret, error) {
        var para = new param();
        para.reqCode = reqCode;
        para.reqData = reqData;
        para.loadImg = true;
        if (isDefine(retSecret) && retSecret == true) para.retSecret = true;
        p(para, success, error, retAll, 1);
    }
    /*ajax提交
    *@param pm 入参
    *@param success ajax调用成功后执行函数（可选）
    *@param error ajax调用错误后执行函数（可选）
    @param retData null,false返回全部（可选）,TRUE只返回rows
    *@return ajax调用返回的json数据
    */
    var p = function (pm, success, error, retData, flag) {
        if (!isDefine(flag)) !isDefine(retData) ? retData == false : retData = retData;
        else !isDefine(retData) || retData == false ? retData = true : retData = false;
        if (!isDefine(pm)) { showMsgT('错误！ajax调用参数不能为空', 0); }
        if (isFunc(pm)) { pm = pm() } //pm是函数则调用函数
        else if (isString(pm)) {//pm是字符串，则使用eval转换看看
            try {
                pm = eval(pm);
            }
            catch (e) { showMsgT('错误！参数，' + pm + '，错误', 0); }
        }
        if (isDefine(success) && !isFunc(success)) { showMsgT('错误！执行成功回调参数不是一个函数', 0); }
        if (isDefine(error) && !isFunc(error)) { showMsgT('错误！执行出错回调参数不是一个函数', 0); }
        var loadIndex;
        if (pm.loadImg) loadIndex = openLoadImg();
        if (pm.submit != "") {
            pm.reqData = fieldValues(pm.submit);
        }
        if (!$.isEmptyObject(pm.reqData)) pm.reqData = encrypt(pm.reqData);
        if (pm.retSecret) {
            randKey = MathRand(16);
            pm.randKey = encryptOne(randKey);
        }
        var applData = JSON.stringify(pm);
        var rData;
        $.ajax({
            type: "post",
            async: pm.async,
            url: ajaxUrl,
            data: applData,
            success: function (data) {
                data = $.parseJSON(data);
                if (pm.retSecret == true && isDefine(data.RetData)) {
                    data.RetData = decryptRetByDES(data.RetData, randKey);
                }
                pdata = data;
                if (data.IsError) {
                    if (data.RetCode == '-9999' && pm.noErrTip == false) showMsgT(data.RetMsg, 0); //系统错误信息
                    else if (programType == "PC" && data.RetCode == '-9998') {
                        goLoginPage(); //登录过期跳转到登录页面
                    }
                }
                if (isDefine(data.RetData.rows)) data = data.RetData.rows;
                else data = data.RetData;
                rData = pdata;
                if (pm.area != "") bind(data, pm.area, pm.append); //数据区域参数不为空时，调用绑定函数bind
                else if (pm.bindId != "") bindById(data, pm.bindId, pm.append); //数据区域参数不为空时，调用绑定函数bind
                if (pm.loadImg) closeMsg(loadIndex);
                isDefine(success) && success != "" ? retData == true ? success(data) : success(pdata) : sucessF(pdata);

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (pm.noErrTip == false) isFunc(error) ? error(XMLHttpRequest, textStatus, errorThrown) : errorF(XMLHttpRequest, textStatus, errorThrown);
            }
        });
        return rData;
    };

    /*通过ID 绑定数据域
    *@param data 数据源JSON对象
    *@param id 数据域ID
    *@param append 绑定时时扩展还是替换 true：扩展 false:替换 默认扩展（可选）
    *@param r Obj 数据域对象(可选)
    */
    var bindById = function (data, id, append, rObj) {
        var obj = $("#" + id);
        if (isDefine(rObj)) {
            obj = rObj;
        }
        if (!isDefine(obj)) showMsgT("找不到id=" + id + "的DOM", 0);
        var temp = true;
        var repObj = obj;
        if (isDefine(obj.attr("bj-norepeat")) && obj.attr("bj-norepeat") == "true") {
            temp = false;
        }
        if (temp) {//需要借助临时
            var h = obj.data(id);
            if (!isDefine(h)) {
                h = obj.html();
                obj.data(id, h);
            }
            var tmpName = "bjTmp" + id;
            var tmpDiv = "<div id='" + tmpName + "' style='display:none'></div>";
            $("body").append(tmpDiv);
            repObj = $("#" + tmpName);
            repObj.html(h);
        }
        if ($.isArray(data)) {
            for (var n = 0; n < data.length; n++) {
                for (var item in data[n]) {

                    var itemObj = repObj.find("[id=" + item + "]");
                    var value = data[n][item];
                    var tValue = value;
                    if (isDefine(itemObj)) {
                        itemObj.each(function (j, o) {
                            if (isObject(value)) {
                                if (isEmpty($(o).html())) {
                                    tValue = JSON.stringify(value);
                                    setDomValue($(o), tValue);
                                }
                                else {
                                    bindById(value, item, false, $(o));
                                }
                            }
                            else setDomValue($(o), tValue);
                        });

                    }
                }
                if (temp) {
                    if (!append && n == 0) {
                        obj.html("");
                    }
                    repObj.children().clone().appendTo(obj);
                }
            }
        }
        else {
            for (var item in data) {

                var itemObj = repObj.find("[id=" + item + "]");
                var value = data[item];
                var tValue = value;
                if (isDefine(itemObj)) {
                    itemObj.each(function (j, o) {
                        if (isObject(value)) {
                            if (isEmpty($(o).html())) {
                                tValue = JSON.stringify(value);
                                setDomValue($(o), tValue);
                            }
                            else {
                                bindById(value, item, false, $(o));
                            }
                        }
                        else setDomValue($(o), tValue);
                    });

                }
            }
            if (temp) {

                if (!append && n == 0) {
                    obj.html("");
                }
                repObj.children().clone().appendTo(obj);
            }
        }
        if (temp) repObj.remove();
    }
    var setDomValue = function (obj, value) {
        if (obj.is("input") || obj.is("textArea") || obj.is("select")) {
            var oType = isDefine(obj.attr("type")) ? obj.attr("type").toLowerCase() : ""
            if (oType == "checkbox" || oType == "radio") {
                if (obj.attr("value") == value) {
                    obj.prop("checked", "true")
                }
                else {
                    obj.removeAttr("checked");
                }
            }
            else
                obj.val(value);
        }
        else obj.html(value);
    }
    //eval分装个出错报错
    var myEval = function (para) {
        try {
            return eval(para);
        }
        catch (e) {
            showMsgT("eval执行" + para + "出错！", 0);
        }
    }
    /*bj-area数据域绑定
    *@param data json数据源
    *@param area bj-area数据域名称
    *@param append 绑定时时扩展还是替换 true：扩展 false:替换 默认扩展（可选）
    */
    var bind = function (data, area, append) {
        if (!isDefine(area)) { showMsgT('错误！bind函数必须有数据区域参数', 0); }
        var $obj = $("*[bj-area=" + area + "]");
        if ($obj.length == 0) { showMsgT('错误！找不到数据区域' + area, 0); } //找不到数据区域报错
        else if ($obj.length > 1) { { showMsgT('错误！找不到数据区域' + area, 0); } } //找到多个数据区域报错
        var html = $("body").data(area);
        var ohtml = "";
        //开始组织数据
        if ($.isArray(data)) {
            for (var n = 0; n < data.length; n++) {
                ohtml += bindProHtml(data[n], area, html, n + 1);
            }
        }
        else ohtml += bindProHtml(data, area, html, 1);

        //空不显示
        if (ohtml != "") {//不为空，显示数据
            if (isDefine(append) && append == true) $obj.append(ohtml);
            else $obj.html(ohtml);
            $obj.show();
        }
        else {
            $obj.html("");
        }
    };
    /*html串数据处理
    *@param data json数据源
    *@param area bj-area数据域名称
    *@param html 需要处理的字符串
    *@return 处理后的html字符串
    */
    var bindProHtml = function (data, area, html, bj_index) {
        var sumAreas = eval("dom." + area + ".sunArea"); //子数据域集
        if (isDefine(sumAreas) && sumAreas.length > 0)//存在子数据域
        {
            for (var n = 0; n < sumAreas.length; n++) {
                var rHtml = "";
                var preArea = sumAreas[n].area;
                var preData;
                var preDataStr = eval("dom." + preArea + ".bjData");
                if (isDefine(preDataStr) && preDataStr != "")//存在数据属性
                {
                    preData = eval("data." + preDataStr);
                    if (!isDefine(preData)) preData = {};
                }
                else {//不存在数据属性
                    var prePara = eval("dom." + preArea + ".bjPara"); //取数参数
                    if (isDefine(prePara) && prePara != "") {//存在取数参数
                        if (prePara.indexOf("{{") > -1) {
                            prePara = replaceArea(data, area, prePara);
                        }
                        var preParam = myEval(prePara); //获取参数
                        preParam.async = false;
                        preParam.area = "";
                        preData = p(preParam); //取数据
                    }
                    else showMsgT("错误！子数据域" + preArea + "没有可绑定数据", 0);
                }
                var preHtml = $("body").data(preArea);
                if ($.isArray(preData))//数组多个
                {
                    for (var l = 0; l < preData.length; l++) {
                        rHtml += bindProHtml(preData[l], preArea, preHtml, l + 1);
                    }
                }
                else rHtml += bindProHtml(preData, preArea, preHtml, 1);
                html = html.replace(preHtml, rHtml);


            }
        }

        html = replaceArea(data, area, html);
        var sks = "{{" + area + ".bj_index}}";
        if (isDefine(bj_index) && html.indexOf(sks) > -1) html = html.replace(new RegExp(sks, 'g'), bj_index);;
        html = strFunc(html);
        return html;

    }
    //replace字符串
    var replaceArea = function (data, area, html) {

        for (var key in data) {
            var sk = "{{" + area + "." + key + "}}";
            html = html.replace(new RegExp(sk, 'g'), data[key]);
        }
        return html;
    }
    //字符串函数化处理
    var strFunc = function (s) {
        var ss = s.split("@@");
        if (ss.length > 2) {
            for (i = 1; i < ss.length; i += 2) {
                var s1 = ss[i];
                var s2 = eval(s1);
                s = s.replace('@@' + s1 + '@@', s2);
            }
        }
        return s;
    }
    //去掉字符串头尾空格   
    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    //获取提交域数据JSON串
    var fieldValues = function (bjSubmit) {
        var $sobj = $("*[bj-submit=" + bjSubmit + "]");
        if ($sobj.length == 0) { showMsgT('错误！未找到提交域：' + bjSubmit, 0); } //找不到提交区域报错
        else if ($sobj.length > 1) { showMsgT('错误！找到多个提交域:' + bjSubmit, 0); } //找到多个数据区域报错
        $fildsObjs = $sobj.find("[bj-field]");
        if ($fildsObjs.length < 1) { showMsgT('提交域：' + bjSubmit + '无可提交数据', 0); }
        var para = {}; //返回JSON串
        var pChBox = {};
        $fildsObjs.each(function (n, o) {
            //判断bj-field的值是不是空
            var fName = $(o).attr("bj-field");
            if (trim(fName) == "") { showMsgT(fieldLabel($(o), $sobj) + "bj-field属性值不能为空", 0); }
            var fvalue = eval("para." + fName);
            var oType = $(o).attr("type");
            oType = isDefine(oType) ? oType.toLowerCase() : "";
            var value = getValueCheck($(o));
            if (value != null) {
                if (isDefine(fvalue)) {//已经存在说明有重复多值
                    if ($.isArray(fvalue))//是数组
                    {
                        eval("para." + fName + ".push('" + value + "')");
                    }
                    else {
                        var tm = {};
                        var values = "['" + fvalue + "','" + value + "']";
                        eval("delete para." + fName);
                        eval("para." + fName + "=" + values);
                    }
                }
                else eval("para." + fName + "='" + value + "'");
            }
            if (oType == "checkbox" && isDefine($(o).attr("bj-size"))) {//如果是checkbox,且需要检查选择数量
                var cP = eval("pChBox." + fName);
                var c = 0;
                if (isDefine(cP)) {
                    var c = cP.c;
                    if (value != null) { c++; cP.c = c; }
                }
                else {
                    cP = {};
                    if (value != null) c = 1;
                    cP.c = c;
                    cP.size = $(o).attr("bj-size");

                }
                eval("pChBox." + fName + "=cP");
            }

        });

        //checkBox bj-size检查
        for (var item in pChBox) {
            var size = pChBox[item].size;
            if (!isEmpty(size)) {
                var valueLen = pChBox[item].c;
                var obj = $sobj.find("[bj-field=" + item + "]")
                var max = "";
                var tip = fieldLabel(obj, $sobj);
                var min = "";
                if (size.indexOf("-") > -1) {
                    size = size.split("-");
                    min = size[0];
                    max = size[1];
                }
                else max = size;
                if (max == "" && min == "") showMsgTInput(obj, tip + "bj-size设置格式错误");
                else {

                    if (max == "") {
                        if (!isInt(min) && !isInt(min)) showMsgTInput(obj, tip + "bj-size设置格式错误");
                        if (valueLen - 1 < min - 1) showMsgTInput(obj, tip + "选择必须大于等于" + min + "项");
                    }
                    else if (min == "") {
                        if (!isInt(max) && !isInt(max)) showMsgTInput(obj, tip + "bj-size设置格式错误");
                        if (valueLen - 1 > max - 1) showMsgTInput(obj, tip + "选择必须小于等于" + max + "项");
                    }
                    else {
                        if ((!isInt(min) && !isFloat(max)) || (!isInt(min) && !isFloat(max))) showMsgTInput(obj, tip + "bj-size设置格式错误");
                        if (valueLen - 1 > max - 1 || valueLen - 1 < min - 1) showMsgTInput(obj, tip + "选择必须必须大于等于" + min + "项小于等于" + max + "项");
                    }
                }
            }
        }

        return para;


    }
    //获取输入字段的提示名称
    var fieldLabel = function (obj, subObj) {
        var id = obj.attr("id");
        if (isDefine(id)) {
            var labelObj;
            if (isDefine(subObj)) {
                labelObj = subObj.find("*[for='" + id + "']");
            }
            else {
                labelObj = $("*[for='" + id + "']");
            }
            if (isDefine(labelObj) && labelObj.length > 0) return labelObj.html();
            else {
                var bjName = obj.attr("bj-name");
                if (isDefine(bjName)) return bjName
                return id;
            }
        }
        else return "";
    }
    //获取输入域值并检查
    var getValueCheck = function (obj) {
        var bjCheck = obj.attr("bj-check");
        var value = getValue(obj);
        if (value == null) return value;
        var oType = isDefine(obj.attr("type")) ? obj.attr("type").toLowerCase() : "";
        //var oType = obj.attr("type").toLowerCase();
        if (isEmpty(value) && isDefine(bjCheck) && bjCheck.indexOf("empty") > -1) showMsgTInput(obj, fieldLabel(obj) + "不能为空  ");
        if (!isEmpty(value)) {//不是空
            if (isDefine(bjCheck)) {
                if (bjCheck.indexOf("|") > -1) {
                    var checks = bjCheck.split("|");
                    for (var n = 0; n < checks.length; n++) {
                        var type = checks[n];
                        value = check(checks[n], value, obj);
                    }
                }
                else {
                    value = check(bjCheck, value, obj);
                }
            }
            if ((obj.is("input") && oType != "checkbox" && oType != "radio") || obj.is("textArea")) {//几个输入框检查输入值大小和长度
                var bjSize = obj.attr("bj-size");
                if (isDefine(bjSize)) {
                    value = check("bj-size", value, obj);
                }
                var bjLen = obj.attr("bj-len");
                if (isDefine(bjLen)) {
                    value = check("bj-len", value, obj);
                }
            }
        }
        value = value.replace(/\n/g, "\\n").replace(/\r/g, "\\r")
        return value;
    }
    var check = function (type, value, obj) {
        var tip = fieldLabel(obj);
        //调用自定义函数检查

        switch (type) {
            case "empty":
                if (isEmpty(value)) showMsgTInput(obj, tip + "不能为空");
                break;
            case "int":
                if (!isInt(value)) showMsgTInput(obj, tip + "必须为整数数字");
                break;
            case "mobile":
                if (!isMobile(value)) showMsgTInput(obj, tip + "不是合法手机号");
                break;
            case "float":
                if (!isFloat(value)) showMsgTInput(obj, tip + "必须为数值类型");
                break;
            case "card":
                if (!isCard(value)) showMsgTInput(obj, tip + "不是合法身份证号码");
                break;
            case "email":
                if (!isCard(value)) showMsgTInput(obj, tip + "不是合规的email地址");
                break;
            case "bj-size":
                var ss = obj.attr("bj-size");
                if (!isEmpty(ss)) {
                    if (!isInt(value) && !isFloat(value)) showMsgTInput(obj, tip + "输入值必须为数字");
                    var max = "";
                    var min = "";
                    if (ss.indexOf("-") > -1) {
                        ss = ss.split("-");
                        min = ss[0];
                        max = ss[1];
                    }
                    else max = ss;
                    if (max == "" && min == "") showMsgTInput(obj, tip + "bj-size设置格式错误");
                    else {

                        if (max == "") {
                            if (!isInt(min) && !isInt(min)) showMsgTInput(obj, tip + "bj-size设置格式错误");
                            if (value - 1 < min - 1) showMsgTInput(obj, tip + "值必须大于等于" + min);
                        }
                        else if (min == "") {
                            if (!isInt(max) && !isInt(max)) showMsgTInput(obj, tip + "bj-size设置格式错误");
                            if (value - 1 > max - 1) showMsgTInput(obj, tip + "值必须小于等于" + max);
                        }
                        else {
                            if ((!isInt(min) && !isFloat(max)) || (!isInt(min) && !isFloat(max))) showMsgTInput(obj, tip + "bj-size设置格式错误");
                            if (value - 1 > max - 1 || value - 1 < min - 1) showMsgTInput(obj, tip + "值必须大于等于" + min + "小于等于" + max);
                        }
                    }
                }
                break;
            case "bj-len": //输入长度控制
                var len = obj.attr("bj-len");

                if (!isEmpty(len)) {
                    var valueLen = value.length;
                    var max = "";
                    var min = "";
                    if (len.indexOf("-") > -1) {
                        len = len.split("-");
                        min = len[0];
                        max = len[1];
                    }
                    else max = len;
                    if (max == "" && min == "") showMsgTInput(obj, tip + "bj-len设置格式错误");
                    else {

                        if (max == "") {
                            if (!isInt(min) && !isInt(min)) showMsgTInput(obj, tip + "bj-len设置格式错误");
                            if (valueLen - 1 < min - 1) showMsgTInput(obj, tip + "值长度必须大于等于" + min);
                        }
                        else if (min == "") {
                            if (!isInt(max) && !isInt(max)) showMsgTInput(obj, tip + "bj-len设置格式错误");
                            if (valueLen - 1 > max - 1) showMsgTInput(obj, tip + "值长度必须小于等于" + max);
                        }
                        else {
                            if ((!isInt(min) && !isFloat(max)) || (!isInt(min) && !isFloat(max))) showMsgTInput(obj, tip + "bj-len设置格式错误");
                            if (valueLen - 1 > max - 1 || valueLen - 1 < min - 1) showMsgTInput(obj, tip + "值长度必须大于等于" + min + "小于等于" + max);
                        }
                    }
                }
                break;
            default:
                if (type.indexOf("@@") > -1) {//函数检查
                    var f = type.split("@@");
                    if (!eval(f[1])) showMsgTInput(obj, tip + "输入格式错误");
                }
                break;
        }
        return value;
    }
    var showMsgTInput = function (obj, tip) {
        obj.select();
        obj.focus();
        layer.msg(tip, { time: 4000 });
        stopJs('');
    }
    var isFloat = function (value) {
        reg = /^-?\d+(\.\d+)?$/;
        return reg.test(value);
    }
    var isEmail = function (value) {
        reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return reg.test(value);
    }
    var isMobile = function (value) {
        var reg = /^[1][0-9]{10}$/;
        return reg.test(value);
    }
    var isInt = function (value) {
        var reg = /^-?\d+$/;
        return reg.test(value);
    }
    var isEmpty = function (value) {
        if (trim(value) == "") return true;
        else return false;
    }
    //获取field值 参数:控件
    var getValue = function (obj) {
        lvalue = obj.attr("bj-value");
        if (isDefine(lvalue)) {
            return strFunc(lvalue);
        }
        else {
            var tagName = obj.attr("tagName");
            if (!obj.is("input") && !obj.is("select") && !obj.is("textarea")) { showMsgT(obj.attr("bj-field") + "不是一个输入框", 0); }
            var oType = isDefine(obj.attr("type")) ? obj.attr("type").toLowerCase() : "";
            if (oType == "checkbox" || oType == "radio") {
                if (obj.prop("checked") == true) {
                    return obj.val();
                }
                else return null;
            }
            else return obj.val();
        }
    }

    //以下为身份证相关检查
    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子   
    var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X   
    var isCard = function (idCard) {
        idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格 
        if (idCard.length == 15) {
            return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
        } else if (idCard.length == 18) {
            var a_idCard = idCard.split("");                // 得到身份证数组   
            if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    /**  
    * 判断身份证号码为18位时最后的验证位是否正确  
    * @param a_idCard 身份证号码数组  
    * @return  
    */
    function isTrueValidateCodeBy18IdCard(a_idCard) {
        var sum = 0;                             // 声明加权求和变量   
        if (a_idCard[17].toLowerCase() == 'x') {
            a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
        }
        for (var i = 0; i < 17; i++) {
            sum += Wi[i] * a_idCard[i];            // 加权求和   
        }
        valCodePosition = sum % 11;                // 得到验证码所位置   
        if (a_idCard[17] == ValideCode[valCodePosition]) {
            return true;
        } else {
            return false;
        }
    }
    /**  
    * 验证18位数身份证号码中的生日是否是有效生日  
    * @param idCard 18位书身份证字符串  
    * @return  
    */
    function isValidityBrithBy18IdCard(idCard18) {
        var year = idCard18.substring(6, 10);
        var month = idCard18.substring(10, 12);
        var day = idCard18.substring(12, 14);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
        // 这里用getFullYear()获取年份，避免千年虫问题   
        if (temp_date.getFullYear() != parseFloat(year)
              || temp_date.getMonth() != parseFloat(month) - 1
              || temp_date.getDate() != parseFloat(day)) {
            return false;
        } else {
            return true;
        }
    }
    /**  
    * 获取年龄 
    * @param value  
    * @return  年龄
    */
    var getAgeByCard = function (idCard) {
        var myDate = new Date();
        var prDate = new Date(getBirth(idCard));
        var year = myDate.getYear() - prDate.getYear();
        if (prDate.getMonth() > myDate.getMonth()) year--;
        else if (prDate.getMonth() == myDate.getMonth() && prDate.getDay() > myDate.getDay()) year--;
        return year;
    }

    /**  
    * 获取身份证号码中的生日  
    * @param value  
    * @return  year + "-" + month + "-" + day;
    */
    var getBirthByCard = function (value) {
        if (!value) {
            return "";
        }
        var year = "1900";
        var month = "1";
        var day = "1";
        if (value.length == 15) {
            year = "19" + value.substr(6, 2);
            month = value.substr(8, 2);
            day = value.substr(10, 2);
        } else if (value.length == 18) {
            year = value.substr(6, 4);
            month = value.substr(10, 2);
            day = value.substr(12, 2);
        } else {
            return "";
        }
        newDate = new Date(year, month - 1, day);
        if (newDate.toString() == "NaN") {
            return "";
        }
        else {
            return year + "-" + month + "-" + day;
        }
    }
    /**  
    * 验证15位数身份证号码中的生日是否是有效生日  
    * @param idCard15 15位书身份证字符串  
    * @return  
    */
    function isValidityBrithBy15IdCard(idCard15) {
        var year = idCard15.substring(6, 8);
        var month = idCard15.substring(8, 10);
        var day = idCard15.substring(10, 12);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
        // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
        if (temp_date.getYear() != parseFloat(year)
                || temp_date.getMonth() != parseFloat(month) - 1
                || temp_date.getDate() != parseFloat(day)) {
            return false;
        } else {
            return true;
        }
    }

    /**  
    * 通过身份证判断是男是女  
    * @param idCard 15/18位身份证号码   
    * @return 'female'-女、'male'-男  
    */
    var getSexByCard = function (idCard) {
        idCard = trim(idCard.replace(/ /g, ""));        // 对身份证号码做处理。包括字符间有空格。   
        if (idCard.length == 15) {
            if (idCard.substring(14, 15) % 2 == 0) {
                return 'female';
            } else {
                return 'male';
            }
        } else if (idCard.length == 18) {
            if (idCard.substring(14, 17) % 2 == 0) {
                return 'female';
            } else {
                return 'male';
            }
        } else {
            return null;
        }
    }
    //end身份证相关检查
    //获取URL参数值
    var getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    var test2 = function () {
        testddd();
    };
    var test = function () {
        loadJs(url + "Content/js/test.js");
    };
    /*
    *提交文件
    *@param formId 所在form的ID
    */
    var upLoadFile = function (formId, fn) {
        openLoadImg();
        var obj = $("#" + formId);
        var n = 0;
        if (obj.length == 0) showMsgT("未定义ID为" + formId + "文件提交form", 0);
        var extVal = isDefine(obj.attr("bj-ext")) ? obj.attr("bj-ext") : "";
        var sizeVal = isDefine(obj.attr("bj-size")) ? obj.attr("bj-size") : "";
        var pathVal = isDefine(obj.attr("bj-path")) ? obj.attr("bj-path") : "";
        obj.find("input[type='file']").each(function (i, o) {
            var val = $(o).val();
            if (val != "") {
                if (extVal != "") {
                    if (extVal.indexOf(val.substring(val.lastIndexOf("."), val.length)) < 0) {
                        showMsgT("上传文件失败js：格式错误（只支持" + extVal + "）", 0);
                    }
                }
                n++;
            }
        });
        if (n == 0) showMsgT("无上传文件", 0);
        obj.attr("action", url + "upload.ashx");
        obj.attr("method", "post");
        obj.attr("enctype", "multipart/form-data");
        obj.append("<input name='bj_ext'    id='bj_ext'     type='text' value='" + extVal + "' style='display:none'/>");
        obj.append("<input name='bj_size'   id='bj_size'    type='text' value='" + sizeVal + "' style='display:none'/>");
        obj.append("<input name='bj_path'   id='bj_path'    type='text' value='" + pathVal + "' style='display:none'/>");
        var options = {
            success: function (data) {
                $("#bj_ext").remove();
                $("#bj_size").remove();
                $("#bj_path").remove();
                data = $.parseJSON(data);
                if (data.IsError) {
                    if (data.RetCode == '-9999') showMsgT(data.RetMsg, 0); //系统错误信息
                    else if (programType == "PC" && data.RetCode == '-9998') {
                        goLoginPage(); //登录过期跳转到登录页面
                    }
                }
                if (isDefine(fn) && isFunc(fn)) fn(data);
                else showMsg(data.RetMsg, 0);
            },
            error: function (data, status, e) {
                $("#bj_ext").remove();
                $("#bj_size").remove();
                $("#bj_path").remove();
                showMsgT("上传组件调用错误" + e, 0);
            }
        };
        obj.ajaxSubmit(options);
        closeMsg();
    }

    var basejq = function () {
        //loadEncryptJs();
        //var count = 100000;
        //while (count>0) {
        //    count--;
        //    console.log(typeof base64encode +"|"+ typeof setMaxDigits+"|"+count);
        //    if (typeof base64encode != "undefined" && typeof setMaxDigits != "undefined") break;
        //}
        return { post: p, upLoadFile: upLoadFile, param: param, isEmpty: isEmpty, MathRand: MathRand, postSim: postSim, setProgramType: setProgramType, openLoadImg: openLoadImg, closeMsg: closeMsg, getRootUrl: getRootUrl, SetStopBeforeFunc: SetStopBeforeFunc, encryptOne: encryptOne, decryptByDES: decryptByDES, decryptRetByDES: decryptRetByDES, getBirthByCard: getBirthByCard, isFunc: isFunc, isDefine: isDefine, isInt: isInt, isFloat: isFloat, isEmail: isEmail, isMobile: isMobile, isCard: isCard, loadEncryptJs: loadEncryptJs, fieldValues: fieldValues, trim: trim, showMsgT: showMsgT, showMsg: showMsg, bind: bind, bindProHtml: bindProHtml, bindById: bindById, setDomValue: setDomValue, getValueCheck: getValueCheck, fieldLabel: fieldLabel, getUrlParam: getUrlParam, ajaxPost: ajaxPost, stopJs: stopJs, stopBeforeFunc: stopBeforeFunc };
    };
    exports('basejq', basejq);
});