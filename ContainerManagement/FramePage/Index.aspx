 <%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="Zj.WebFrame.PC.Web.Votes.index" %>
<%@ Import Namespace="Zj.AppFrame.Web.Control" %>
<%@ Import Namespace="Zj.AppFrame.Web.Service.Structs" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title><%=Application["_APPNAME"] %></title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1"/>
		<meta name="CODE_LANGUAGE" Content="C#"/>
		<meta name="vs_defaultClientScript" content="JavaScript"/>
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5"/>
    
 <script type="text/javascript" src="../Content/js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../Content/js/function.js"></script>
<link rel="stylesheet" type="text/css" href="../Content/css/newBar.css" />
 <script type="text/javascript" src="../Content/js/newBar.js"></script>


    <link href=<%=GetCssPath() %> rel="stylesheet" type="text/css"/>

    <script type="text/javascript">
        //IE9以上或者非IE 流浪器返回ture,否则返回false
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
        sessionStorage.setItem("menu",'<%=menuList %>');
        var webV = '<%=webV%>';
        var funcId = "<%=FUNC_ID%>";
        var funcType = "<%=FUNC_TYPE%>";
        var urlPara = "<%=URl_PARA%>";
        if (funcId != null && funcId != "")
        {
            urlPara+="&zjffuncid="+funcId+"&zjffunctype="+funcType;
        }
        switch (webV) {
            case 'H3':
                break;
            case 'H5':
                if (isUpIE()) window.location = "./MaterialIndex.html" + urlPara;
                else window.location = "./LoginError.html";
                break;
            case 'H4':
                window.location = "./BootstrapIndex.html" + urlPara;
            case 'H5-H4':
                if (isUpIE()) window.location = "./MaterialIndex.html" + urlPara;
                else window.location = "./BootstrapIndex.html" + urlPara;
                break;
            case 'H5-H3':
                if (isUpIE()) window.location = "./MaterialIndex.html" + urlPara;
                break;
            case 'H4-H3':
                if (isUpIE()) window.location = "./BootstrapIndex.html" + urlPara;
                break;
        }
        function gogateway() {
            window.location = './gogateway.aspx';
        }
        function PageOnLoad() {
            if (document.location != top.location) {
                top.location = document.location;
            }
            SetMenuSit();
        }

        var IDArray = new Array();
        var NAMEArray = new Array();
        var URLArray = new Array();
        var TYPEArray = new Array();
        var UPIDArray = new Array();
        var count = 0;
             <%
    IEnumerator IEappTreesh = ALL_MENU_TREE.GetEnumerator();
    int n = 0;
    while (IEappTreesh.MoveNext())
        
    {
        SAppTree apptree = (SAppTree)IEappTreesh.Current;
        n++;
        %>

        IDArray[count] = '<%=apptree.id%>';
        NAMEArray[count] = '<%=apptree.name%>';
        URLArray[count] = '<%=apptree.url%>';
        TYPEArray[count] = '<%=apptree.type%>';
        UPIDArray[count] = '<%=apptree.upId%>';
        count=count+1;
        <%
        //if (n > 20) break;
    }%>
        //alert(count);
	</script>

       
</head>
<body leftmargin="0" topmargin="0"marginwidth="0"  onresize="PageOnLoad();" style=" overflow:hidden;" marginheight="0" onLoad="PageOnLoad()">
    
		<form id="Form1" method="post" runat="server" >
            
		  <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" >
		    <tr>
              <td height="20">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr><td width="10"></td><td></td><td runat="server" id="UserInfo" align="left"></td><td width="10"></td>
                                                   <td align="left">
                             <%=menuList %>

                                       </td><td align="right">v3.3</td>
                      </tr>
                   </table>
                  </td>
            </tr>
            <tr id="TopRow1" >
              <td height="45">
                <table cellpadding="0" width="100%" cellspacing="0">
                <tr>
                <td width="168" height="45" valign="bottom" class="ImgLogo"></td>
                <td valign="bottom" style="font-family:楷体; font-weight:bold; font-size:28px;">
                       <%=Application["_APPNAME"] %></td>
                <td align="right" id="MyNavBar" runat="server"></td>
                </tr></table>
              </td>
            </tr>
			<tr><td height="2" valign="middle" align="center">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" class="NavBtnFace"><tr><td height="1" > </td></tr></table></td></tr>
            <tr>
              <td height="28" bgcolor="#f5f5f5">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="18" id="lsd" height="27">&nbsp;</td>
                    <td valign="bottom" id="NavBar" runat="server">
                        <!--横向菜单开始-->
                        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td><table border="0" cellspacing="1" cellpadding="0">
  <tr>

    <td width="7"><img src="../Content/images/PersonalNavSplitDot.gif" width="7" height="24"></td>
   <%
       IEnumerator IEappTrees = PLATE_MENU_TREE.GetEnumerator();
       while (IEappTrees.MoveNext())
      {
          SAppTree appTree = (SAppTree)IEappTrees.Current;
        %>
   <td>
          <table width="100%" border="0" cellpadding="1" cellspacing="0" >
            <tr>
                <td  height="15" align="center" nowrap="nowrap"  valign="bottom"  style="padding-left:5px;padding-right:5px;word-wrap:normal">
                    <%if(appTree.url.Equals('N'))
                      { %>
                    <a  style="cursor:hand;" onclick="createMenuTree('<%=appTree.id %>','<%=appTree.name %>')" class="TopToolFont">
                        <%=appTree.name %>
                    </a>
                    <%} else{ %>
                    <a   style="cursor:hand;" class="AppLeaveNode" onclick="switchUserAppFunc('<%=appTree.id %>','<%=appTree.type %>','<%=appTree.name %>');window.scroll(0,0);">
                         <%=appTree.name %>
                    </a>
                    <%} %>
                </td>
            </tr>
        </table>
    </td>
    <td width="7"><img src="../Content/images/PersonalNavSplitDot.gif" width="7" height="24"></td>
      <%} %>

  </tr>
