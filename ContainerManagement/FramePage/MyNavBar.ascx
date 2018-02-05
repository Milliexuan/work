<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MyNavBar.ascx.cs" Inherits="Zj.WebFrame.PC.Web.Votes.MyNavBar" %>
<table border="0" cellspacing="0" cellpadding="0">
	<tr>
		<!--<td width="50" align="center"><img src="/Content/images/PersonalNavIcon1.gif" width="24" height="24"></td>
		<td width="11" rowspan="2" align="center"><img src="/Content/images/TopToolSplit.gif" width="11" height="25" /></td>
		<td width="50" align="center"><img src="/Content/images/PersonalNavIcon2.gif" width="24" height="24"></td>
		<td width="11" rowspan="2" align="center"><img src="/Content/images/TopToolSplit.gif" width="11" height="25" /></td>-->
		<td width="50" align="center"><img src="../Content/images/TopToolIcon3.gif" width="24" height="25" /></td>
		<td width="11" rowspan="2" align="center"><img src="../Content/images/TopToolSplit.gif" width="11" height="25" /></td>
		<td width="50" align="center"><img src="../Content/images/TopToolIcon2.gif" width="24" height="25" /></td>
	</tr>
	<tr><!--<td><asp:HyperLink ID="goTypeSet" runat="server" CssClass="TopToolFont">版式定制</asp:HyperLink></td><td><asp:HyperLink ID="goPortalStyle" runat="server" CssClass="TopToolFont">风格定制</asp:HyperLink></td>-->
	  <td align="center"><a href="./gogateway.aspx" class="TopToolFont">重新登录</a></td>
	  <td align="center"><a OnClick="return confirm('确定退出？');" href="./DelegateLogout.aspx" class="TopToolFont">登出系统</a></td>
	</tr>
</table>