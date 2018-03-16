var apiUrl = "http://localhost:51369/api/";
var ShiYanShiS = [];
var BuKeYongShiJianS = [];
var ZuoWeiS = [];
var ZiYuans = [];
var YuYueS;
var loginuser;
var xingqi = new Array("星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日");
var isHomePage = false;
$(function() {
    isHomePage = window.location.href.indexOf('home.html') > 0;
    var title = '创新实践共享平台在线监控及评测平台';

    $("title").html(title)
    $(".hidden-folded").html(title)

    if (!sessionStorage.getItem("user")) {
        window.location.href = "/login.html";
    } else {
        loginuser = JSON.parse(sessionStorage.getItem("user"));
        $("#userName").text(loginuser.name);
    }
    $('a:contains(个人预约)').parent().hide();
    $('a:contains(教师预约)').parent().hide();
    //$(".dropdown span").css('font-size','15px');


    if (loginuser.id == "admin") {
        var mulu = [
            ['实验室管理', "jiaoshi-manager.html"],
            ['实验室座位管理', "zuowei-manager.html"],
            ['实验室不可用时间设定', "jiaoshi-set.html"],
            ['报表', "report.html"]
        ]
        $('span:contains("' + title + '")').parent().attr('href', '/html/' + mulu[0][1]);

        $("#navbar-collapse ul").html("");

        var classname = '<li class="crt"><span class="glyphicon glyphicon-play"></span>'
        mulu.forEach(function(m) {
            $("#navbar-collapse ul").append(' <li><a href="' + m[1] + '"><span>' + m[0] + '</span></a></li>');
        });
    } else {
        $("#manager").parent("li").hide();
        $('span:contains("' + title + '")').parent().attr('href', '/html/preview.html?sysid=1');
        if (loginuser.id.length == 8) {
            $('a:contains(教师预约)').parent().show();
        } else {
            $('a:contains(个人预约)').parent().show();
        }
    }
    $("header div:eq(0) a").prepend('<img src="img/logo.png" />');

    $("#logout").click(function() {
        sessionStorage.clear();
        window.location.href = "/login.html";
    });
});

