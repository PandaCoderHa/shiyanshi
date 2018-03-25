//var apiUrl = "http://10.203.82.224:8081/api/";
var apiUrl = "http://localhost:51369/api/";

//var xingqi = new Array("星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日");
var isHomePage = false;
var app;

var headerStr = ['<header id="header" class="app-header navbar" role="menu">'
    , '      <div class="navbar navbar-static-top">'
    , '          <div class="container">'
    , '              <div class="navbar-header bg-dark">'
    , '                  <button class="pull-right visible-xs dk" ui-toggle-class="show" target=".navbar-collapse">'
    , '                      <i class="glyphicon glyphicon-cog"></i>'
    , '                  </button>'
    , '                  <button class="pull-right visible-xs" ui-toggle-class="off-screen" target=".app-aside" ui-scroll="app">'
    , '                      <i class="glyphicon glyphicon-align-justify"></i>'
    , '                  </button>'
    , '                  <a href="home.html" class="navbar-brand text-lt">'
    , '                      <span class="hidden-folded m-l-xs">高校实验室预约系统</span>'
    , '                  </a>'
    , '              </div>    '
    , '              <div class="collapse navbar-collapse pull-left" id="navbar-collapse">    '
    , '                  <ul class="nav navbar-nav navbar-menu">'
    , '                      <li v-for="m in mulu">'
    , '                          <a v-bind:href=m[1]>'
    , '                              <span>{{m[0]}}</span>'
    , '                          </a>'
    , '                      </li>'
    , '                  </ul>'
    , '              </div>'
    , '              <div class="navbar-custom-menu hidden-xs">'
    , '                  <ul class="nav navbar-nav">'
    , '                      <li class="dropdown">'
    , '                          <a href="#" data-toggle="dropdown" class="dropdown-toggle" aria-expanded="false">'
    , '                              <i class="fa fa-fw fa-plus visible-xs-inline-block"></i>'
    , '                              <span translate="header.navbar.new.NEW">'
    , '                                  <img src="img/user.png" class="user-image" alt="User Image"> 个人中心</span>'
    , '                              <span class="caret"></span>'
    , '                          </a>'
    , '                          <ul class="dropdown-menu" role="menu">'
    , '                              <li>'
    , '                                  <a href="info-change.html">修改个人资料</a>'
    , '                              </li>'
    , '                              <li>'
    , '                                  <a v-on:click="logOut()" href="javascript:void(0)" ui-sref="access.signin">退出登录</a>'
    , '                              </li>'
    , '                          </ul>'
    , '                      </li>'
    , '                  </ul>'
    , '              </div>'
    , '          </div>'
    , '      </div>'
    , '  </header>'].join('');




