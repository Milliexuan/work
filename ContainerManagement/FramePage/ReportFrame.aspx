<%@ Page Language="C#" ValidateRequest="false" AutoEventWireup="true" CodeBehind="ReportFrame.aspx.cs" Inherits="Zj.WebFrame.PC.Web.Votes.ReportFrame" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>ReportFrame</title>
    <script type="text/javascript" src="../Content/js/jquery-1.9.1.min.js"></script>
    <script language="javascript"  type="text/javascript">
        function bodyresize() {
            var o_r = document.getElementById("content1");
            o_r.style.width = (document.body.clientWidth).toString() + "px";
            o_r.style.height = (document.documentElement.clientHeight).toString() + "px";
        }
</script>
</head>
    <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0"scroll="no" style="overflow:hidden" onload="bodyresize();" onresize="bodyresize();">
    <form id="form1" runat="server">
        <asp:label id="ErrorMessage" Visible="false" runat="server" ForeColor="Red" Font-Size="9pt"></asp:label>
                
                 <asp:ScriptManager  OnAsyncPostBackError="scriptManager_AsyncPostBackError" AsyncPostBackTimeout="900" ID="scriptManager" runat="server">
              <Scripts>
                  <asp:ScriptReference Path="~/Content/js/reports.js" />
              </Scripts>
          </asp:ScriptManager>
    <div id="content1">

        <rsweb:ReportViewer Height="100%" ID="ReportViewer1" runat="server" Width="100%"></rsweb:ReportViewer>
    </div>
    </form>
</body>
</html>