</table></td><td width="23" align="center" style="display:none" onmouseover="showLib(2,'隐藏/显示 框架上部内容',68)" onmouseout="hideLib()"><img  id="Img1" Height="20" Width="21" src="../Content/images/UpArrow.gif" border="0" onclick="showHidePane(this,'UP')" style="cursor:hand"></td></tr></table>
<!---横向菜单结束--->
                    </td>
                    <td width="23" align="center"  ><img  id="btnUpArrow" Height="20" Width="21" src="../Content/images/UpArrow.gif" border="0" onClick="showHidePane(this,'UP')" style="cursor:hand"></td>
                  </tr>
              </table></td>
            </tr>
            <tr>
              <td height="10" class="ImgNavSplitDot"></td>
            </tr>
            <!--<tr id="TopRow3" style="DISPLAY:none">
              <td height="0"></td>
            </tr>-->
            <tr>
              <td valign="top" runat="server" id="MainBody">
<table height="100%" cellSpacing="0" style="position:relative;height:100%" cellPadding="0" width="100%" border="0">
	<tr>
		<td width="3px"> </td>
		<td>
			<table id="PaneFrame" height="100%" width="100%" cellSpacing="0" cellPadding="0" border="0">
				<tr>
					<td class="ImgBanBg" id="LeftPane" width="210" vAlign="top"  style="display:none;">
                       <!-- 左边菜单开始-->
       <script type="text/javascript">
           /*
           *根据模块ID将该模块下的菜单展开或折叠
           @moduleid  模块ID
           */
           function showHideMenu(moduleid) {
               //获取菜单容器
               var oMenuContainer = document.all.MenuContainer;
               //循环容器中的所有菜单
               if (oMenuContainer.rows) {
                   for (i = 0; i < oMenuContainer.rows.length; i++) {
                       //如果是该模块
                       if (oMenuContainer.rows[i].getAttribute("moduleid") == moduleid) {
                           //将该模块下的功能折叠
                           
                           if (oMenuContainer.rows[i].getAttribute("type") == "menuitem") {
                               if (oMenuContainer.rows[i].style.display == "none") {
                                   oMenuContainer.rows[i].style.display = "";
                               } else {
                                   oMenuContainer.rows[i].style.display = "none";
                               }
                           }
                           SetMenuSit();
                       }
                   }
               }
           }

           function showHideAppMenu(strAppId) {
               var oMenuContainer = eval("document.all.appmenu" + strAppId);
               if (oMenuContainer) {
                   if (oMenuContainer.style.display == "") {
                       oMenuContainer.style.display = "none";
                   } else {
                       oMenuContainer.style.display = "";
                   }
                   SetMenuSit();
               }
           }

		</script>
        <table id="leftOne" width="100%" style="position:absolute;height:100%;width:210;" border="0" cellspacing="5" cellpadding="0" height="100%">
		<tr style="display:block;">
			<td height="21">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td width="21" height="21" class="ImgBanTop1"> </td>
							<td class="ImgBanTop2" id="plateTitle"></td>
							<td width="92" align="right" class="ImgBanTop3">
								
							</td>
						</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td valign="top" height="100%" bgcolor="#ffffff" id='FuncPane'>
				<table width="100%" border="0" cellspacing="0" cellpadding="0" height="100%">
					<tr>
						<td valign="top" class="BanBgColor" height="100%" id="menuTree" style="PADDING-RIGHT:3px; PADDING-LEFT:3px; PADDING-BOTTOM:3px; PADDING-TOP:3px;">
						</td>
					</tr>
					<tr>
						<td height="5" class="BanBgColor">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td width="5" height="5" class="ImgBanBottom1">	</td>
									<td> </td>
									<td width="5" height="5" class="ImgBanBottom2">	</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
</table>
        
                        <!--左边菜单结束-->
                     
					</td>
					<td id="LeftArrow" runat="server"  onmouseover="showLib(1,'隐藏/显示 左边内容',68)" onmouseout="hideLib()" vAlign="middle"	width="4" onclick="showHidePane(document.all.imgLeftFrameArraw,'LEFT')" style="cursor:hand;display:none;">
                    <img id="imgLeftFrameArraw" Height="6" Width="4" src="../Content/images/LeftArrow.gif" border="0" /></td>
					<td class="ImgBanBg" id="MidPane"  vAlign="top"  runat="server" ></td>
					<td id="RightArrow"  onmouseover="showLib(2,'隐藏/显示 右边内容',68)" onmouseout="hideLib()"	vAlign="middle" width="4"  runat="server" Visible="false" onclick="showHidePane(document.all.imgRightFrameArraw,'RIGHT')"  style="cursor:hand">
                    <img id="imgRightFrameArraw" Height="6" Width="4" src="../Content/images/RightArrow.gif" border="0" /></td>
					<td class="ImgBanBg" id="RightPane"  vAlign="top" width="210"  runat="server" Visible="false"></td>
				</tr>
			</table>
		</td>
		<td width="3"> </td>
	</tr>
</table>
              </td>
            </tr>

			<tr><td height="6" valign="middle" align="center"><table width="99%" cellpadding="0" cellspacing="0" border="0" class="NavBtnFace"><tr><td height="2" > </td></tr></table></td></tr>
          </table>
		</form>
        
	</body>
</html>
