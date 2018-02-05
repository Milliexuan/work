<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ErrorPage.aspx.cs" Inherits="Zj.WebFrame.PC.Web.Votes.ErrorPage" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>ErrorPage</title>
    <link href="/Content/css/littleyellow.css" rel="stylesheet" type="text/css">
</head>
<body>
    <form id="form1" runat="server">
    <div style="text-align:center">
       <asp:Label id="ErrorMessage" runat="server" ForeColor="Red" Font-Size="12pt"></asp:Label>
       <asp:Button ID="btn" Text="详细信息" runat ="server" OnClick="btn_Click" />
        <br />
        <asp:Label id="Label1" runat="server" ForeColor="Red" Font-Size="12pt"></asp:Label>
    </div>
    </form>
</body>
</html>