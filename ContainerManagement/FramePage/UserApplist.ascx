<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="userapplist.ascx.cs" Inherits="Zj.WebFrame.PC.Web.Votes.userapplist" %>
<link href="/Content/css/bar.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="../Content/js/showbars.js">
    
</script>
<ul id="sddm">
	<li><a href="#" id="am1" onmouseover="mopen('m1',this)" onmouseout="mclosetime(am1)">我的应用</a>
		<div id="m1" onmouseover="mcancelclosetime()" onmouseout="mclosetime('am1')">
            <%=appLists %>
		</div>
	</li>
	<li><a href="#" id="am2" onmouseover="mopen('m2',this)" onmouseout="mclosetime('am2')">我的信息</a>
		<div id="m2" onmouseover="mcancelclosetime()" onmouseout="mclosetime('am2')">
		</div>
	</li>
	<li><a href="#" id="am3" onmouseover="mopen('m3',this)" onmouseout="mclosetime('am3')">我的任务</a>
		<div id="m3" onmouseover="mcancelclosetime()" onmouseout="mclosetime('am3')">
		
		</div>
	</li>
	<li><a href="#" id="am4" onmouseover="mopen('m4',this)" onmouseout="mclosetime('am4')">我的数据</a>
		<div id="m4" onmouseover="mcancelclosetime()" onmouseout="mclosetime('am4')">
		
		</div>
	</li>
	<li><a href="#" id="am5" onmouseover="mopen('m5',this)" onmouseout="mclosetime('am5')">个人中心</a>
		<div id="m5" onmouseover="mcancelclosetime()" onmouseout="mclosetime('am5')">
		
		</div>
	</li>
</ul>