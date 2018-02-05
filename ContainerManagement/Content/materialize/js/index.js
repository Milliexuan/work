//关闭TAB
function closeTab(n) {
    var obj = $("a[href='#bjtab" + n + "']").parent();
    var objShow = $("#bjtab" + n);
    var otherObj = obj.next();
    //console.log(otherObj.html());
    if (!bj.isDefine(otherObj)) {
        otherObj = obj.pre();
    }
    if (bj.isDefine(otherObj)) {
        otherObj.children().trigger("click");
    }
    obj.remove();
    objShow.remove();
    $('ul.tabs').tabs();

}
//创建TAB，内容页被goPages方法调用
function showPage(mark, name, url) {
    if ($("a[href='#bjtab" + mark + "']").length < 1) {
        //var dHeight = $(window).height() - 120;//a[i].contentWindow.document.documentElement.scrollHeight;
        var dHeight = $(window).height() - 60;
        if (!$("#header").is(":hidden")) dHeight -= 60;
        var tab = '<li class="tab"><a href="#bjtab' + mark + '">&nbsp<i class="mdi-content-clear" onclick="closeTab(\'' + mark + '\')"></i>&nbsp&nbsp&nbsp' + name + '</a></li>';
        var tabContent = '<div id="bjtab' + mark + '" class="col s12" style="padding-right:1px;padding-left:1px;">'
                        + '<iframe src="' + url + '" width="100%" height="' + dHeight + 'px" noresize="noresize" frameborder="no" scrolling="auto" name="mainFrame" id="mainFrame"></iframe></div>';
        $("#tab").prepend(tab);
        $("#tabContent").prepend(tabContent);
        $('ul.tabs').tabs();
    }
    $("a[href='#bjtab" + mark + "']").trigger("click");
}
//创建TAB页面调用方法
function goPages(id, name, url, type) {
    if (url != "#") {
        url = "../FramePage/DelegateAppFunc.aspx?zjfuncid=" + id + "&zjfunctype=" + type + "&funcname=" + name;
        showPage(id + type, name, url);
    }
}
//隐藏左边菜单
function hideNav() {
    var $navMobile = $('#nav-mobile');
    var $body = $('body');
    $navMobile.css('display', 'none');
    $body.css('overflow', 'auto');
    $("main").css("padding-left", "0px");
}
//显示左边菜单
function showNav() {
    var $navMobile = $('#nav-mobile');
    var $body = $('body');
    $navMobile.css('display', 'block');
    $("main").css("padding-left", "240px");
    $body.css('overflow', 'auto');

}
//
//应用信息获取，显示
function appInfoInit() {
    //--组织具体入参
    var param = basejq.param(); //获取交互参数结构
    param.loadImg = true;       //异步
    param.reqCode = '301';      //交易代码
    //2.调用交互方法
    basejq.post(param, function (data) {
        //console.log(data);
        $("#logoName,#logoName2").html(data.RetData.appName); //应用名称
        $("title").html(data.RetData.appName); //应用名称
        var tree = data.RetData.tree; //左侧菜单树数据
        data = data.RetData.rows; //用户信息数据
        //console.log(tree);
        bj.bind(tree, "leftTree");
        $("#welcome").html("欢迎您！" + data.userName);
        $("#name,#name1").html(data.userName);
        $("#name2").html("欢迎您！" + data.userName + "<br/>" + data.branchName + data.deptName + data.postName + "");
        $("#branch,#branch1").html(data.branchName);
        $("#dept,#dept1").html(data.deptName);
        $("#post,#post1").html(data.postName);
        //加载materialize
        var path = bj.getRootUrl();
        $("body").append('<script type="text/javascript" src="' + path + 'Content/materialize/js/materialize.js"></script>');
        $("body").append('<script type="text/javascript" src="' + path + 'Content/materialize/js/prism.js"></script>');
        $("body").append('<script type="text/javascript" src="' + path + 'Content/materialize/js/app.js"></script>');
        activeSidebar();
        //跨应用跳转
        goJump();

    });
}
function goJump() {
    var id = bj.getUrlParam("zjffuncid");
    if (id != null) {
        type = bj.getUrlParam("zjffunctype");
        goPages(id, "", "dd", type);
    }
}
var $Btntop;
function d() {
    //alert(window.event.clientX);
    //alert(window.event.clientY);
    var wx = window.event.clientX;
    var wy = window.event.clientY;
    var d_left = document.getElementById('menu-top').offsetLeft;
    var d_top = document.getElementById('menu-top').offsetTop;
    var d_width = document.getElementById('menu-top').clientWidth;
    var d_height = document.getElementById('menu-top').clientHeight;
    //alert(wx + '_' + wy + '_' + d_left + '_' + d_width + '_' + d_top + '_' + d_height)
    if (wx < d_left || wy < d_top || wx > (d_left + d_width) || wy > (d_top + d_height))
        $("#menu-top").slideUp("fast");
    return false;
}
function downName(a) {
    return "down" + a;
}
function menuImg(a) {
    if (a == '#') {
        //return "";
        return "mdi-navigation-arrow-drop-down right";
    }
    else return "mdi-hardware-keyboard-arrow-right right";
}
$(function () {
    appInfoInit();
    //$(".m-top").hover(function () {
    //    $("#menu-top").slideDown("fast");
    //    $("#menu-top").attr("hover", "true");
    //    $Btntop = $(this);
    //},
    //       function () {
    //           d();
    //       });

    //$("#menu-top").hover(function () {
    //    $Btntop.addClass("over");
    //},
    //function () {
    //    $Btntop.removeClass("over");
    //    $("#menu-top").slideUp("fast");

    //});
})