var _ZJCM_DATA = {};
var _ZJCM_BLOCK_INDEXT = -1;
var _ZJCM_TEMPLATE_ID = -1;
layui.use(['basejq', 'form'], function () {
    var $ = layui.jquery, bj = layui.basejq("e"), layer = layui.layer, form = layui.form;
    var _pageId = bj.getUrlParam("zjcmpageid");
    //打开显示内容页Iframe窗口
    window.f_zjcm_openPage = function (blockIndex, funcId) {
        //if (!bj.isDefine(pageUrl)) pageUrl = './build.html';
        layer.open({
            type: 2,
            title: _ZJCM_DATA.d_blockList[blockIndex].list[funcId].funcName,
            shadeClose: true,
            shade: 0.8,
            area: ['100%', '100%'],
            content: _ZJCM_DATA.d_blockList[blockIndex].list[funcId].funcUrl,
            end: function () { }
        });
    };

    window.f_zjcm_blockPage = function (blockIndex, templateId, pageUrl) {
        //var name = encodeURIComponent("很多测试");
        if (!bj.isDefine(pageUrl)) pageUrl = './BlockList.html';
        //pageUrl = encodeURI(pageUrl);
        if (bj.isDefine(templateId) && templateId > 0) _ZJCM_TEMPLATE_ID = templateId;
        else _ZJCM_TEMPLATE_ID = _ZJCM_DATA.d_blockList[blockIndex].templetId;
        _ZJCM_BLOCK_INDEXT = blockIndex;
        //console.log(_ZJCM_DATA.d_blockList[blockId].list[funcId].funcUrl);
        layer.open({
            type: 2,
            title: _ZJCM_DATA.d_blockList[blockIndex].blockTitle,
            shadeClose: true,
            shade: 0.8,
            area: ['100%', '100%'],
            content: pageUrl,
            end: function () { }
        });
    };

    //获取页面信息cm011
    _ZJCM_DATA.d_pageInfo = {};
    var f_getPageInfo = function () {
        bj.postSim("cm011", { pageId: _pageId }, function (data) {
            //console.log(data);
            if (data != null && data.length > 0) {
                _ZJCM_DATA.d_pageInfo = data[0];
                $("title").html(_ZJCM_DATA.d_pageInfo.title);
            }
            else layer.msg("查无页面数据");
        });
    }
    //获取模板信息cm??
    _ZJCM_DATA.d_templet = [];
    var f_getTemplateInfo = function () {
        bj.postSim("cm201", { pageId: _pageId }, function (data) {
            console.log('------------');
            console.log(data);
            console.log('------------');
            if (data != null && data.length > 0) {
                _ZJCM_DATA.d_templet = data;
                layui.each(data, function (n, d) {
                    var templateHtml = d.templetHtmlCssJs.replace(new RegExp('＜', 'g'), '<');
                    $("body").append(templateHtml);
                });
                //获取页面块信息
                f_getPageBlockList();
            }
            else layer.msg("查无模板");
        });
    }
    //获取页面块信息cm012
    _ZJCM_DATA.d_blockList = [];
    var _blockCount = 0;
    var f_getPageBlockList = function () {
        bj.postSim("cm012", { pageId: _pageId, }, function (data) {
            console.log(data);
            if (data != null && data.length > 0) {
                _ZJCM_DATA.d_blockList = data;
                _blockCount = _ZJCM_DATA.d_blockList.length;
                console.log(_blockCount);
                for (i = 0; i < _blockCount; i++) {
                    f_getFuncInfo(i);
                }

            }
            else layer.msg("查无页面板块");
        });
    }
    //创建页面位置填充数据
    var _aotu_blockCount = 0;
    var f_buildPosition = function (n) {
        var blockIndex = n + 1;
        var obj_blocks = $("*[id='zjcm_block" + blockIndex + "']");
        if (obj_blocks.length < 1) {//需要创建位置
            var rowIndex = parseInt(_aotu_blockCount / 2) + 1;
            if (_aotu_blockCount % 2 == 0) {
                //添加行
                $("#zjcm_content").append('<div class="layui-row" id="zjcm_row' + rowIndex + '"></div>');
            }
            //添加行里的块
            $("#zjcm_row" + rowIndex).append('<div class="layui-col-xs12 layui-col-xs6 layui-col-md6" id="zjcm_block' + blockIndex + '"></div>');
            _aotu_blockCount++;
        }
        //填充数据
        $("#zjcm_block" + blockIndex).html("");
        var blockHtml = eval('f_zjcm_template' + _ZJCM_DATA.d_blockList[n].templetId + '("' + n + '")');
        if (blockHtml != '') $("#zjcm_block" + blockIndex).html(blockHtml);
        //bj.showMsg(obj_blocks.length);
    }
    var f_buildBlock = function () {
        for (k = 0; k < _ZJCM_DATA.d_blockList.length; k++) {
            f_buildPosition(k);
        }
        form.render();
    };

    //获取功能点cm022
    var _flag = 0;
    var f_getFuncInfo = function (n) {
        bj.postSim("cm022", { pageNo: 1, pageSize: _ZJCM_DATA.d_blockList[n].funcCnt, blockId: _ZJCM_DATA.d_blockList[n].blockId }, function (data) {
            console.log(data);
            _flag++;
            if (data != null && data.length > 0) {
                _ZJCM_DATA.d_blockList[n].list = data;
            }
            else _ZJCM_DATA.d_blockList[n].list = [];
            console.log(_flag + "|" + _blockCount);
            if (_flag == _blockCount) f_buildBlock();
            //else layer.msg("查无");
        });
    }

    var test = function () {
        bj.postSim("cm999", { pageId: 1 }, function (data) {
            console.log(data);

        });
    }
    var f_init = function () {
        _aotu_blockCount = 0;
        //1.获取页面信息
        f_getPageInfo();
        //2.获取模板信息
        f_getTemplateInfo();
        //f_getPageBlockList();
    }
    //00执行主入口
    f_init();

});
function test(data) {
    console.log(prek);
    return 'aaaaa';
    //alert(data);
}