/*
*index.aspx主页JS函数
*主要用户菜单的显示与链接
*/

//点击功能点时链接到具体页面
function switchUserAppFunc(intAppId, intAppFuncId, funName) {

    if (intAppFuncId == 'P')
    {
        if (document.all.LeftPane != null) {
            document.all.LeftPane.style.display = "none";
            document.all.LeftArrow.style.display = "none";
        }
    }
    document.all.mainTitle.style.display = "block";
    document.all.banTitleTd.innerHTML = "<span class='BanTitleFont'>" + funName + "<img  id=\"banTitleImg\" src=\"../Content/images/027.gif\" /></span>";
    
    if(intAppId!=""&&intAppFuncId!=""){
        if(document.all.frmUserAppFrame){
            document.all.frmUserAppFrame.src="./DelegateAppFunc.aspx?zjfuncid="+intAppId+"&zjfunctype="+intAppFuncId+"&funcname="+funName;
        }
    }
    
    if (document.all.frmUserAppFrame) funcwait(document.all.frmUserAppFrame);
    
	
}
//iframe 加载完毕隐藏等待图标
function funcwait(iframe)
{
    if (iframe.attachEvent) {
    
        iframe.attachEvent("onload", function () {

            document.all.banTitleImg.style.display = "none";

        });

    } else {

        iframe.onload = function () {

            document.all.banTitleImg.style.display = "none";

        };

    }
}