$(function () {
    Vue.component('my-header', {
        template: headerStr,
        props: ['mulu']
    });

    app = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue!',
            mulu: [],
            ShiYanShiS: [],
            ShiYanShiTop6: [],
            selectedSYS: null,
            BuKeYongShiJianS: [],
            ZuoWeiS: [],
            ZiYuans: [],
            ZiYuansTop6: [],
            YuYueS: [],
            YuYueSTop10: [],
            loginuser: {},
            dangtianhuoyueshu: 0,
            zichangshu: 0,
            timeOptions: ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],
            xingqi : new Array("星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日")
        },
        computed: {
            YuYueSJilu: function () {
                var now = new Date();
                var tmpYuyue = [];
                var yyHtml = '';
                for (var i = 0; i < this.YuYueS.length; i++) {
                    var y = this.YuYueS[i];
                    if (i > 0) {
                        var preY = this.YuYueS[i - 1];
                        if (y.shiyanshihao == preY.shiyanshihao &&
                            y.kaishi == preY.kaishi &&
                            y.jieshu == preY.jieshu) {
                            continue;
                        }
                    }
                    var kaishi = new Date(y.kaishi);
                    var jieshu = new Date(y.jieshu);


                    y.kaishiStr = '开始：' + y.kaishi.substr(5, 11);
                    y.jieshuStr = '结束：' + y.jieshu.substr(5, 11);
                    if (kaishi > now) {
                        y.zhuangtai = '预约成功';
                    } else {
                        if (jieshu < now) {
                            y.zhuangtai = '已结束';
                        } else {
                            y.zhuangtai = '已生效';
                        }
                    }
                    tmpYuyue.push(y);
                }
                return tmpYuyue;
            }
        },
        beforeCreate: function () {
            var title = '创新实践共享平台在线监控及评测平台';
            $("title").html(title);
            $(".hidden-folded").html(title)

            if (!sessionStorage.getItem("user")) {
                window.location.href = "/login.html";
            }
        },
        created: function () {
            this.loginuser = JSON.parse(sessionStorage.getItem("user"));
            $("#userName").text(this.loginuser.name);
            if (this.loginuser.id == "admin") {
                this.mulu = [
                    ['实验室管理', "jiaoshi-manager.html"],
                    ['实验室座位管理', "zuowei-manager.html"],
                    ['实验室不可用时间设定', "jiaoshi-set.html"],
                    ['报表', "report.html"]
                ]
            } else {
                this.mulu = [
                    ['开始预约', "home.html"],
                    ['资源展示', "ziyuan-list.html"],
                    ['预约记录', "yuyue-manager.html"],
                    ['预约流程', "yuyue-liucheng.html"]
                ]
                // $("#manager").parent("li").hide();
                // $('span:contains("' + title + '")').parent().attr('href', '/html/preview.html?sysid=1');

            }
        },
        methods: {
            //////实验室管理
            getShiYanShis: function () {
                var thisTmp = this;
                $.ajax({
                    type: "get",
                    url: apiUrl + "M_ShiYanShi",
                    dataType: "json",
                    success: function (response) {
                        if (response) {
                            thisTmp.ShiYanShiS = response;
                            thisTmp.ShiYanShiTop6 = response.slice(0, 6);
                            thisTmp.selectedSYS = response[0].zidongbianhao;
                        }
                    }
                });
            },
            shiyanshiChange: function () {
                console.log(this.selectedSYS);
                this.getZuoWeiByShiyanshi(this.selectedSYS);
                this.getBuKeYongShiJianByShiYanShi(this.selectedSYS);
            },
            deleteShiYanShi: function (id) {
                var thisTmp = this;
                if (id) {
                    $.ajax({
                        type: "delete",
                        url: apiUrl + "M_ShiYanShi/" + id,
                        success: function (response) {
                            thisTmp.getShiYanShis();
                        },
                        error: function (e) {
                            console.log(e)
                        }
                    });
                }
            },
            //////资源管理
            getZiYuan: function () {
                var thisTmp = this;
                $.ajax({
                    type: "get",
                    url: apiUrl + "T_ZiYuan",
                    dataType: "json",
                    success: function (response) {
                        if (response) {
                            thisTmp.ZiYuans = response;
                            thisTmp.ZiYuansTop6 = response.slice(0, 6);
                        }
                    },
                    error: function (err) {
                        console.log("err:", err);
                    }
                });
            },

            deleteZiYuan: function (id) {
                var thisTmp = this;
                if (id) {
                    $.ajax({
                        type: "delete",
                        url: apiUrl + "T_ZiYuan/" + id,
                        success: function (response) {
                            thisTmp.getZiYuan();
                        }
                    });
                }
            },

            //////座位管理
            getAllZuoWei: function () {
                var thisTmp = this;
                $.ajax({
                    type: "get",
                    url: apiUrl + "M_ZuoWei",
                    dataType: "json",
                    success: function (response) {
                        thisTmp.zichangshu = response.length;
                    }
                });
            },
            getZuoWeiByShiyanshi: function (shiyanshihao) {
                var thisTmp = this;
                if (shiyanshihao) {
                    //$("#zuoweiTable").html("");
                    $.ajax({
                        type: "get",
                        url: apiUrl + "M_ZuoWei?shiyanshihao=" + shiyanshihao,
                        dataType: "json",
                        success: function (response) {
                            thisTmp.ZuoWeiS = response;
                        }
                    });
                }
            },
            deleteZuoWei: function (id) {
                var thisTmp = this;
                if (id) {
                    $.ajax({
                        type: "delete",
                        url: apiUrl + "M_ZuoWei/" + id,
                        success: function (response) {
                            thisTmp.getZuoWei();
                        }
                    });
                }
            },
            //////不可用时间设定
            getBuKeYongShiJianByShiYanShi: function () {
                var thisTmp = this;
                if (this.selectedSYS) {
                    $.ajax({
                        type: "get",
                        url: apiUrl + "T_ShiYanShiBuKeYongShiJian?shiyanshihao=" + this.selectedSYS,
                        dataType: "json",
                        success: function (response) {
                            if (response) {
                                thisTmp.BuKeYongShiJianS = response;
                                // response.forEach(function (b, i) {
                                //     $("#bukeyongTable").append(
                                //         " <tr>" + "<td>" + (i + 1) + "</td>" + "<td>" + xingqi[b.zhouji - 1] + "</td>" +
                                //         "<td>" + b.kaishiriqi + "</td>" + "<td>" + b.jieshuriqi + "</td>" +
                                //         "<td>" + b.kaishizhou + "</td>" + "<td>" + b.jieshuzhou + "</td>" +
                                //         '<td><a href="＃" data-toggle="modal" data-target="#myModal" data-id="' + b.zidongbianhao + '">修改</a>｜<a href="javascript:shanchu(' + b.zidongbianhao + ')">删除</a></td></tr>');
                                // }, this);
                            }
                        },
                        error: function (err) {
                            console.log("err:", err);
                        }
                    });
                }
            },
            deleteBukeYongShiJian: function (id) {
                var thisTmp = this;
                if (id) {
                    $.ajax({
                        type: "delete",
                        url: apiUrl + "T_ShiYanShiBuKeYongShiJian/" + id,
                        success: function (response) {
                            thisTmp.getBuKeYongShiJian();
                        }
                    });
                }
            },
            //////预约功能
            getAllYuYue: function () {
                var thisTmp = this;
                $.ajax({
                    type: "get",
                    url: apiUrl + "T_YuYue",
                    dataType: "json",
                    success: function (response) {
                        if (response) {
                            thisTmp.YuYueS = response;
                            var today = (new Date()).toLocaleDateString();
                            var tmp = response.filter(yy => (new Date(yy.kaishi)).toLocaleDateString() == today);
                            thisTmp.dangtianhuoyueshu = (tmp ? tmp.length : 0);
                            thisTmp.YuYueSTop10 = response.slice(0, 10);
                        }
                    },
                    error: function (err) {
                        console.log("err:", err);
                    }
                });
            },
            getYuYue: function (user, shiyanshihao) {
                var thisTmp = this;
                if (user && shiyanshihao) {
                    $.ajax({
                        type: "get",
                        url: apiUrl + "T_YuYue?shiyanshihao=" + shiyanshihao + "&user=" + user,
                        dataType: "json",
                        success: function (response) {
                            if (response) {
                                thisTmp.YuYueS = response;
                            }
                        },
                        error: function (err) {
                            console.log("err:", err);
                        }
                    });
                }
            },
            deleteYuYue: function (id) {
                var thisTmp = this;
                if (id && thisTmp.YuYueS.length > 0) {
                    if (thisTmp.loginuser.id.length == 8) {
                        var tempY = thisTmp.YuYueS.find(y => y.zidongbianhao == id);
                        var selected = thisTmp.YuYueS.filter(
                            y => y.shiyanshihao == tempY.shiyanshihao &&
                                y.kaishi == tempY.kaishi &&
                                y.jieshu == tempY.jieshu
                        );
                        selected.forEach(function (yy, i) {
                            $.ajax({
                                type: "delete",
                                url: apiUrl + 'T_YuYue/' + yy.zidongbianhao,
                                success: function (response) {
                                    if ((i + 1) == selected.length) {
                                        thisTmp.getYuYue(thisTmp.loginuser.id, -1);
                                    }
                                }
                            });
                        })
                    } else {
                        $.ajax({
                            type: "delete",
                            url: apiUrl + 'T_YuYue/' + id,
                            success: function (response) {
                                thisTmp.getYuYue(loginuser.id, -1);
                            }
                        });
                    }
                }
            },
            //////通用方法
            delConfrim: function (id, callfunc, info) {
                info = info ? info : '您确定要删除吗?';
                $.Zebra_Dialog(info, {
                    type: 'warning',
                    title: '删除确认',
                    buttons: ['确定', '取消'],
                    onClose: function (caption) {
                        if (caption == "确定") {
                            callfunc(id);
                        }
                    }
                });
            },
            logOut: function () {
                sessionStorage.clear();
                window.location.href = "/login.html";
            }
        }
    });
});



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

