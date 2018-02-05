
//报表加载数据出错提示
Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);

function EndRequestHandler(sender, args) {
    var b = args.get_error();
    if (b != null) {
        alert(args.get_error().message);
        return false;
    }

}

//确定查询按钮 OnClientClick 调用函数
//杜绝查询按钮重复提交
//默认控制ReportViewer的ID为 ReportViewer1
//默认查询按钮 的ID 为queryBtn
function rezoom() {
    var viewer = $find("ReportViewer1");
    //alert(viewer);
    if (viewer != null && viewer.get_isLoading()) {
        alert("正在加载数据，请不要重复提交！");
        return false;
    }
    else {
        document.getElementById("queryBtn").style.display = "none";
        //$("#queryBtn").attr("disabled", "false");
        return true;
    }
}
//确定查询按钮 OnClientClick 调用函数
//杜绝查询按钮重复提交
//参数reportViewer:reportViewer控件的ID，如果这个按钮控制的reportView为多个，请使用|来分隔
//参数btn：查询按钮对象
//例如  <asp:Button ID="queryBtn"  OnClientClick="return rezooms('ReportViewer1|aaaa',this);"   runat="server"  Text="点击查询" OnClick="queryBtn_Click"/>
function rezooms(reportViewer, btn) {
    var reportViewers;
    var flag = false;
    if (reportViewer.indexOf('|') > 0) {
        reportViewers = reportViewer.split("|");
        for (i = 0; i < reportViewers.length; i++) {
            var viewer = $find(reportViewers[i]);
            if (viewer != null && viewer.get_isLoading()) {
                alert("正在加载数据，请不要重复提交！");
                return false;
            }
        }
    }
    else {
        var viewer = $find(reportViewer);

        if (viewer != null && viewer.get_isLoading()) {
            alert("正在加载数据，请不要重复提交！");
            return false;
        }
    }
    btn.style.display = "none";
    document.getElementById("waitLabel").innerHTML = "准备中...";
    document.getElementById("ErrorMessage").innerHTML = "";
    //$("#queryBtn").attr("disabled", "false");
    return true;
}
