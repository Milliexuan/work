layui.define(function (exports) {
    "use strict";
    var obj = {
        hello: function (str) {
            alert('Hello ' + (str || 'test'));
        }
    };
    exports('limit',obj);
});