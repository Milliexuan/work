function getRadioValue(obj)
{
    document.getElementById("UserIdHField").valule=obj.value;
    alert(document.getElementById("UserIdHField").valule);
}


//应用管理菜单
function switchAppAdminMenu(strAppId, strFuncType, strFuncUrl, strFuncIdList) {
    var arrFuncIds = strFuncIdList.split(",");

    for (i = 0; i < arrFuncIds.length; i++) {//循环所有功能id
        var oMenuLink = eval("document.all.AppAdminMenuLink" + arrFuncIds[i]);
        var oMenuBg = eval("document.all.AppAdminMenuPane" + arrFuncIds[i]);
        if (arrFuncIds[i] == strFuncType) {
            oMenuLink.className = "NavFont";
            oMenuBg.className = "NavBtnFace";
        } else {
            oMenuLink.className = "TopToolFont";
            oMenuBg.className = "BanBgColor";
        }
    }
    if (strFuncUrl != "" && document.all.frmAppAdminMainFrame) {
        document.all.frmAppAdminMainFrame.src = strFuncUrl + "?key=" + strAppId;//传递appid到每个管理界面
    }
}

function getCheckedItemValue(oOpt,strChkItemName,selType){
    var strVal=null;
    if(oOpt){
        if(oOpt.length){
            var intSelectedNum=0;
            for(i=0;i<oOpt.length;i++){
                if(oOpt[i].checked){
                    intSelectedNum++;
                    if(selType=="SINGLE"){
                        strVal= oOpt[i].value;
                    }else{
                        if(strVal==null){
                            strVal= oOpt[i].value+",";
                        }else{
                            strVal+=oOpt[i].value+",";
                        }
                    }
                }
            }
            if(selType=="SINGLE"){
                if(intSelectedNum>1){
                    alert("select only one "+strChkItemName+"!");
                    strVal=null;
                }else if(intSelectedNum<1){
                    alert("please select one "+strChkItemName+"!");
                    strVal=null;
                }
            }else{
                if(intSelectedNum<1){
                    alert("please select one "+strChkItemName+" at least!");
                    strVal=null;
                }else{
                    strVal=strVal.substring(0,strVal.length-1);
                }
            }
        }else{
            if(oOpt.checked){
                strVal= oOpt.value;
            }else{
                strVal=null;
                alert("please select one "+strChkItemName+"!");
            }
        }
    }
    //alert(strVal);
    return strVal;
}


function getSelectedRadio(oOpt) {
    if (oOpt) {
        if (oOpt.length) {
            var intSelectedNum = 0;
            for (i = 0; i < oOpt.length; i++) {
                if (oOpt[i].checked) {
                    return oOpt[i];
                }
            }
        } else {
            return oOpt;
        }
    }
}