//从外部直接登陆到具体功能点页面
function switchUserAppFuncs(funcId, funcType, urlStr) {
    var plageName = '';
    var plageId = '';
    if (funcType == 'P') {
        if (document.all.LeftPane != null) {
            document.all.LeftPane.style.display = "none";
            document.all.LeftArrow.style.display = "none";
        }
    }
    else if (funcType == 'M') {
        for (i = 0; i < IDArray.length; i++) {

            if (IDArray[i] == funcId && TYPEArray[i] == "M") {
                plageId = UPIDArray[i];
                for (j = 0; j < IDArray.length; j++) {

                    if (IDArray[j] == plageId && TYPEArray[j] == "P") {
                        plageName = NAMEArray[j];
                        break;
                    }
                }
                break;
            }
        }
    }
    else {
        for (i = 0; i < IDArray.length; i++) {

            if (IDArray[i] == funcId && TYPEArray[i] == "F") {
                plageId = UPIDArray[i];
                for (j = 0; j < IDArray.length; j++) {

                    if (IDArray[j] == plageId && TYPEArray[j] == "M") {
                        plageId = UPIDArray[j];
                        for (k = 0; k < IDArray.length; k++) {

                            if (IDArray[k] == plageId && TYPEArray[k] == "P") {
                                plageName = NAMEArray[k];
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
    }

    if (plageName != '')
    {
        createMenuTree(plageId, plageName);
    }
    var funcName = "";
    for (i = 0; i < IDArray.length; i++) {

        if (IDArray[i] == funcId && TYPEArray[i] == funcType) {
            funcName = NAMEArray[i];
            break;
        }
    }
    document.all.mainTitle.style.display = "block";
    document.all.banTitleTd.innerHTML = "<span class='BanTitleFont'>" + funcName + "<img  id=\"banTitleImg\" src=\"../Content/images/027.gif\" /></span>";
    var url = "";
    if (!(urlStr.indexOf('zjfuncid') > 0) && !(urlStr.indexOf('zjfunctype') > 0)) {
        url =urlStr+ '&zjfuncid=' + funcId + "&zjfunctype=" + funcType;
    }
    else url = urlStr;
    if (funcId != "" && funcType != "") {
        
        if (document.all.frmUserAppFrame) {
            document.all.frmUserAppFrame.src = "./DelegateAppFunc.aspx" + url + "&funcname=" + funcName;
        }
    }
    if (document.all.frmUserAppFrame) funcwait(document.all.frmUserAppFrame);
}

//同个应用内不同板块功能点的跳转
function switchUserAppFunch(funcId, funcType, urlStr) {
    var plageName = '';
    var plageId = '';
    if (funcType == 'P') {
        if (document.all.LeftPane != null) {
            document.all.LeftPane.style.display = "none";
            document.all.LeftArrow.style.display = "none";
        }
    }
    else if (funcType == 'M') {
        for (i = 0; i < IDArray.length; i++) {

            if (IDArray[i] == funcId && TYPEArray[i] == "M") {
                plageId = UPIDArray[i];
                for (j = 0; j < IDArray.length; j++) {

                    if (IDArray[j] == plageId && TYPEArray[j] == "P") {
                        plageName = NAMEArray[j];
                        break;
                    }
                }
                break;
            }
        }
    }
    else {
        for (i = 0; i < IDArray.length; i++) {

            if (IDArray[i] == funcId && TYPEArray[i] == "F") {
                plageId = UPIDArray[i];
                for (j = 0; j < IDArray.length; j++) {

                    if (IDArray[j] == plageId && TYPEArray[j] == "M") {
                        plageId = UPIDArray[j];
                        for (k = 0; k < IDArray.length; k++) {

                            if (IDArray[k] == plageId && TYPEArray[k] == "P") {
                                plageName = NAMEArray[k];
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
    }

    if (plageName != '') {
        createMenuTree(plageId, plageName);
    }
    var funcName = "";
    for (i = 0; i < IDArray.length; i++) {

        if (IDArray[i] == funcId && TYPEArray[i] == funcType) {
            funcName = NAMEArray[i];
            break;
        }
    }
    document.all.mainTitle.style.display = "block";
    document.all.banTitleTd.innerHTML = "<span class='BanTitleFont'>" + funcName + "<img  id=\"banTitleImg\" src=\"../Content/images/027.gif\" /></span>";
    var url = "";
    if (urlStr != "")
    {
        url = '?zjfuncid=' + funcId + "&zjfunctype=" + funcType+ "&" + urlStr;
    }
    else url = '?zjfuncid=' + funcId + "&zjfunctype=" + funcType;
    if (funcId != "" && funcType != "") {

        if (document.all.frmUserAppFrame) {
            document.all.frmUserAppFrame.src = "./DelegateAppFunc.aspx" + url + "&funcname=" + funcName;
        }
    }
    if (document.all.frmUserAppFrame) funcwait(document.all.frmUserAppFrame);
}


//show hide node tree
function showHideSunNode(strAppId,strParentNodeId){
	var arrNodes=document.getElementsByName("appfunc"+strAppId);//get app's all node
	if(arrNodes){
		if(arrNodes.length>0){//if node number >0，then find this node's next node
			for(i=0;i<arrNodes.length;i++){
				var strTempParentId=arrNodes[i].getAttribute("parentid");
				if(strTempParentId!="0"&&strTempParentId==strParentNodeId){//if isn't root node and super node is strParentNodeId then show or hide
					if(arrNodes[i].style.display=="block"){
						arrNodes[i].style.display="none";
					}else{
						arrNodes[i].style.display="block";
					}
				}
			}
		}
	}
	
}

//show hide module tree
function showHideModule(strAppId,strModuleId){
	var arrNodes=document.getElementsByName("appmodule"+strModuleId);//get app's all node
	if(arrNodes){
		if(arrNodes.length>0){//if node number >0，then find this node's next node
			for(i=0;i<arrNodes.length;i++){
				var strTempParentId=arrNodes[i].getAttribute("parentid");
				if(strTempParentId!="0"&&strTempParentId==strModuleId){//if isn't root node and super node is strParentNodeId then show or hide
					if(arrNodes[i].style.display=="none"){
						arrNodes[i].style.display="block";
					}else{
						arrNodes[i].style.display="none";
					}
				}
			}
		}
	}
	
}


function showHidePane(oSender,strPaneType){
	var oPaneFrame=document.all.PaneFrame;
	if(strPaneType=="LEFT"){
		var oPane;
		for(i=0;i<oPaneFrame.rows(0).cells.length;i++){
			if(oPaneFrame.rows(0).cells(i).id.indexOf("LeftPane")>-1){//如果有左边pane则引用左边pane
				oPane=oPaneFrame.rows(0).cells(i);
			}
		}
		if(oPane){
			if(oPane.style.display=="none"){
				oPane.style.display="block";
				oSender.src = "../Content/images/LeftArrow.gif";
			}else{
				oPane.style.display="none";
				oSender.src = "../Content/images/RightArrow.gif";
			}
		}
	}
	if(strPaneType=="RIGHT"){
		var oPane;
		for(i=0;i<oPaneFrame.rows(0).cells.length;i++){
			if(oPaneFrame.rows(0).cells(i).id.indexOf("RightPane")>-1){//如果有右边pane则引用右边pane
				oPane=oPaneFrame.rows(0).cells(i);
			}
		}
		if(oPane){
			if(oPane.style.display=="none"){
				oPane.style.display="block";
				oSender.src="../Content/images/RightArrow.gif";
			}else{
				oPane.style.display="none";
				oSender.src="../Content/images/LeftArrow.gif";
			}
		}
	}
	if(strPaneType=="UP"){
		var oTopRow1=document.all.TopRow1;
		//var oTopRow2=document.all.TopRow2;
		//var oTopRow3=document.all.TopRow3;
		//if(oTopRow1&&oTopRow2&&oTopRow3){
		if(oTopRow1){	
			//if(oTopRow1.style.display=="block"&&oTopRow2.style.display=="block"&&oTopRow3.style.display=="block"){
			if(oTopRow1.style.display=="block"){				
				oTopRow1.style.display="none";
				//oTopRow2.style.display="none";
				//oTopRow3.style.display="none";
				oSender.src="../Content/images/DownArrow.gif";
			}else{
				oTopRow1.style.display="block";
				//oTopRow2.style.display="block";
				//oTopRow3.style.display="block";
				oSender.src="../Content/images/UpArrow.gif";
			}
		}
	}
	
	if(strPaneType=="HALFUP"){
		var oTopRow1=document.all.TopRow1;
		var oTopRow2=document.all.TopRow2;
		if(oTopRow1&&oTopRow2){
			if(oTopRow1.style.display=="block"&&oTopRow2.style.display=="block"){
				oTopRow1.style.display="none";
				oTopRow2.style.display="none";
				oSender.src="../Content/images/DownArrow.gif";
			}else{
				oTopRow1.style.display="block";
				oTopRow2.style.display="block";
				oSender.src="../Content/images/UpArrow.gif";
			}
		}
	}
}


//创建菜单树
function createMenuTree(plateid,plateName)
{
    var istr = null;
    if (plateid)
    {
        
        document.all.LeftPane.style.display = "block";
        document.all.LeftArrow.style.display = "block";
        document.all.mainTitle.style.display = "none";
        if (document.all.frmUserAppFrame) {
            document.all.frmUserAppFrame.src = "./UserAppIndex.aspx";
        }
       
        document.all.plateTitle.innerHTML = "<span class=\"BanTitleFont\" id=\"v\">" + plateName + "</span>";
        istr="<table width=\"100%\" id=\"MenuContainer\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
        for(i=0;i<IDArray.length;i++)
        {
            var clickStr="";
            if(UPIDArray[i]==plateid && TYPEArray[i]=='M')
            {
                if (URLArray[i]=='Y')
                {
                    clickStr = "switchUserAppFunc('" + IDArray[i] + "','" + TYPEArray[i] + "','" + NAMEArray[i] + "');window.scroll(0,0);";
                }
                else
                { 
                    clickStr="showHideMenu('"+IDArray[i]+"')";
                }
                istr+="<tr moduleid=\""+IDArray[i]+"\" type=\"menutitle\" onclick=\""+clickStr+"\" style=\"cursor:hand\">"
                istr+="<td bgcolor=\"#f5f5f5\" ><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\"10\" align=\"center\">";
                istr+="<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\"6\" height=\"6\" class=\"ImgBanInfoArrow\"></td></tr></table>";
                istr+="</td><td height=\"20\" class=\"TopToolFont\">"+NAMEArray[i]+"</td></tr></table></td></tr>";
                istr += "<tr moduleid=\"" + IDArray[i] + "\" type=\"menutitle\"><td height=\"3\" class=\"ImgBanInfoSplitDot\"></td></tr>"
                if(URLArray[i]=='N')
                {
                    for(j=0;j<IDArray.length;j++)
                    {
                        if(IDArray[j])
                        {
                            if (UPIDArray[j] == IDArray[i] && TYPEArray[j] == 'F') {
                                istr += "<tr  moduleid=\"" + IDArray[i] + "\" type=\"menuitem\" ><td><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr>";
                                istr += "<td width=\"18\" align=\"right\"><table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr>";
                                istr += "</tr></table></td><td height=\"20\"><a onclick=\"switchUserAppFunc('" + IDArray[j] + "','" + TYPEArray[j] + "','" + NAMEArray[j] + "');window.scroll(0,0);\" style=\"cursor:hand\" class=\"AppLeaveNode\" target=\"_self\"><img src=\"../content/images/T.png\" width=\"16\" height=\"16\" border=\"0\"/>" + NAMEArray[j] + "</a></td>";
                                istr += "</tr></table></td></tr><tr moduleid=\"" + IDArray[i] + "\" type=\"menuitem\" ></tr>";
                            }
                        }
                    }
                }
            }
        }
        istr+="</table>	";
    }
    if (istr != null) document.all.menuTree.innerHTML = istr;
              
   
}
function SetMenuSit() {
    var $menuul = $("#menuul"),
         $menuTree = $("#MenuContainer"),
         treeTop = $("#FuncPane").offset().top - $("#MidPane").offset().top + 15,
    height = $("#MidPane").height() - treeTop;
    //alert(treeTop);
    //alert("b");
    $("#menuTree").height(height);
    $menuul.height(height);
    $menuul.css("table-layout", "fixed");
    //document.getElementById("lsd").innerHTML = $menuTree.height() + "/" + height;
    if ($menuTree.height() / height > 1) {
        $("#menuul").css("overflow-y", "scroll");
    }
    else {
        $("#menuul").css("overflow-y", "hidden");
    }
}


/***********************漂浮的lib开始***********************************************/
document.write("<SCRIPT LANGUAGE=\"JavaScript\" src=\"/Content/js/overlib.js\"></SCRIPT>");
/***********************漂浮的lib结束***********************************************/