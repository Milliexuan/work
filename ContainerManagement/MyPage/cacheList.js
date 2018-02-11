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
    $("#addCache").on("click",function () {
        //alert("add");
        //如果是iframe层
        layer.open({
            type: 2,
            title:'缓存任务',
            content: 'cacheDefine.html', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
            area: ['700px', '500px']
        });
    });







//-------------------测试---------------
    //testLocal();



    function testLocal() {
        var datas=[{name:"11",pro:"11a"},{name:"22",pro:"22a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"}
            ,{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"}
            ,{name:"33",pro:"33a"},{name:"3555553",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"}
            ,{name:"35555553",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"}
            ,{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"bb",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"}
            ,{name:"33",pro:"33a"},{name:"bbb",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"}
            ,{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"}
            ,{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"}
            ,{name:"33",pro:"33a"}
            ,{name:"33",pro:"33a"},{name:"3bbb3",pro:"33a"},{name:"bbb",pro:"33a"},{name:"33bb",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"}
            ,{name:"33",pro:"33aaaghhha"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"}
            ,{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"},{name:"33",pro:"33a"}
            ,{name:"3ccc3",pro:"33a"},{name:"355553",pro:"33a"},{name:"3ccc3",pro:"33a"},{name:"33",pro:"33a"},{name:"67lalal",pro:"33a"}];
        $("#searchCache").on("click", function () {
            var searchName = $("input[name='keyword']").val();
            if (searchName == "") {
                return;
            }
            var reg = new RegExp(searchName);
            var arrList = new Array();
            $("#cacheT").empty();
            for (var j = 0; j < datas.length; j++) {
                var namec = datas[j].name;
                if(reg.test(namec)){
                    arrList.push(datas[j]);
                    /*var $cacheItem = $("<div class='cacheRow' id='" + j + "'><div class='rowCacheName'>" + datas[j].name + "</div>" +
                        "<div class='rowCacheStatus'>" + datas[j].pro + "</div>" +
                        "<div class='rowCacheNextTime'>2017.03.3 12:34:00</div>" +
                        "<div class='rowIcon'><div><i class='layui-icon editCache'>&#xe642;</i><i class='layui-icon delCache'>&#xe640;</i><i class='layui-icon refreshCache'>&#x1002;</i></div></div>" +
                        "</div>");
                    $("#cacheT").append($cacheItem);*/
                }
            }
            laypage.render({
                elem: 'test1'
                ,count: arrList.length //数据总数，从服务端得到
                ,jump: function(obj, first){
                    //obj包含了当前分页的所有参数，比如：
                    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    // console.log(obj.limit); //得到每页显示的条数
                    console.log(obj)
                    var pageStartIndex = (obj.curr-1)*(obj.limit);
                    $("#cacheT").empty();
                    for(var i=pageStartIndex;i<(pageStartIndex+obj.limit);i++){
                        if(i<obj.count) {//-----------------------------
						
                            var $cacheItem = $("<div class='cacheRow' id='" + i + "'><div class='rowCacheName'>" + arrList[i].name + "</div>" +
                                "<div class='rowCacheStatus'>" + arrList[i].pro + "</div>" +
                                "<div class='rowCacheNextTime'>2017.03.3 12:34:00</div>" +
                                "<div class='rowIcon'><div><i class='layui-icon editCache'>&#xe642;</i><i class='layui-icon delCache'>&#xe640;</i><i class='layui-icon refreshCache'>&#x1002;</i></div></div>" +
                                "</div>");
                            $("#cacheT").append($cacheItem);
                        }
                    }

                    $(".rowIcon").find(".editCache").each(function (index,element) {
                        $(this).on("click",function () {
                            var editId = $(this).parent().parent().parent().attr("id");
                            alert("edit"+editId);
                            //如果是iframe层
                            layer.open({
                                type: 2,
                                content: 'cacheDefine.html?cfgId='+editId, //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                                area: ['700px', '500px']
                            });
                        });
                    });

                    $(".rowIcon").find(".delCache").each(function (index,element) {
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


                    $(".rowIcon").find(".refreshCache").each(function (index,element) {
                        var refreshId = $(this).parent().parent().parent().attr("id");
                        $(this).on("click",function () {
                            alert("refresh"+refreshId);
                        });
                    });
                    //首次不执行
                    if(!first){
                        //do something
                    }
                }
            });
        });




        var size = datas.length;
        laypage.render({
            elem: 'test1'
            ,count: size //数据总数，从服务端得到
            ,jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                console.log(obj)
                var pageStartIndex = (obj.curr-1)*(obj.limit);
                $("#cacheT").empty();
                for(var i=pageStartIndex;i<(pageStartIndex+obj.limit);i++){
                    if(i<obj.count) {//-----------------------------
                        var $cacheItem = $("<div class='cacheRow' id='" + i + "'><div class='rowCacheName'>" + datas[i].name + "</div>" +
                            "<div class='rowCacheStatus'>" + datas[i].pro + "</div>" +
                            "<div class='rowCacheNextTime'>2017.03.3 12:34:00</div>" +
                            "<div class='rowIcon'><div><i class='layui-icon editCache'>&#xe642;</i><i class='layui-icon delCache'>&#xe640;</i><i class='layui-icon refreshCache'>&#x1002;</i></div></div>" +
                            "</div>");
                        $("#cacheT").append($cacheItem);
                    }
                }

                $(".rowIcon").find(".editCache").each(function (index,element) {
                    $(this).on("click",function () {
                        var editId = $(this).parent().parent().parent().attr("id");
                        alert("edit"+editId);
                        //如果是iframe层
                        layer.open({
                            type: 2,
                            content: 'cacheDefine.html?cfgId='+editId, //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                            area: ['700px', '500px']
                        });
                    });
                });

                $(".rowIcon").find(".delCache").each(function (index,element) {
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


                $(".rowIcon").find(".refreshCache").each(function (index,element) {
                    var refreshId = $(this).parent().parent().parent().attr("id");
                    $(this).on("click",function () {
                        alert("refresh"+refreshId);
                    });
                });
                //首次不执行
                if(!first){
                    //do something
                }
            }
        });
    }



//-----------正式数据--------------------------

getCacheListPage();

    function getCacheList() {
        var paramData = {};
        var getinfoparam = basejq.param();
        getinfoparam.reqData = paramData;
        getinfoparam.encrypt = true;
        getinfoparam.async = true;
        getinfoparam.loadImg = false;
        getinfoparam.reqCode = 'cm141';  //调用存储过程 p_cm01_getCacheJobList

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
                var cacheJobId = datas[i].cacheJobId;
                var cacheJobName = datas[i].cacheJobName;
                var cacheJobStatus = datas[i].cacheJobStatus;
                var cacheJobnextTime = datas[i].cacheJobnextTime;

                var $cacheItem = $("<div class='cacheRow' id='"+cacheJobId+"'>" +
                    "<div class='rowCacheName'>"+cacheJobName+"</div>" +
                    "<div class='rowCacheStatus'>"+cacheJobStatus+"</div>" +
                    "<div class='rowCacheNextTime'>"+cacheJobnextTime+"</div>"+
                    "<div class='rowIcon'><div><i class='layui-icon editCache'>&#xe642;</i><i class='layui-icon delCache'>&#xe640;</i><i class='layui-icon refreshCache'>&#x1002;</i></div></div>" +
                    "</div>");
                $("#cacheT").append($cacheItem);
            }//for循环

            //编辑按钮遍历监听
            $(".rowIcon").find(".editCache").each(function (index,element) {
                $(this).on("click",function () {
                    var editId = $(this).parent().parent().parent().attr("id");
                    alert("edit"+editId);
                    //iframe层
                    layer.open({
                        type: 2,
                        content: 'cacheDefine.html?cacheId='+editId, //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                        area: ['700px', '500px']
                    });
                });
            });//编辑按钮遍历监听

            //删除按钮遍历监听
            $(".rowIcon").find(".delCache").each(function (index,element) {
                var delId = $(this).parent().parent().parent().attr("id");
                $(this).on("click",function () {
                    alert("delete"+delId);
                    layer.confirm('确认删除？', {
                        btn: ['删除','取消'] //按钮
                    }, function(){
                        //调用删除缓存任务的存储过程
                        delCacheJob(delId);
                        //layer.msg('的确很重要', {icon: 1,time:1000});

                    }, function(){
                        /*layer.msg('也可以这样', {
                            time: 20000, //20s后自动关闭
                            btn: ['明白了', '知道了']
                        });*/
                    });
                });
            });//删除按钮遍历监听

            //刷新按钮遍历监听
            $(".rowIcon").find(".refreshCache").each(function (index,element) {
                var refreshId = $(this).parent().parent().parent().attr("id");
                $(this).on("click",function () {
                    alert("refresh"+refreshId);
                    //调用存储过程

                });
            });//刷新按钮遍历监听

        });//base.post回调
    }//getCacheList方法








    function delCacheJob(cacheJobId) {
        var paramData = {};
        paramData.cacheJobId = cacheJobId;
        var getinfoparam = basejq.param();
        getinfoparam.reqData = paramData;
        getinfoparam.encrypt = true;
        getinfoparam.async = true;
        getinfoparam.loadImg = false;
        getinfoparam.reqCode = 'cm142';  //调用存储过程 p_cm01_delCacheJob

        basejq.post(getinfoparam, function (data) {
            if (data.IsError) {
                basejq.showMsg(data.RetMessage);
                return;
            }
            // layer.closeAll();
            $("#"+cacheJobId).fadeTo("slow",0.01,function () {
                $(this).remove();
            })
            layer.msg('删除成功', {icon: 1,time:1000});

        });
    }//delCacheJob方法  调用存储过程删除记录




    function refreshCache(cacheJobId){
        //现根据id获取到这个cacheJob
        var paramData = {};
        paramData.cacheJobId = cacheJobId;
        var getinfoparam = basejq.param();
        getinfoparam.reqData = paramData;
        getinfoparam.encrypt = true;
        getinfoparam.async = true;
        getinfoparam.loadImg = false;
        getinfoparam.reqCode = 'cm143';  //调用存储过程  p_cm01_saveManualCacheJob
        basejq.post(getinfoparam, function (data) {
            if (data.IsError) {
                basejq.showMsg(data.RetMessage);
                return;
            }
            // layer.closeAll();
            //var datas = data.RetData.rows;

            location.reload();
            layer.msg('刷新成功', {icon: 1,time:1000});
        });
    }










//实现对列表缓存任务清单的分页  删除、编辑、刷新监听
    function getCacheListPage(){
        var paramData = {};
        var getinfoparam = basejq.param();
        getinfoparam.reqData = paramData;
        getinfoparam.encrypt = true;
        getinfoparam.async = true;
        getinfoparam.loadImg = false;
        getinfoparam.reqCode = 'cm141';  //调用存储过程

        basejq.post(getinfoparam, function (data) {
            if (data.IsError) {
                basejq.showMsg(data.RetMessage);
                return;
            }
            // layer.closeAll();
            // layer.closeAll();
            var datas = data.RetData.rows;

            var size = datas.length;
            laypage.render({
                elem: 'test1'
                ,count: size //数据总数，从服务端得到
                ,jump: function(obj, first){
                    //obj包含了当前分页的所有参数，比如：
                    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    // console.log(obj.limit); //得到每页显示的条数
                    console.log(obj)
                    var pageStartIndex = (obj.curr-1)*(obj.limit);
                    $("#cacheT").empty();
                    for(var i=pageStartIndex;i<(pageStartIndex+obj.limit);i++){

                        if(i<obj.count){

                            if(datas[i].cacheJobStatus==0){
                                continue;
                            }
							var runStatus;
                            var cacheJobId = datas[i].cacheJobId;
                            var cacheJobName = datas[i].cacheJobName;
                            var cacheJobCode = datas[i].cacheJobCode;
                            var cacheJobProcedure = datas[i].cacheJobProcedure;
                            var cacheJobInvalidTime = datas[i].cacheJobInvalidTime;
                            var cacheJobKey = datas[i].cacheJobKey;
                            var cacheJobStatus = datas[i].cacheJobStatus;
							if(cacheJobStatus=="1"){
								cacheJobStatus="运行中";
							}else if(cacheJobStatus=="0"){
								cacheJobStatus="无效";
							}
                            var cacheJobnextTime = datas[i].cacheJobnextTime;



                            var $cacheItem = $("<div class='cacheRow' id='"+cacheJobId+"'>" +
                                "<div class='rowCacheName'>"+cacheJobName+"</div>" +
                                    "<div class='rowCacheCode'>"+cacheJobCode+"</div>"+
                                "<div class='rowCacheProce'>"+cacheJobProcedure+"</div>"+
                                "<div class='rowCacheStatus'>"+cacheJobStatus+"</div>" +
                                "<div class='rowCacheNextTime'>"+cacheJobnextTime+"</div>"+
                                    "<div class='rowCacheInvalid'>"+cacheJobInvalidTime+"分</div>"+
                                    "<div class='rowCacheKey'>"+cacheJobKey+"</div>"+
                                "<div class='rowIcon'><div><i class='layui-icon editCache'>&#xe642;</i><i class='layui-icon delCache'>&#xe640;</i><i class='layui-icon refreshCache'>&#x1002;</i></div></div>" +
                                "</div>");
                            $("#cacheT").append($cacheItem);
                        }
                    }

                    $(".rowIcon").find(".editCache").each(function (index,element) {
                        $(this).on("click",function () {
                            var editId = $(this).parent().parent().parent().attr("id");
                            //alert("edit"+editId);
                            //如果是iframe层
                            layer.open({
                                type: 2,
                                title:'缓存任务',
                                content: 'cacheDefine.html?cacheId='+editId, //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                                area: ['700px', '600px']
                            });
                        });
                    });

                    $(".rowIcon").find(".delCache").each(function (index,element) {
                        var delId = $(this).parent().parent().parent().attr("id");
                        $(this).on("click",function () {
                            //alert("delete"+delId);
                            layer.confirm('确认删除？', {
                                btn: ['删除','取消'] //按钮
                            }, function(){
                                //layer.msg('的确很重要', {icon: 1,time:1000});
                               delCacheJob(delId);

                            }, function(){
                                /*layer.msg('也可以这样', {
                                    time: 20000, //20s后自动关闭
                                    btn: ['明白了', '知道了']
                                });*/
                            });
                        });
                    });


                    $(".rowIcon").find(".refreshCache").each(function (index,element) {
                        var refreshId = $(this).parent().parent().parent().attr("id");
                        $(this).on("click",function () {
                            //alert("refresh"+refreshId);
                            //调用刷新缓存的存储过程
                            refreshCache(refreshId);
                        });
                    });
                    //首次不执行
                    if(!first){
                        //do something
                    }
                }
            });//laypage.render

        });//basepost
    }//getCacheListPage()



});//layui.use





