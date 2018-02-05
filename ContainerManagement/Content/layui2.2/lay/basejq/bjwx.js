/*
*前端网页数据处理（jQuery）
*张琪2016-1-27
*温州
*/
layui.define(["basejq", "jquery"], function (exports) {
    var basejq = layui.basejq("e"), $ = layui.jquery;

    /*
*微信相关的基础功能（jQuery）
*yanghongyan 2016-3-12
*ZJ
*/
    var wxShareBaseUrl;
    //wxItemId
    var wxItemId = -1;
    //是否强制关注
    var wxUnsubStop;
    //右上角微信菜单只显示分享收藏按钮（true时），默认false 
    var onlyShare = false;
    //当前的token信息，里面包含业务员信息、微信个人信息（openId、nickName、imgUrl..)、分享者信息
    var wxZjToken;
    //从云助理端带来的psn值，分享链接需用到
    var wxPsn;
    //申请码
    var reqCodeUrlParam = '101';
    var reqCodeGetSign = '102';
    var reqCodeLogVisit = '103';
    var reqCodeLogShare = '104';
    var reqCodeGetBaseUrl = '105';
    var tokenParamName = 'lotInfo';
    var psnParamName = 'psn';
    var fromParamName = 'fromToken';
    var targetParamName = 'targetUrl'

    //获取微信网页参数，网页参数包括：zjtoken，代表来源信息，但也有可能为空
    var wxDealUrlParam = function (wd) {
        //1、获取参数
        wxZjToken = sessionStorage.getItem(tokenParamName);
        if (wxZjToken == null) {
            wxZjToken = basejq.getUrlParam(tokenParamName); //token用来存取psn、openId、fromOpenId
            if (wxZjToken == null) wxZjToken = '';
            sessionStorage.setItem(tokenParamName, wxZjToken);
        }
        //解析参数
        var ret;
        var reqData = {};
        reqData.zjToken = wxZjToken;
        var param = basejq.param();
        param.reqCode = reqCodeUrlParam;
        param.reqData = reqData;
        param.loadImg = true;
        basejq.post(param, function (data) {
            //console.log(data);
            if (!data.IsError) {
                wxPsn = data.RetData.psn;
                if (wd.wxUnsubStop && ret.RetData.subscribe != '1') {
                    wxShowSubInfo();
                    basejq.stopJs('');
                }
                wxInitConfig(wd);
            }
        });

    };
    wxShowSubInfo = function () {
        layer.open({
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            shadeClose: false,
            area: ['350px', '350px'],
            content: "<div style=\"text-align:center;\"><span>长按二维码，关注</br>中国人寿浙江省公司微信公众号</span><img alt=\"\" src=\"http://7xlny9.com1.z0.glb.clouddn.com/WX_ClaimQuery_gz.jpg\" /></div>"
        });

    };
    //构成当前分享的链接
    var wxGetShareUrl = function (targetUrl) {
        wxGetShareBaseUrl();
        var target;
        target = location.protocol + "//" + location.host;
        if (location.port.lenth > 0)
            target += ":" + location.port;
        target += location.pathname;
        return wxShareBaseUrl + 'WebInterface.aspx?' + psnParamName + '=' + wxPsn + '&' + fromParamName + '=' + wxZjToken + '&' + targetParamName + '=' + encodeURIComponent(target);
    };
    var wxGetShareBaseUrl = function () {
        var ret;
        var reqData = {};
        ret = basejq.ajaxPost(reqCodeGetBaseUrl, reqData);
        wxShareBaseUrl = ret.RetData.url;
    };
    var getBaseUrl = function () {
        if (typeof wxShareBaseUrl == 'undefined' || wxShareBaseUrl == null || wxShareBaseUrl == '') {
            wxGetShareBaseUrl();
        }
        return wxShareBaseUrl;
    }
    //初始化微信分享配置
    var wxInitConfig = function (wd) {
        //分享到朋友圈成功的回调
        var onMenuShareTimeline = function () {
            //1、记录分享成功
            //wxLogShareInfo('0');
            if (wd.shareTimelineCall != undefined)
                wd.shareTimelineCall();
        }
        var onMenuShareAppMessage = function () {
            //1、记录分享成功
            //wxLogShareInfo('1');
           
            if (wd.shareAppCall != undefined)
                wd.shareAppCall();
            //console.log(wd.title);
        }


        wx.error(function (res) {
            basejq.closeMsg(ImgIndex);
            if (typeof (layer) != 'undefined') layer.closeAll();
            alert("微信接口调用错误" + JSON.stringify(res));
        });
        //1、声明分享回调的函数
        wx.ready(function () {
            basejq.closeMsg(ImgIndex);
            //console.log("readyDataOk");
            //是否显示右上角菜单
            if (wd.wxShowMenu == false) {
                wx.hideOptionMenu();
                //return;
            }
            else {
                if (wd.shareFlag == 1 || wd.shareFlag == 3) {
                    wx.onMenuShareTimeline({
                        title: wd.title, // 分享标题
                        link: wd.link, // 分享链接
                        imgUrl: wd.imgUrl, // 分享图标
                        success: onMenuShareTimeline,
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                }

                //获取“分享给朋友”按钮点击状态及自定义分享内容接口
                if (wd.shareFlag == 2 || wd.shareFlag == 3) {
                    wx.onMenuShareAppMessage({
                        title: wd.title, // 分享标题
                        desc: wd.desc, // 分享描述
                        link: wd.link, // 分享链接
                        imgUrl: wd.imgUrl, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: onMenuShareAppMessage,
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                }
                if (wd.onlyShare) {
                    wx.hideAllNonBaseMenuItem();
                    wx.showMenuItems({
                        menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:favorite"]
                    });
                }
            }
            if (basejq.isDefine(wd.func) && basejq.isFunc(wd.func)) {
                wd.func();
            }
        });

        //2、调用后台获取微信签名数据
        var reqData = {};
        reqData.url = location.href;
        var param = basejq.param();
        param.reqCode = reqCodeGetSign;
        param.reqData = reqData;
        param.loadImg = true;
        basejq.post(param, function (data) {
            //console.log("readyData");
            if (!data.IsError) {
                //获取微信签名数据
                var retData = data.RetData;
                var wxConfigData = {};
                wxConfigData.appId = retData.appId;
                wxConfigData.timestamp = retData.timestamp;
                wxConfigData.nonceStr = retData.nonceStr;
                wxConfigData.signature = retData.signature;
                wxConfig(wxConfigData);
            }
        });

    };
    //初始化微信分享数据
    var wxData = function () {
        var shareData = {};
        shareData.link = '';
        shareData.imgUrl = '';
        shareData.title = '';
        shareData.desc = '';
        shareData.shareAppCall; //分享朋友圈成功执行函数
        shareData.shareTimelineCall;//分享朋友成功执行函数
        shareData.func; //微信readay好后执行的函数
        shareData.wxShowMenu = true; // false值则微信则关闭微信右上角菜单
        shareData.onlyShare = false;//true仅仅显示分享按钮
        shareData.wxUnsubStop = false; //没有关注，必须关注
        shareData.wxItemId = -1;
        shareData.shareFlag = 0;//0不分享，1=分享朋友圈 ，2 分享朋友，3 分享朋友圈和朋友
        return shareData;
    };
//    var wxLogShareInfo = function (sharType) {
//        var reqData = {};
//        reqData.itemId = wxItemId;
//        reqData.zjToken = wxZjToken;
//        reqData.shareType = sharType;
//        basejq.ajaxPost(reqCodeLogShare, reqData);
//    };
    //记录页面打开
//    var wxLogVisit = function () {
//        var reqData = {};
//        reqData.itemId = wxItemId;
//        reqData.zjToken = wxZjToken;
//        var param = basejq.param();
//        param.reqData = reqData;
//        param.loadImg = false;
//        param.reqCode = reqCodeLogVisit;
//        basejq.post(param);
//    };

    var wxCloseWindow = function () {
        wx.closeWindow();
    };
    var wxInitJsAPIList = function (config) {
        config.jsAPIList = [];
        //加入基本jsAPI列表
        var i = 0;
        config.jsAPIList[i++] = 'checkJsApi';
        config.jsAPIList[i++] = 'hideMenuItems';
        config.jsAPIList[i++] = 'showMenuItems';
        config.jsAPIList[i++] = 'hideAllNonBaseMenuItem';
        config.jsAPIList[i++] = 'showAllNonBaseMenuItem';
        config.jsAPIList[i++] = 'translateVoice';
        config.jsAPIList[i++] = 'startRecord';
        config.jsAPIList[i++] = 'stopRecord';
        config.jsAPIList[i++] = 'onRecordEnd';
        config.jsAPIList[i++] = 'playVoice';
        config.jsAPIList[i++] = 'pauseVoice';
        config.jsAPIList[i++] = 'stopVoice';
        config.jsAPIList[i++] = 'uploadVoice';
        config.jsAPIList[i++] = 'downloadVoice';
        config.jsAPIList[i++] = 'chooseImage';
        config.jsAPIList[i++] = 'previewImage';
        config.jsAPIList[i++] = 'uploadImage';
        config.jsAPIList[i++] = 'downloadImage';
        config.jsAPIList[i++] = 'getNetworkType';
        config.jsAPIList[i++] = 'openLocation';
        config.jsAPIList[i++] = 'getLocation';
        config.jsAPIList[i++] = 'hideOptionMenu';
        config.jsAPIList[i++] = 'showOptionMenu';
        config.jsAPIList[i++] = 'closeWindow';
        config.jsAPIList[i++] = 'scanQRCode';
        config.jsAPIList[i++] = 'chooseWXPay';
        config.jsAPIList[i++] = 'openProductSpecificView';
        config.jsAPIList[i++] = 'addCard';
        config.jsAPIList[i++] = 'chooseCard';
        config.jsAPIList[i++] = 'openCard'
        //if (typeof (wxShowMenu) != 'undefined' && wxShowMenu == true) {
            config.jsAPIList[i++] = 'onMenuShareTimeline';
            config.jsAPIList[i++] = 'onMenuShareAppMessage';
            config.jsAPIList[i++] = 'onMenuShareQQ';
            config.jsAPIList[i++] = 'onMenuShareWeibo';
       // }
    };
    var ImgIndex = 0;
    var wxConfig = function (data) {
        ImgIndex = basejq.openLoadImg();
        wxInitJsAPIList(data);
        wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: data.jsAPIList
        });
    };
    /*
   *简单的分享调用，分享到朋友圈和朋友
   *@param 
   */
    var shareMenu = function (title,desc,img,link,func) {
        var wd = new wxData();
        wd.link = link;
        wd.title = title;
        wd.imgUrl = img;
        wd.shareFlag = 3;
        wd.desc = desc;
        wd.onlyShare = true;
        wd.func = func;
        //alert(wxGetShareUrl(link));
        //baseUrl = "http://zjwx.e-chinalife.com/testWx";
        //1、处理网页参数，获得了网页参数：wxZjToken
        wxDealUrlParam(wd);
        //获得分享所需签名
        //$.wxInitConfig(wxShareData);
    }
    var wxInit = function (title, imgUrl, desc) {
        //1、处理网页参数，获得了网页参数：wxZjToken
        wxDealUrlParam();
        //2、记录网页点击
        //wxLogVisit();
        //3、初始化微信config
        var wxShareData = wxData();
        //分享参数必须要设置，标题、图片、描述
        wxShareData.link = wxGetShareUrl();   //分享链接自动构建，如果不是当前网页地址，则可自行修改
        wxShareData.title = title;
        wxShareData.imgUrl = imgUrl;
        wxShareData.desc = desc;
        wxInitConfig(wxShareData);
    }
    var lfunc;
    var getH5Location = function () {
        //alert("aa");
        if (navigator.geolocation) {
            //alert(navigator.geolocation);
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }
    }

    var getH5Locationf = function (f) {
        if (navigator.geolocation) {
            //alert(navigator.geolocation);
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }
    }
    var showPosition = function (position) {
        var point = {};
        point.lat = position.coords.latitude;
        point.lon = position.coords.longitude;
        lfunc(point);
    }

    var showError = function (error) {
        layer.closeAll(); //关闭所有提示层
        switch (error.code) {
            case error.PERMISSION_DENIED:
                layer.msg("您手机未允许微信定位权限。");
                // x.innerHTML="User denied the request for Geolocation."
                //用户拒绝对地理位置要求。
                break;
            case error.POSITION_UNAVAILABLE:
                layer.msg("您的信息位置不可用。");
                // x.innerHTML="Location information is unavailable."
                //信息位置不可用
                break;
            case error.TIMEOUT:
                layer.msg("您的位置请求超时。");
                //   x.innerHTML="The request to get user location timed out."
                //获取用户位置请求超时。
                break;
            case error.UNKNOWN_ERROR:
                layer.msg("您出现未知错误。");
                //  x.innerHTML="An unknown error occurred."
                //出现未知错误。
                break;
        }
    }
    var getLocation = function (f) {
        lfunc = f;
        var point = {};
        var sIndex = basejq.openLoadImg();
        wx.ready(function () {
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    basejq.closeMsg(sIndex);
                    point.lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    point.lon = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    f(point);
                },
                complete: function (res) {
                    basejq.closeMsg(sIndex);
                },
                fail: function (res) {
                    layer.msg("微信定位失败(" + res.errMsg + "),将使用其他定位,请稍候...");
                    window.baskjqgetH5Location = getH5Location;
                    setTimeout("baskjqgetH5Location()", 3000);
                }
            });
        });
        wx.error(function (res) {
            layer.open({ content: "获取位置出错2，请重新重试（" + JSON.stringify(res) + ")", shadeClose: false });
        });
    }

    var hideMenu = function (func, id) {
        var wd = new wxData();
        if (basejq.isDefine(id))
            wd.wxItemId = id;
        wd.wxShowMenu = false;
        wd.wxUnsubStop = false;
        wd.func = func;
        //baseUrl = "http://zjwx.e-chinalife.com/testWx";
        //1、处理网页参数，获得了网页参数：wxZjToken
        wxDealUrlParam(wd);
        //获得分享所需签名
        //$.wxInitConfig(wxShareData);
    }
    var wxGetUrl = function (targetUrl) {
        wxGetShareBaseUrl();
        var target;
        target = location.protocol + "//" + location.host;
        if (location.port.lenth > 0) {
            target += ":" + location.port;
        }
        return wxShareBaseUrl + 'WebInterface.aspx?&targetUrl=' + encodeURIComponent(wxShareBaseUrl + targetUrl) + "&itemId=" + wxItemId;
    }

    var bjwx = { wxUnsubStop: wxUnsubStop, onlyShare: onlyShare, wxInitConfig: wxInitConfig, getLocation: getLocation,shareMenu:shareMenu, wxData: wxData, hideMenu: hideMenu, wxGetUrl: wxGetUrl, wxItemId: wxItemId, getBaseUrl: getBaseUrl };
    exports('bjwx', bjwx);
});