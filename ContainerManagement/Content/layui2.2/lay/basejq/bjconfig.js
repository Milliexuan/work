layui.define(function (exports) {
    "use strict";
    var obj = {
        bootUrl: "/" //网站根目录
        , ajaxUrl: "/AjaxCommonIntf.aspx"   //AJAX交互地址
        , clientType: "PC"  ////WX=微信项目,PC=桌面项目,YZL=云助理项目
    };
    exports('bjconfig', obj);
});