//实验室管理
function getShiYanShis() {
    $.ajax({
        type: "get",
        url: apiUrl + "M_ShiYanShi",
        dataType: "json",
        success: function(response) {
            if (response) {
                ShiYanShiS = response;
                console.log(ShiYanShiS);
                if ($("#fangjianshu")) {
                    $("#fangjianshu").text(ShiYanShiS.length);
                }
                //实验室管理
                if ($("#shiyanshiList tbody").length > 0) {
                    $("#shiyanshiList tbody").html("");
                    response.forEach(function(sys, i) {
                        if (i == 0 || (response[i - 1] && response[i - 1].louceng != sys.louceng)) {
                            $("#shiyanshiList tbody").append('<tr style="border-bottom: solid 2px #00a65a;"><td colspan="2"><h4>' + sys.louceng + '楼</h4></td></tr>');
                        }
                        $("#shiyanshiList tbody").append(
                            "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;" +
                            (sys.tupian ? "<img src='" + sys.tupian + "' style='width:50px;'>" : '') +
                            sys.mingzi +
                            "</td>" +
                            '<td> <a href="javascript:void(0)" >远程开门</a> | ' +
                            '<a href="#" data-id="' + sys.zidongbianhao + '" data-toggle="modal" data-target="#myModal">修改</a> | ' +
                            '<a href="javascript:delConfrim(' + sys.zidongbianhao + ',deleteShiYanShi)" >删除</a></td></tr>'
                        );
                    }, this);
                }
                if ($("#sysList")) {
                    $("#sysList").html('');

                    var length = isHomePage ? 6 : ShiYanShiS.length
                        // ShiYanShiS.forEach(function(sys) {
                    for (var i = 0; i < length; i++) {
                        var sys = ShiYanShiS[i];
                        $("#sysList").append(
                            '<li class="booking-room col-sm-' + (isHomePage ? 4 : 3) + ' clearfix">' +
                            '    <a href="preview.html?sysid=' + sys.zidongbianhao + '" class="booking-room-icon has-img" title="">' +
                            '        <img src="' + sys.tupian + '" alt="">' +
                            '    </a>' +
                            '    <div class="booking-room-info">' +
                            '        <a href="preview.html?sysid=' + sys.zidongbianhao + '" class="booking-room-name text-center">' + sys.louceng + '楼' + sys.mingzi + '</a>' +
                            '        <p class="booking-room-size" title="' + sys.miaoshu + '">' + sys.miaoshu + '</p>' +
                            '        <small class=""><i class="fa fa-circle text-success"></i>开放预约中</small>' +
                            '    </div>' +
                            '</li>')
                    }
                }


                // //左列表

                // if ($(".m-s-menu ul").length > 0 && loginuser.id != "admin") {
                //     $(".m-s-menu ul").html('<li class="learn"><span class="fa fa-th-list"></span> 实验室列表</li>');
                //     var urlSysId = getUrlParamater("sysid");
                //     response.forEach(function(sys) {
                //         var spanHtml = "";
                //         var html = "";
                //         if (urlSysId && urlSysId == sys.zidongbianhao) {
                //             html = ' <li class="crt"><a href="preview.html?sysid=' + sys.zidongbianhao + '"><span class="glyphicon glyphicon-play"></span>' + sys.mingzi + "</a></li>";
                //         } else {
                //             html = ' <li><a href="preview.html?sysid=' + sys.zidongbianhao + '">' + sys.mingzi + "</a></li>";
                //         }
                //         $(".m-s-menu ul").append(html);
                //     }, this);
                // }

                if ($("#shiyanshiSelect").length > 0) {
                    $("#shiyanshiSelect").html("");
                    response.forEach(function(sys) {
                        $("#shiyanshiSelect").append(
                            '<option value="' +
                            sys.zidongbianhao +
                            '">' +
                            sys.mingzi +
                            "</option>"
                        );
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
            url: apiUrl + "M_ShiYanShi/" + id,
            success: function(response) {
                getShiYanShis();
            },
            error: function(e) {
                console.log(e)
            }
        });
    }
}

function getAllZuoWei() {
    $.ajax({
        type: "get",
        url: apiUrl + "M_ZuoWei",
        dataType: "json",
        success: function(response) {
            $("#zichang").text(response.length);
        }
    });
}
//座位管理
function getZuoWeiByShiyanshi(shiyanshihao) {
    if (shiyanshihao) {
        $("#zuoweiTable").html("");
        $.ajax({
            type: "get",
            url: apiUrl + "M_ZuoWei?shiyanshihao=" + shiyanshihao,
            dataType: "json",
            success: function(response) {
                ZuoWeiS = response;
                if (response) {
                    console.log(response);
                    response.forEach(function(z, i) {
                        // $("#zuoweiTable").append(' <tr><td><input type="checkbox"></input></td><td>' + z.zidongbianhao + "</td><td>" + z.zuoweimingcheng + "</td><td>" + z.zhuohao + '</td><td><a href="javascript:ShanChuan(' + z.zidongbianhao + ')" >删除</a></td></tr>');
                        $("#zuoweiTable").append(' <tr><td>' + (i + 1) + "</td><td>" + z.zuoweimingcheng + "</td><td>" + z.zhuohao + '</td><td><a href="javascript:ShanChuan(' + z.zidongbianhao + ')" >删除</a></td></tr>');
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
            url: apiUrl + "M_ZuoWei/" + id,
            success: function(response) {
                getZuoWei();
            }
        });
    }
}

//不可用时间设定
function getBuKeYongShiJianByShiYanShi(shiyanshihao) {
    if (shiyanshihao) {
        $("#bukeyongTable").html("");
        $.ajax({
            type: "get",
            url: apiUrl + "T_ShiYanShiBuKeYongShiJian?shiyanshihao=" + shiyanshihao,
            dataType: "json",
            success: function(response) {
                if (response) {
                    BuKeYongShiJianS = response;
                    response.forEach(function(b, i) {
                        $("#bukeyongTable").append(
                            " <tr>" + "<td>" + (i + 1) + "</td>" + "<td>" + xingqi[b.zhouji - 1] + "</td>" +
                            "<td>" + b.kaishiriqi + "</td>" + "<td>" + b.jieshuriqi + "</td>" +
                            "<td>" + b.kaishizhou + "</td>" + "<td>" + b.jieshuzhou + "</td>" +
                            '<td><a href="＃" data-toggle="modal" data-target="#myModal" data-id="' + b.zidongbianhao + '">修改</a>｜<a href="javascript:shanchu(' + b.zidongbianhao + ')">删除</a></td></tr>');
                    }, this);
                }
            },
            error: function(err) {
                console.log("err:", err);
            }
        });
    }
}

function deleteBukeYongShiJian(id) {
    if (id) {
        $.ajax({
            type: "delete",
            url: apiUrl + "T_ShiYanShiBuKeYongShiJian/" + id,
            success: function(response) {
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
            url: apiUrl + "T_YuYue?shiyanshihao=" + shiyanshihao + "&user=" + user,
            dataType: "json",
            success: function(response) {
                if (response) {
                    YuYueS = response;
                }
            },
            error: function(err) {
                console.log("err:", err);
            }
        });
    }
}

function getAllYuYue() {
    YuYueS = null;
    $.ajax({
        type: "get",
        url: apiUrl + "T_YuYue",
        dataType: "json",
        success: function(response) {
            if (response) {
                YuYueS = response;
                if ($("#huoyueshu")) {
                    var today = (new Date()).toLocaleDateString();
                    var tmp = YuYueS.filter(yy => (new Date(yy.kaishi)).toLocaleDateString() == today)
                    $("#huoyueshu").text((tmp ? tmp.length : 0));
                }
                if (isHomePage) {
                    $("#yuyueList").html('');
                    for (var i = 0; i < 10; i++) {
                        var yy = YuYueS[i];
                        $("#yuyueList").append('<li class="list-group-item book-list-item sharp ">' +
                            '<span class="book-list-title ">[' + yy.shiyanshiMing + ']</span> <br>' +
                            '<small class="book-list-start ">' + yy.kaishi + '</small> 至 ' +
                            '<small class="book-list-finish ">' + yy.jieshu + '</small> <br>' +
                            '<div class="clearfix "><span class="pull-right ">- <small class="book-list-user ">' + yy.xueshengxingming + '</small></span></div></li>');
                    }
                }
            }
        },
        error: function(err) {
            console.log("err:", err);
        }
    });
}

function getZiYuan() {
    ZiYuans = null;
    $('#ziyuanList').html('');
    $.ajax({
        type: "get",
        url: apiUrl + "T_ZiYuan",
        dataType: "json",
        success: function(response) {
            if (response) {
                ZiYuans = response;
                var length = isHomePage ? 6 : ZiYuans.length;
                if (isHomePage) {
                    for (var i = 0; i < 6; i++) {
                        var ziyuan = ZiYuans[i];
                        $("#ziyuanList").append('<li class="booking-item col-sm-4 col-xs-6 " style="margin-bottom: 10px;overflow: hidden; ">' +
                            '<a href="javascript: " class="booking-item-icon has-img " title=" ">' +
                            '<img src="' + ziyuan.url + '" alt=" "></a>' +
                            '</li>');
                    }
                } else {
                    for (var i = 0; i < ZiYuans.length; i++) {
                        var ziyuan = ZiYuans[i];
                        $("#ziyuanList").append('<li class="booking-room col-sm-3 clearfix">' +
                            (loginuser.id.length == 8 ? '<a href="javascript:delConfrim(' + ziyuan.zidongbianhao + ',deleteZiYuan)" class="glyphicon glyphicon-remove ziyuan_del"></a>' : '') +
                            '<a href="javascript:void(0)" class="booking-room-icon has-img" title=""><img src="' + ziyuan.url + '" alt=""></a>' +
                            '<div class="booking-room-info">' +
                            '<a href="javascript:" class="booking-room-name text-center">' +
                            '<span>' + ziyuan.biaoti + '</span></a>' +
                            '<p class="booking-room-size" title="' + ziyuan.shuoming + '">' + ziyuan.shuoming + ' </p>' +
                            '</div></li>');
                    }
                }

            }
        },
        error: function(err) {
            console.log("err:", err);
        }
    });
}

function deleteZiYuan(id) {
    if (id) {
        $.ajax({
            type: "delete",
            url: apiUrl + "T_ZiYuan/" + id,
            success: function(response) {
                getZiYuan();
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
    if (r != null) return unescape(r[2]);
    return null;
}

function randomString(len) {
    len = len || 32;
    var $chars =
        "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = "";
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function delConfrim(id, callfunc) {
    $.Zebra_Dialog('您确定要删除吗?', {
        type: 'question',
        title: '删除确认',
        buttons: ['确定', '取消'],
        onClose: function(caption) {
            if (caption == "确定") {
                callfunc(id);
            }
        }
    });
}