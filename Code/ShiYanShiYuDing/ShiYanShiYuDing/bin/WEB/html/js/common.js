var apiUrl = "http://localhost:51369/api/";
var ShiYanShiS = [];
var BuKeYongShiJianS = [];
var ZuoWeiS = [];
var YuYueS;
var loginuser;
var xingqi = new Array("星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日");
$(function () {

    if (!sessionStorage.getItem('user')) {
        window.location.href = './login.html';
    } else {
        loginuser = JSON.parse(sessionStorage.getItem('user'));
        $("#userName").text(loginuser.name);
    }


    $("#manager").html('');
    $("#manager").append('<li><a href="jiaoshi-manager.html">实验室管理</a></li>');
    $("#manager").append('<li><a href="zuowei-manager.html">实验室座位管理</a></li>');
    $("#manager").append('<li><a href="jiaoshi-set.html">实验室不可用时间设定</a></li>');
    $("#manager").append('<li><a href="report.html">报表</a></li>');

    $("#logout").click(function () {
        sessionStorage.clear();
        window.location.href = './login.html';
    });
});

//实验室管理
function getShiYanShis() {
    $("#shiyanshiList tbody").html('');
    $.ajax({
        type: "get",
        url: apiUrl + 'M_ShiYanShi',
        dataType: "json",
        success: function (response) {
            if (response) {
                ShiYanShiS = response;
                //实验室管理
                if ($("#shiyanshiList tbody").length > 0) {
                    response.forEach(function (sys) {
                        $("#shiyanshiList tbody").append('<tr><td>' + sys.mingzi + '</td>' +
                            '<td> <a href="#" data-id="' + sys.zidongbianhao + '" data-toggle="modal" data-target="#myModal">修改</a> | <a href="javascript:ShanChuan(' + sys.zidongbianhao + ')" >删除</a></td></tr>');
                    }, this);
                }
                //左列表
                if ($(".m-s-menu ul").length > 0) {
                    $(".m-s-menu ul").html('<li class="learn"><span class="fa fa-th-list"></span> 实验室列表</li>');
                    var urlSysId = getUrlParamater('sysid');
                    response.forEach(function (sys) {
                        var spanHtml = '';
                        var html = '';
                        if (urlSysId && urlSysId == sys.zidongbianhao) {
                            html = ' <li class="crt"><a href="preview.html?sysid=' + sys.zidongbianhao + '"><span class="glyphicon glyphicon-play"></span>' + sys.mingzi + '</a></li>';
                        } else {
                            html = ' <li><a href="preview.html?sysid=' + sys.zidongbianhao + '">' + sys.mingzi + '</a></li>';

                        }
                        $(".m-s-menu ul").append(html);
                    }, this);

                }

                if ($("#shiyanshiSelect").length > 0) {
                    $("#shiyanshiSelect").html('');
                    response.forEach(function (sys) {
                        $("#shiyanshiSelect").append('<option value="' + sys.zidongbianhao + '">' + sys.mingzi + '</option>')
                    }, this);
                }


            }
        }
    });
}
function deleteShiYanShi(id) {
    if (id) {
        $.ajax({
            type: "delete",
            url: apiUrl + 'M_ShiYanShi/' + id,
            success: function (response) {
                getShiYanShis();
            }
        });
    }
}

//座位管理
function getZuoWeiByShiyanshi(shiyanshihao) {
    if (shiyanshihao) {
        $('#zuoweiTable').html('');
        $.ajax({
            type: "get",
            url: apiUrl + 'M_ZuoWei?shiyanshihao=' + shiyanshihao,
            dataType: "json",
            success: function (response) {
                ZuoWeiS = response
                if (response) {
                    console.log(response);
                    response.forEach(function (z) {
                        $('#zuoweiTable').append(' <tr><td>' + z.zidongbianhao + '</td><td>' + z.zuoweimingcheng + '</td><td>' + z.zhuohao + '</td><td><a href="javascript:ShanChuan(' + z.zidongbianhao + ')" >删除</a></td></tr>')
                    }, this);
                }
            }
        });
    }
}
function deleteZuoWei(id) {
    if (id) {
        $.ajax({
            type: "delete",
            url: apiUrl + 'M_ZuoWei/' + id,
            success: function (response) {
                getZuoWei();
            }
        });
    }
}


//不可用时间设定
function getBuKeYongShiJianByShiYanShi(shiyanshihao) {
    if (shiyanshihao) {
        $('#bukeyongTable').html('');
        $.ajax({
            type: "get",
            url: apiUrl + 'T_ShiYanShiBuKeYongShiJian?shiyanshihao=' + shiyanshihao,
            dataType: "json",
            success: function (response) {
                if (response) {
                    BuKeYongShiJianS = response;
                    response.forEach(function (b) {
                        $('#bukeyongTable').append(' <tr>' +
                            '<td>' + b.zidongbianhao + '</td>' +
                            '<td>' + xingqi[b.zhouji - 1] + '</td>' +
                            '<td>' + b.kaishiriqi + '</td>' +
                            '<td>' + b.jieshuriqi + '</td>' +
                            '<td><a href="＃" data-toggle="modal" data-target="#myModal" data-id="' + b.zidongbianhao + '">修改</a>｜<a href="javascript:shanchu(' + b.zidongbianhao + ')">删除</a></td></tr>');
                    }, this);
                }
            },
            error: function (err) {
                console.log("err:", err);
            }

        });
    }
}
function deleteBukeYongShiJian(id) {
    if (id) {
        $.ajax({
            type: "delete",
            url: apiUrl + 'T_ShiYanShiBuKeYongShiJian/' + id,
            success: function (response) {
                getBuKeYongShiJian();
            }
        });
    }
}


function getYuYue(user, shiyanshihao) {
    if (user && shiyanshihao) {
        YuYueS = null;
        $.ajax({
            type: "get",
            url: apiUrl + 'T_YuYue?shiyanshihao=' + shiyanshihao + '&user=' + user,
            dataType: "json",
            success: function (response) {
                if (response) {
                    YuYueS = response;
                }
            },
            error: function (err) {
                console.log("err:", err);
            }

        });
    }
}





/////通用
function refreshPage() {
    window.location.href = window.location.href;
}
function getUrlParamater(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}