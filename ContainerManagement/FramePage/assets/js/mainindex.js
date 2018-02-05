//关闭tab
function closeTab(n) {
    var obj = $("a[href='#tabMsg" + n + "']").parent();
    var objShow = $("#tabMsg" + n);
    var otherObj = obj.next();
    if (!bj.isDefine(otherObj)) {
        otherObj = obj.pre();
    }
    if (bj.isDefine(otherObj)) {
        otherObj.children().trigger("click");
    }
    obj.remove();
    objShow.remove();
}
//获取用户信息
function userInfo() {
    //--组织具体入参
    var param = basejq.param(); //获取交互参数结构
    param.loadImg = true;       //异步
    param.reqCode = '301';      //交易代码
    //2.调用交互方法
    basejq.post(param, function (data) {
        //console.log(data);
        $("#logoName").html(data.RetData.appName);
        var tree = data.RetData.tree;
        data = data.RetData.rows;
        bj.bind(tree,"leftTree");
        $("#user_name").html(data.userName);
        $("#user_dept").html(data.branchName+data.deptName);
    });
}
function showPage(mark,name,url)
{
    if ($("a[href='#tabMsg" + mark + "']").length < 1) {
        var tab = '<li>'
               + '<a data-toggle="tab" href="#tabMsg' + mark + '">' + name + '&nbsp;<i onclick="closeTab(\'' + mark + '\')" class=" icon-eye-close"></i></a>';
        +'</li>';
        var tabContent = '<div id="tabMsg' + mark + '" class="tab-pane active">'
                    + '<iframe src="' + url + '" width="100%" height="100px" noresize="noresize" frameborder="no" scrolling="auto"'
        + 'name="mainFrame' + mark + '" id="mainFrame' + mark + '"></iframe></div>';
        $("#recent-tab").append(tab);
        $("#tabContent").append(tabContent);
        
    }
    $("a[href='#tabMsg" + mark + "']").trigger("click");
}
function goPages(id, name, url, type) {
    if (url != "#")
        showPage(id+type,name, url);
}

//下拉图标
function downIcon(url) {
    if (url == "#") return '<b class="arrow icon-angle-down"></b>';
    return "";
}
$(function () {
    userInfo();
    $("#logoName").click(function () {
        test();
    });
});

function test() {
    //bj.showMsg("aa", 0, function () { alert('ok'); }, function () { alert("b");});
    bj.showMsg("<img src='../Content/js/artdialog/loading-1.gif'/>", -1);
   
}
