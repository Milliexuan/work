/*
*微信相关的基础功能（jQuery）
*yanghongyan 2016-3-12
*ZJ
*/
//当前的token信息，里面包含业务员信息、微信个人信息（openId、nickName、imgUrl..)、分享者信息
var wxZjToken;
//从云助理端带来的psn值，分享链接需用到
var wxPsn;
//微信分享时的基础url，跟当前Url不一致，要进行转换，以便带上psn等信息
var wxShareBaseUrl = 'http://zjwx.e-chinalife.com/testWx/WebInterface.aspx';
$.extend({
    //获取微信网页参数，网页参数包括：zjtoken，代表来源信息，但也有可能为空
    wxDealUrlParam: function () {
        //1、获取参数
        wxZjToken = basejq.getUrlParam("zjtoken"); //token用来存取psn、openId、fromOpenId
        if (wxZjToken == null) {
            basejq.showMsgT("网页参数非法.", 0);
            return;
        }
        //解析参数
        var ret;
        var reqData = {};
        reqData.zjToken = wxZjToken;
        ret = basejq.ajaxPost('001', reqData);
        wxPsn = ret.RetData.psn;
        if (typeof(wxUnsubStop) == 'undefined')
            wxUnsubStop = false;
        if (wxUnsubStop && ret.RetData.subscribe == '0') {
            $.wxShowSubInfo();
            basejq.stopJs('');
        }
    },
    //构成当前分享的链接
    wxGetShareUrl: function (targetUrl) {
        return wxShareBaseUrl + '?psn=' + wxPsn + '&fromToken=' + wxZjToken + '&targetUrl=' + encodeURIComponent(location.href);
    },
    //初始化微信分享配置
    wxInitConfig: function (wxShareData, shareAppCall, shareTimelineCall) {
        //分享到朋友圈成功的回调
        var onMenuShareTimeline = function () {
            //1、记录分享成功
            $.wxLogShareInfo('0');
            if (shareTimelineCall != undefined)
                shareTimelineCall();
        }
        var onMenuShareAppMessage = function () {
            //1、记录分享成功
            $.wxLogShareInfo('1');
            if (shareAppCall != undefined)
                shareAppCall();
        }
        //1、声明分享回调的函数
        wx.ready(function () {
            //是否显示右上角菜单
            if (typeof (wxShowMenu) != 'undefined' && wxShowMenu == false) {
                wx.hideOptionMenu();
                return;
            }
            wx.onMenuShareTimeline({
                title: wxShareData.title, // 分享标题
                link: wxShareData.link, // 分享链接
                imgUrl: wxShareData.imgUrl, // 分享图标
                success: onMenuShareTimeline,
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            //获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
                title: wxShareData.title, // 分享标题
                desc: wxShareData.desc, // 分享描述
                link: wxShareData.link, // 分享链接
                imgUrl: wxShareData.imgUrl, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: onMenuShareAppMessage,
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });

        //2、调用后台获取微信签名数据
        var ret;
        var reqData = {};
        reqData.url = location.href;
        ret = basejq.ajaxPost('002', reqData);
        //获取微信签名数据
        var retData = ret.RetData;
        var wxConfigData = {};
        wxConfigData.appId = retData.appId;
        wxConfigData.timestamp = retData.timestamp;
        wxConfigData.nonceStr = retData.nonceStr;
        wxConfigData.signature = retData.signature;
        $.wxConfig(wxConfigData);
    },
    //初始化微信分享数据
    wxNewShareData: function () {
        var shareData = {};
        shareData.link = '';
        shareData.imgUrl = '';
        shareData.title = '';
        shareData.desc = '';
        return shareData;
    },
    wxLogShareInfo: function (sharType) {
        var reqData = {};
        reqData.itemId = wxItemId;
        reqData.zjToken = wxZjToken;
        reqData.shareType = sharType;
        basejq.ajaxPost('004', reqData);
    },
    //记录页面打开
    wxLogVisit: function () {
        var reqData = {};
        reqData.itemId = wxItemId;
        reqData.zjToken = wxZjToken;
        var param = basejq.param();
        param.reqData = reqData;
        param.loadImg = false;
        param.reqCode = '003';
        basejq.post(param);
    },
    wxShowSubInfo: function () {
        layer.open({
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            shadeClose: false,
            area: ['350px', '350px'],
            content: "<div style=\"text-align:center;\"><span>长按二维码，关注</br>中国人寿浙江省公司微信公众号</span><img alt=\"\" src=\"http://7xlny9.com1.z0.glb.clouddn.com/WX_ClaimQuery_gz.jpg\" /></div>"
        });

    },
    wxCloseWindow: function () {
        wx.closeWindow();
    },
    wxInitJsAPIList: function (config) {
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
        if (typeof (wxShowMenu) != 'undefined' && wxShowMenu == true) {
            config.jsAPIList[i++] = 'onMenuShareTimeline';
            config.jsAPIList[i++] = 'onMenuShareAppMessage';
            config.jsAPIList[i++] = 'onMenuShareQQ';
            config.jsAPIList[i++] = 'onMenuShareWeibo';
        }
    },
    wxConfig: function (data) {
        $.wxInitJsAPIList(data);
        wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: data.jsAPIList
        });
    },
    wxInit: function (title, imgUrl, desc) {
        //1、处理网页参数，获得了网页参数：wxZjToken
        $.wxDealUrlParam();
        //2、记录网页点击
        $.wxLogVisit();
        //3、初始化微信config
        var wxShareData = $.wxNewShareData();
        //分享参数必须要设置，标题、图片、描述
        wxShareData.link = $.wxGetShareUrl();   //分享链接自动构建，如果不是当前网页地址，则可自行修改
        wxShareData.title = title;
        wxShareData.imgUrl = imgUrl;
        wxShareData.desc = desc;
        $.wxInitConfig(wxShareData);
    }
})