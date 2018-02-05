/*
*导入base.jq.JS
*张琪2016-5-27
*温州
*/
/// <reference path="base.jq.1.0.js" />
!function (w) {
    var loadArea = 1;//环境设置1：本地，2：内网，3：外网
    var url="";         //网站根目录
    var jsPath = ""; //js所在目录
    var a = document.scripts;
    var e = "";
    for (n = 0; n < a.length; n++) {
        var d = a[n].src;
        if (d.indexOf("Content/js/zjfbase.js") > 0) {
            var e = d.substring(0, d.lastIndexOf("Content/js/zjfbase.js"));
        }
    }
    url = e;
    switch (loadArea) {
        case 1://本地
            jsPath = url + "Content/js/";
            break;
        case 2://内网
            jsPath = "http://10.49.128.38/wzreport/basejs/Content/js/";
            break;
        case 3://外网
            jsPath = "";
            break;
    }

    var loadJs = function (src) {
        document.write('<script type="text/javascript" src="' + src + '"></script>');
    };
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
    //jquery
    if (isUpIE()) {
        loadJs(jsPath + "jquery-2.1.1.min.js");
    }
    else {
        loadJs(jsPath + "jquery-1.9.1.min.js");
    }
    //加载基础库
    loadJs(jsPath+"base.jq.1.0.js?t=PC");

}(window)