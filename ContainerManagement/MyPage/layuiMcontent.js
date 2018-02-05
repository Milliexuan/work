/*
  Demo1.js
  使用Layui的form和upload模块
*/
layui.use(['layer','form', 'upload','table','laypage'], function(){  //如果只加载一个模块，可以不填数组。如：layui.use('form')
    var form = layui.form //获取form模块
        ,upload = layui.upload; //获取upload模块
    var table = layui.table;
    var layer = layui.layer;
    var laypage = layui.laypage;

    //添加配置按钮的事件
    $("#addConfig").on("click",function () {
        //alert("add");
        //iframe层
        layer.open({
            type: 2,
            title: '连接配置',
            content: 'cfgDefine.html', //如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
            area: ['700px', '600px']
        });

    });





  //testLocal();
    getCfgListpage();


    function testLocal(){
        for(var i =0;i<8;i++){
            var datas=[{name:"11",pro:"11a"},{name:"22",pro:"22a"},{name:"33",pro:"33a"}]
            var $cfgItem = $("<div class='cfgRow' id='"+i+"'><div class='rowCfgName'>11</div>" +
                "<div class='rowCfgOr'>aa</div>" +
                "<div class='rowIcon'><div><i class='layui-icon editCfg'>&#xe642;</i><i class='layui-icon delCfg'>&#xe640;</i></div></div>" +
                "</div>");

            $("#configT").append($cfgItem);
        }
        $(".rowIcon").find(".editCfg").each(function (index,element) {
            $(this).on("click",function () {
                var editId = $(this).parent().parent().parent().attr("id");
                alert("edit"+editId);
                //如果是iframe层
                layer.open({
                    type: 2,
                    content: 'cfgDefine.html?cfgId='+editId, //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                    area: ['700px', '600px']
                });
            });
        });

        $(".rowIcon").find(".delCfg").each(function (index,element) {
            var delId = $(this).parent().parent().parent().attr("id");
            $(this).on("click",function () {
                alert("delete"+delId);
                layer.confirm('您是如何看待前端开发？', {
                    btn: ['重要','奇葩'] //按钮
                }, function(){
                    layer.msg('的确很重要', {icon: 1,time:1000});

                }, function(){
                    /*layer.msg('也可以这样', {
                        time: 20000, //20s后自动关闭
                        btn: ['明白了', '知道了']
                    });*/
                });
            });
        });
    }




    function getCfgList() {
        var paramData = {};
        var getinfoparam = basejq.param();
        getinfoparam.reqData = paramData;
        getinfoparam.encrypt = true;
        getinfoparam.async = true;
        getinfoparam.loadImg = false;
        getinfoparam.reqCode = 'cm121';  //调用存储过程 p_cm01_getCfgList

        basejq.post(getinfoparam, function (data) {
            if (data.IsError) {
                basejq.showMsg(data.RetMessage);
                return;
            }
            // layer.closeAll();
            var datas = data.RetData.rows;
            if(datas.length==0){
                return;
            }
            for(var i=0; i<datas.length;i++){
                var cfgId = datas[i].cfgId;
                var cfgName = datas[i].cfgName;
                var cfgOrigin = datas[i].cfgOrigin;

                var $cfgItem = $("<div class='cfgRow' id='"+cfgId+"'>" +
                    "<div class='rowCfgName'>"+cfgName+"</div>" +
                    "<div class='rowCfgOr'>"+cfgOrigin+"</div>" +
                    "<div class='rowIcon'><div><i class='layui-icon editCfg'>&#xe642;</i><i class='layui-icon delCfg'>&#xe640;</i></div></div>" +
                    "</div>");
                $("#configT").append($cfgItem);
            }//for循环

            //编辑按钮遍历监听
            $(".rowIcon").find(".editCfg").each(function (index,element) {
                $(this).on("click",function () {
                    var editId = $(this).parent().parent().parent().attr("id");
                    alert("edit"+editId);
                    //如果是iframe层
                    layer.open({
                        type: 2,
                        title: '连接配置',
                        content: 'cfgDefine.html?cfgId='+editId, //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                        area: ['700px', '600px']
                    });
                });
            });//编辑按钮遍历监听

            //删除按钮遍历监听
            $(".rowIcon").find(".delCfg").each(function (index,element) {
                $(this).on("click",function () {
                    var delId = $(this).parent().parent().parent().attr("id");
                    alert("del"+delId);
                    layer.confirm('确认删除？', {
                        btn: ['是的','取消'] //按钮
                    }, function(){
                        //调用存储过程删除记录
                        delCfg(delId);

                    }, function(){
                        /*layer.msg('也可以这样', {
                            time: 20000, //20s后自动关闭
                            btn: ['明白了', '知道了']
                        });*/
                    });
                });
            });//删除按钮遍历监听

        });//base.post回调
    }//getCfgList方法




    function delCfg(cfgId) {
        var paramData = {};
        paramData.cfgId = cfgId;
        var getinfoparam = basejq.param();
        getinfoparam.reqData = paramData;
        getinfoparam.encrypt = true;
        getinfoparam.async = true;
        getinfoparam.loadImg = false;
        getinfoparam.reqCode = 'cm122';  //调用存储过程 p_cm01_delCfg

        basejq.post(getinfoparam, function (data) {
            if (data.IsError) {
                basejq.showMsg(data.RetMessage);
                return;
            }
            // layer.closeAll();
            $("#"+cfgId).fadeTo("slow",0.01,function () {
                $(this).remove();
            })
            layer.msg('删除成功', {icon: 1,time:1000});

        });
    }//delcfg方法  调用存储过程删除记录









    //分页实现
    function getCfgListpage() {
        var paramData = {};
        var getinfoparam = basejq.param();
        getinfoparam.reqData = paramData;
        getinfoparam.encrypt = true;
        getinfoparam.async = true;
        getinfoparam.loadImg = false;
        getinfoparam.reqCode = 'cm121';  //调用存储过程 p_cm01_getCfgList

        basejq.post(getinfoparam, function (data) {
            if (data.IsError) {
                basejq.showMsg(data.RetMessage);
                return;
            }
            // layer.closeAll();
            var datas = data.RetData.rows;
            var size = datas.length;

            laypage.render({
                elem: 'test1'
                ,count: size //数据总数，从服务端得到
                ,limit:5
                ,jump: function(obj, first){
                    //obj包含了当前分页的所有参数，比如：
                    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    // console.log(obj.limit); //得到每页显示的条数
                    console.log(obj)
                    var pageStartIndex = (obj.curr-1)*(obj.limit);
                    $("#configT").empty();
                    for(var i=pageStartIndex;i<(pageStartIndex+obj.limit);i++){
                        if(i<obj.count){
                            var cfgId = datas[i].cfgId;
                            var cfgName = datas[i].cfgName;
                            var cfgOrigin = datas[i].cfgOrigin;

                            var $cfgItem = $("<div class='cfgRow' id='"+cfgId+"'>" +
                                "<div class='rowCfgName'>"+cfgName+"</div>" +
                                "<div class='rowCfgOr'>"+cfgOrigin+"</div>" +
                                "<div class='rowIcon'><div><i class='layui-icon editCfg'>&#xe642;</i><i class='layui-icon delCfg'>&#xe640;</i></div></div>" +
                                "</div>");
                            $("#configT").append($cfgItem);
                        }
                    }//for循环
                     //编辑按钮遍历监听
                    $(".rowIcon").find(".editCfg").each(function (index,element) {
                        $(this).on("click",function () {
                            var editId = $(this).parent().parent().parent().attr("id");
                           // alert("edit"+editId);
                            //如果是iframe层
                            layer.open({
                                type: 2,
                                title: '连接配置',
                                content: 'cfgDefine.html?cfgId='+editId, //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                                area: ['700px', '600px']
                            });
                        });
                    });//编辑按钮遍历监听

                    //删除按钮遍历监听
                    $(".rowIcon").find(".delCfg").each(function (index,element) {
                        $(this).on("click",function () {
                            var delId = $(this).parent().parent().parent().attr("id");
                            //alert("del"+delId);
                            layer.confirm('确认删除？', {
                                btn: ['是的','取消'] //按钮
                            }, function(){
                                //调用存储过程删除记录
                                delCfg(delId);

                            }, function(){
                                /*layer.msg('也可以这样', {
                                    time: 20000, //20s后自动关闭
                                    btn: ['明白了', '知道了']
                                });*/
                            });
                        });
                    });//删除按钮遍历监听

                }//jump
            });//laypage

        });//base.post回调
    }//getCfgListpage方法




    function delCfg(cfgId) {
        var paramData = {};
        paramData.cfgId = cfgId;
        var getinfoparam = basejq.param();
        getinfoparam.reqData = paramData;
        getinfoparam.encrypt = true;
        getinfoparam.async = true;
        getinfoparam.loadImg = false;
        getinfoparam.reqCode = 'cm122';  //调用存储过程 p_cm01_delCfg

        basejq.post(getinfoparam, function (data) {
            if (data.IsError) {
                basejq.showMsg(data.RetMessage);
                return;
            }
            // layer.closeAll();
            $("#"+cfgId).fadeTo("slow",0.01,function () {
                $(this).remove();
            })
            layer.msg('删除成功', {icon: 1,time:1000});

        });
    }//delcfg方法  调用存储过程删除记录

});//layui.use