//show hide node tree
function showHideSunNode(strAppId, strParentNodeId) {
    var arrNodes = document.getElementsByName("appfunc" + strAppId);//get app's all node
    if (arrNodes) {
        if (arrNodes.length > 0) {//if node number >0，then find this node's next node
            for (i = 0; i < arrNodes.length; i++) {
                var strTempParentId = arrNodes[i].getAttribute("parentid");
                if (strTempParentId != "0" && strTempParentId == strParentNodeId) {//if isn't root node and super node is strParentNodeId then show or hide
                    if (arrNodes[i].style.display == "block") {
                        arrNodes[i].style.display = "none";
                    } else {
                        arrNodes[i].style.display = "block";
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



function PageOnLoad() {
    if (document.location != top.location) {
        top.location = document.location;
    }
    //
}

//列表中去全选执行函数
function checkall(checbox) {
    

    if (checbox.checked == true) {
       
        var checkItem = document.getElementsByTagName("input");
        
        for (i = 0; i < checkItem.length; i++) {
            if (checkItem[i].type.toLowerCase() == "checkbox" && checkItem[i].id.indexOf('Pager_ItemCheck')>=0) {
                checkItem[i].checked = true;
            }
        }
    }
    else {
        var checkItem = document.getElementsByTagName("input");
        for (i = 0; i < checkItem.length; i++) {
            if (checkItem[i].type.toLowerCase() == "checkbox" && checkItem[i].id.indexOf('Pager_ItemCheck') >= 0) {
                checkItem[i].checked = false;
            }
        }
    }
}

//列表中去全选执行函数
function checkalls(checbox) {


    if (checbox.checked == true) {

        var checkItem = document.getElementsByTagName("input");

        for (i = 0; i < checkItem.length; i++) {
            if (checkItem[i].type.toLowerCase() == "checkbox" && checkItem[i].id.indexOf('ItemCheck') >= 0) {
                checkItem[i].checked = true;
            }
        }
    }
    else {
        var checkItem = document.getElementsByTagName("input");
        for (i = 0; i < checkItem.length; i++) {
            if (checkItem[i].type.toLowerCase() == "checkbox" && checkItem[i].id.indexOf('ItemCheck') >= 0) {
                checkItem[i].checked = false;
            }
        }
    }
}


// 主背景色（大区域）
// 通常使用明快的颜色（浅黄色等...）
if (typeof fcolor == 'undefined') { var fcolor = "ffffff"; }

// Border的颜色和标题栏的颜色；
// 通常的颜色深（褐色，黑色等。）
if (typeof backcolor == 'undefined') { var backcolor = "cccccc"; }


// 文字的颜色
// 通常是比较深的颜色；
if (typeof textcolor == 'undefined') { var textcolor = "#666666"; }

// 标题的颜色
// 通常是明快的颜色；
if (typeof capcolor == 'undefined') { var capcolor = "#FFFFFF"; }

// "Close"的颜色
// 通常是明快的颜色；
if (typeof closecolor == 'undefined') { var closecolor = "#9999FF"; }


// 弹出的窗口的宽度；
// 100-300 pixels 合适
if (typeof width == 'undefined') { var width = "140"; }

// 边缘的宽度，象素。
// 1-3 pixels 合适
if (typeof border == 'undefined') { var border = "1"; }


// 弹出窗口位于鼠标左侧或者右侧的距离，象素。
// 3-12合适
if (typeof offsetx == 'undefined') { var offsetx = 10; }

// 弹出窗口位于鼠标下方的距离；
// 3-12 合适
if (typeof offsety == 'undefined') { var offsety = 20; }

////////////////////////////////////////////////////////////////////////////////////
// 设置结束
////////////////////////////////////////////////////////////////////////////////////

ns4 = (document.layers) ? true : false
ie4 = (document.all) ? true : false

// Microsoft Stupidity Check.
if (ie4) {
    if (navigator.userAgent.indexOf('MSIE 5') > 0) {
        ie5 = true;
    } else {
        ie5 = false;
    }
} else {
    ie5 = false;
}

var x = 0;
var y = 0;
var snow = 0;
var sw = 0;
var cnt = 0;
var dir = 1;
var tr = 1;
var over;
if ((ns4) || (ie4)) {
    if (ns4) over = document.overDiv
    document.onmousemove = mouseMove
    if (ns4) document.captureEvents(Event.MOUSEMOVE)
}
// 以下是页面中使用的公共函数；

// Simple popup right
function showSimpleLib(text, width) {
    showLib(1, text, width);
}


// Clears popups if appropriate
function hideLib() {
    over = document.getElementById("abc").style;
    if (cnt >= 1) { sw = 0 };
    if ((ns4) || (ie4)) {
        if (sw == 0) {
            snow = 0;
            hideObject(over);
        } else {
            cnt++;
        }
    }
}

// 非公共函数，被其它的函数调用；

// Simple popup
function showLib(d, text, width) {
    over = document.getElementById("abc").style;
    txt = "<TABLE WIDTH=" + width + " BORDER=0 CELLPADDING=" + border + " CELLSPACING=0 BGCOLOR=\"" + backcolor + "\"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 BGCOLOR=\"" + fcolor + "\"><TR><TD CLASS=P1><FONT FACE=\"宋体\" COLOR=\"" + textcolor + "\">" + text + "</FONT></TD></TR></TABLE></TD></TR></TABLE>"
    layerWrite(txt);
    dir = d;
    disp();
}



// Common calls
function disp() {
    if ((ns4) || (ie4)) {
        if (snow == 0) {
            if (dir == 2) { // Center
                moveTo(over, x + offsetx - (width / 2), y + offsety);
            }
            if (dir == 1) { // Right
                moveTo(over, x + offsetx, y + offsety);
            }
            if (dir == 0) { // Left
                moveTo(over, x - offsetx - width, y + offsety);
            }
            showObject(over);
            snow = 1;
        }
    }
    // Here you can make the text goto the statusbar.
}
function mouseCoords(ev) 
{ 
if(ev.pageX || ev.pageY){ 
return {x:ev.pageX, y:ev.pageY}; 
} 
return { 
x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
y:ev.clientY + document.body.scrollTop - document.body.clientTop 
}; 
} 
// Moves the layer
function mouseMove(e) {
    ev = e || window.event;
    var mousePos = mouseCoords(ev);
    x = mousePos.x;
    y = mousePos.y;
    //if (ns4) { x = e.pageX; y = Math.abs(e.pageY); }
    //if (ie4) { x = event.x; y = Math.abs(event.y); }
    //if (ie5) { x = event.x + document.body.scrollLeft; y = Math.abs(event.y) + document.body.scrollTop; }
    //else
    //{ x = event.x + document.body.scrollLeft; y = Math.abs(event.y) + document.body.scrollTop; }
    if (snow) {
        if (dir == 2) { // Center
            moveTo(over, x + offsetx - (width / 2), y + offsety);
        }
        if (dir == 1) { // Right
            moveTo(over, x + offsetx, y + offsety);
        }
        if (dir == 0) { // Left
            moveTo(over, x - offsetx - width, y + offsety);
        }
    }
}

// The Close onMouseOver function for Sticky
function cClick() {
    hideObject(over);
    sw = 0;
}

// Writes to a layer
function layerWrite(txt) {
    if (ns4) {
        var lyr = document.abc.document
        lyr.write(txt)
        lyr.close()
    }
    else if (ie4) document.all["abc"].innerHTML = txt
    if (tr) { }
}

// Make an object visible
function showObject(obj) {
    if (ns4) obj.visibility = "show"
    else if (ie4) obj.visibility = "visible"
}

// Hides an object
function hideObject(obj) {
    if (ns4) obj.visibility = "hide"
    else if (ie4) obj.visibility = "hidden"
}

// Move a layer
function moveTo(obj, xL, yL) {

    if(obj)obj.left = xL;
    if(obj)obj.top = yL;
}



