/*
*前端网页数据处理（jQuery）
*张琪2016-1-27
*温州
*/
layui.define(["jquery","layer"], function (exports) {
   $ = layui.jquery, layer = layui.layer;
    
    //https://cdn.yzl.longqueyun.com/jsapi/yzl-jsapi-1.0.0.js
    var l = function () {
        var ii = layer.load(1, { shade: [0.1, '#fff'] });
        var showMsg = function (m) { layer ? layer.open({ content: m }) : alert(m); }
        var counts = 10;
        this.config = function (id, fun) {
            if ('undefined' == typeof yzl) {
                counts--;
                counts > 0 ? setTimeout(this.config, 4) : showMsg("未引入yzl-jssdk,可尝试刷新");
                return;
            }
            yzl.error(function (result) {
                layer.close(ii);
                showMsg("云助理JSSDK初始化失败");
                // 执行验证出错时的处理动作
            });
            yzl.config({ appId: 'undefined' == typeof id || id == '' ? '8527d6b1-d897-4a69-b2f6-d8e8772f834c' : id });
            yzl.ready(function () {
                layer.close(ii);
                if ('function' == typeof fun) {
                    fun();
                }
                //执行需要在页面加载后就马上调用的相关接口
            });
          
           


        }
        this.showNavigationBar = function () {
            yzl.showNavigationBar();
        }
        this.hideNavigationBar = function () {
            yzl.hideNavigationBar();
        }
        this.getLocation = function (fun) {
            var ii = layer.load(1, { shade: [0.1, '#fff'] });
            yzl.getLocation({
                coorType: "bd09ll", //必须，指定定位结果的坐标系类型 百度经纬度
                success: function (result) {
                    var latitude = result.latitude; //纬度，浮点数
                    var longitude = result.longitude; //经度，浮点数
                    var accuracy = result.accuracy; //位置精度
                    layer.close(ii);
                    if ('function' == typeof fun) fun(latitude, longitude);
                },
                fail: function (err) {
                    layer.close(ii);
                    showMsg("定位失败" + $.stringify(err));
                    return;
                }
            });
        }
        var s = function () {
            this.title = "";
            this.desc = "";
            this.link = "";
            this.imgUrl = "";
        };
        var sl = new s();
        this.sharePara = sl;
        this.onMenuShareTimeline = function () {
            yzl.onMenuShareTimeline({
                title: sl.title, //修改后的分享标题
                link: sl.link, //修改后的分享链接
                imgUrl: sl.imgUrl, //修改后的分享消息图标
                success: function (result) {
                    //用户确认分享后执行的回调函数
                    //resultInfo.innerHTML = "修改后的消息成功分享到朋友圈: <br /><br />" + JSON.stringify(result);
                },
                executed: function () {
                    //resultInfo.innerHTML = "onMenuShareTimeline 调用成功";
                },
                fail: function (err) {
                    //resultInfo.innerHTML = "修改后的消息分享到朋友圈失败: <br /><br />" + JSON.stringify(err);
                    showMsg("分享失败");
                }
            })
        }

        this.onMenuShareAppMessage = function () {
            yzl.onMenuShareAppMessage({
                title: sl.title, //修改后的分享标题
                desc: sl.desc, //修改后的分享描述
                link: sl.link, //修改后的分享链接
                imgUrl: sl.imgUrl, //修改后的分享图标
                type: '7', //分享类型
                success: function (result) {
                    //用户确认分享后执行的回调函数
                    resultInfo.innerHTML = "修改后的消息成功分享到微信: <br /><br />" + JSON.stringify(result);
                },
                executed: function () {
                    resultInfo.innerHTML = "onMenuShareAppMessage 调用成功";
                },
                fail: function (err) {
                    showMsg("分享失败");
                }
            })
        }
        this.showMsg = function () {
        }
    }
    var y = new l();
   
    exports('bjyzl', y);
});