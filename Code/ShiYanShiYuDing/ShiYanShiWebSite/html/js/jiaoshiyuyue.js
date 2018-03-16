var sc;
var riqi = getUrlParamater("date");
var sysid = getUrlParamater("sysid");
var zuoweiObjs = [];
var bukeyongOption = [];
$(function() {
    $("#gonghao").text((loginuser.id.length == 10 ? '学号：' : '工号：'));
    getShiYanShis();
    $("#user").text(loginuser.id);
    $("#name").text(loginuser.name);
    var d = new Date(riqi);
    $("#riqi").text(riqi.substr(5, 5));
    $("#riqizhou").text(xingqi[d.getDay() - 1]);
    setShiYanShiMing();
    getZwoWeiByShiYahShi(sysid);

    getBuKeYongShiJianByShiYanShi(sysid);
    setBuKeYongShiJan();

    $("#tijiao").click(tiJiaoYuYue);
    $("#kaishi").change(kaishiChange);
    $("#jieshu").change(setYiYuYueZuoWei);
    getYuYue(-1, sysid);
    setYiYuYueZuoWei();
    kaishiChange();
    if (loginuser.id.length != 8) {
        $("#chengyuan").parent().parent().hide();
    } else {
        setChengYuan();
        $("#chengyuan").change(chengYuanChange);
    }
});

function chengyuanQuanXuan() {
    if ($("#quanxuan").val() == "全选") {
        $("#quanxuan").val("全不选");
        setChengYuan(true);
    } else {
        $("#quanxuan").val("全选");
        setChengYuan(false);
    }
    chengYuanChange();
}

function chengYuanChange() {
    var cyLength = $("#chengyuan").val() ? $("#chengyuan").val().length : 0;
    var zyLength = sc.find("selected").seats.length;
    if (cyLength == $("#chengyuan option").length) {
        $("#quanxuan").val("全不选");
    } else {
        $("#quanxuan").val("全选");
    }
    if (cyLength > zyLength) {
        for (var i = 0; i < cyLength - zyLength; i++) {
            sc.find("available").seats[0].status("selected");
        }
    } else if (cyLength < zyLength) {
        for (var i = 0; i < zyLength - cyLength; i++) {
            sc
                .find("selected")
                .seats[sc.find("selected").length - 1].status("available");
        }
    }
}

function setChengYuan(selected = false) {
    if (loginuser.students) {
        var studentsOptions = "";
        loginuser.students.forEach(function(s) {
            studentsOptions +=
                "<option " +
                (selected ? "selected" : "") +
                ' value="' +
                s.card_number +
                '">' +
                s.card_number +
                "-" +
                s.name +
                "</option>";
        });
        $("#chengyuan").html(studentsOptions);
        if ($("#chengyuan").chosen) {
            $("#chengyuan").chosen("destroy");
            $("#chengyuan").trigger("liszt:updated");
            $("#chengyuan").chosen();
        }
    }
}

function kaishiChange() {
    $("#jieshu option").each(function() {
        if (
            $(this)
            .val()
            .replace(":", "") <=
            $("#kaishi")
            .val()
            .replace(":", "")
        ) {
            $(this).hide();
        } else {
            $(this).show();
        }
    }, this);
    $("#jieshu option").each(function() {
        if ($(this).css("display") == "block") {
            $("#jieshu").val($(this).val());
            setYiYuYueZuoWei();
            return false;
        }
    }, this);
}

function tiJiaoYuYue() {
    var kaishiSelected = $("#kaishi").val();
    var jieshuSelected = $("#jieshu").val();
    var alertOption = {
        type: 'information',
        title: '信息提示'
    };
    var d = new Date(riqi);
    if (!$("#xiangmu").val()) {
        $.Zebra_Dialog('请填写课程相关实验项目名称', alertOption);
        return false;
    }

    if (new Date(riqi + " " + kaishiSelected) < new Date()) {
        $.Zebra_Dialog('开始时间小于当前时间。', alertOption);
        return false;
    }
    var bukeyong = BuKeYongShiJianS.find(b => b.zhouji == d.getDay());
    if (bukeyong) {
        var kaishiY = bukeyong.kaishiriqi;
        var jieshuY = bukeyong.jieshuriqi;
        if (
            (kaishiY <= kaishiSelected && kaishiSelected < jieshuY) ||
            (kaishiY < jieshuSelected && jieshuSelected <= jieshuY) ||
            (kaishiY > kaishiSelected && jieshuY < jieshuSelected)
        ) {
            $.Zebra_Dialog('包含不可用时间段。', alertOption);
            return false;
        }
    }
    if (
        jieshuSelected.replace(":", "") - kaishiSelected.replace(":", "") > 400 ||
        jieshuSelected.replace(":", "") - kaishiSelected.replace(":", "") < 100
    ) {
        $.Zebra_Dialog('时长超出允许范围, 允许时长 1小时 － 4小时 ', alertOption);
        return false;
    }
    if (sc.find("selected").seatIds.length == 0) {
        $.Zebra_Dialog('请选择座位。', alertOption);
        return;
    }
    if (loginuser.id.length == 8) {
        if (!$("#chengyuan").val()) {
            $.Zebra_Dialog('请选择成员。', alertOption);
            return;
        } else if ($("#chengyuan").val().length != sc.find("selected").length) {
            $.Zebra_Dialog('座位数与成员数不符。', alertOption);
            return;
        } else if (sc.find("selected").seatIds.length < 10) {
            $.Zebra_Dialog('教师至少预约十人。', alertOption);
            return;
        }
    }

    if (loginuser.id.length == 8) {
        sc.find("selected").seatIds.forEach(function(selectedId, i) {
            var zuowei =
                zuoweiObjs[selectedId.split("_")[0]][selectedId.split("_")[1] - 1];
            var student = loginuser.students.find(s => s.card_number == $("#chengyuan").val()[i])
            console.log(student);
            var yuyue = {
                jiaoshibianhao: loginuser.id,
                xueshengbianhao: $("#chengyuan").val()[i],
                xueshengxingming: student.name,
                banji: student.class_name,
                yuyuekaishiriqi: riqi + " " + $("#kaishi").val(),
                yuyuejieshuriqi: riqi + " " + $("#jieshu").val(),
                gengxinriqi: new Date().toString().substr(0, 24),
                xiangmu: $("#xiangmu").val(),
                zhidaojiaoshi: $("#zhidao").val()
            };
            $.ajax({
                type: "post",
                url: apiUrl + "T_YuYue/?shiyanshihao=" + sysid + "&zuoweihao=" + zuowei.zidongbianhao,
                data: yuyue,
                dataType: "json",
                error: function(err) {
                    console.log(err);
                },
                complete: function() {
                    if (i + 1 == sc.find("selected").length) {
                        $.Zebra_Dialog('预定成功！', {
                            type: 'information',
                            title: '提示信息',
                            onClose: function(caption) {
                                window.location.href = "preview.html?sysid=" + sysid;
                            }
                        });
                    }
                }
            });
        }, this);
    } else {
        var selectedId = sc.find("selected").seatIds[0];
        var zuowei =
            zuoweiObjs[selectedId.split("_")[0]][selectedId.split("_")[1] - 1];
        var yuyue = {
            xueshengbianhao: loginuser.id,
            xueshengxingming: loginuser.name,
            banji: loginuser.classes,
            yuyuekaishiriqi: riqi + " " + $("#kaishi").val(),
            yuyuejieshuriqi: riqi + " " + $("#jieshu").val(),
            gengxinriqi: new Date().toString().substr(0, 24),
            xiangmu: $("#xiangmu").val(),
            zhidaojiaoshi: $("#zhidao").val()
        };
        $.ajax({
            type: "post",
            url: apiUrl +
                "T_YuYue/?shiyanshihao=" +
                sysid +
                "&zuoweihao=" +
                zuowei.zidongbianhao,
            data: yuyue,
            dataType: "json",
            error: function(err) {
                console.log(err);
            },
            complete: function() {
                $.Zebra_Dialog('预定成功！', {
                    type: 'information',
                    title: '提示信息',
                    onClose: function(caption) {
                        window.location.href = "preview.html?sysid=" + sysid;
                    }
                });
            }
        });
    }
}

function setShiYanShiMing() {
    setTimeout(function() {
        if (ShiYanShiS.length > 0) {
            var s = ShiYanShiS.find(s => s.zidongbianhao == getUrlParamater("sysid"));
            $("#shiyanshi").text(s.mingzi);
            $("#fuzeren").text(s.fuzeren);
        } else {
            setShiYanShiMing();
        }
    }, 300);
}

function getZwoWeiByShiYahShi(sysid) {
    if (sysid) {
        var max = 0;
        $("#zuoweiTable").html("");
        $.ajax({
            type: "get",
            url: apiUrl + "M_ZuoWei?shiyanshihao=" + sysid,
            dataType: "json",
            success: function(response) {
                if (response) {
                    var preZhaohao;
                    response.forEach(function(z) {
                        if (!preZhaohao) {
                            preZhaohao = z.zhuohao;
                        }
                        if (preZhaohao == z.zhuohao) {
                            if (!zuoweiObjs[z.zhuohao]) {
                                zuoweiObjs[z.zhuohao] = [z];
                            } else {
                                zuoweiObjs[z.zhuohao].push(z);
                            }
                        } else {
                            preZhaohao = z.zhuohao;
                            zuoweiObjs[z.zhuohao] = [z];
                        }
                        max =
                            zuoweiObjs[z.zhuohao].length > max ?
                            zuoweiObjs[z.zhuohao].length :
                            max;
                        // if (zuoweiObjs[z.zhuohao]) {
                        //   zuoweiObjs[z.zhuohao] = [z];
                        // } else {
                        //   zuoweiObjs[z.zhuohao].push(z);
                        // }

                        //$('#zuoweiTable').append(' <tr><td>' + z.zidongbianhao + '</td><td>' + z.zuoweimingcheng + '</td><td>' + z.zhuohao + '</td><td><a href="javascript:ShanChuan(' + z.zidongbianhao + ')" >删除</a></td></tr>')
                    }, this);
                    var seatMapArr = [];
                    var rowArr = [];
                    zuoweiObjs.forEach(function(zhuo, index) {
                        if (zhuo) {
                            rowArr.push(index);
                            var zhuoTemp = "";
                            for (var i = 0; i < max; i++) {
                                var z = zhuo[i];
                                if (z) {
                                    zhuoTemp += "a";
                                } else {
                                    zhuoTemp += "_";
                                }
                            }
                            seatMapArr.push(zhuoTemp);
                        }
                    }, this);
                    seatMap(seatMapArr, rowArr);
                }
            }
        });
    }
}

function seatMap(seatMapArr, rowArr) {
    sc = $("#seat-map").seatCharts({
        map: seatMapArr,
        seats: {
            a: {
                price: 99.99,
                classes: "front-seat" //your custom CSS class
            }
        },
        naming: {
            top: false,
            // getLabel : function (character, row, column) {
            // 	return column;
            // },
            rows: rowArr
        },
        legend: {
            node: $("#my-legend-container"),
            items: [
                ["a", "available", "可选座位"],
                ["a", "selected", "已选座位"],
                ["a", "unavailable", "不可选座位"]
            ]
        },
        click: function() {
            if (this.status() == "available") {
                if (
                    loginuser.id.length != 8 &&
                    sc.find("selected").seatIds.length == 1
                ) {
                    sc.find("selected").seats[0].status("available");
                }
                return "selected";
            } else if (this.status() == "selected") {
                //seat has been vacated
                return "available";
            } else if (this.status() == "unavailable") {
                //seat has been already booked
                return "unavailable";
            } else {
                return this.style();
            }
        }
    });

    // //Make all available 'c' seats unavailable
    //sc.find('b.available').status('unavailable');

    // /*
    // Get seats with ids 2_6, 1_7 (more on ids later on),
    // put them in a jQuery set and change some css
    // */
    // sc.get(['2_6', '1_7']).node().css({
    //   color: '#ffcfcf'
    // });

    // console.log('Seat 1_2 costs ' + sc.get('1_2').data().price + ' and is currently ' + sc.status('1_2'));
}

function setBuKeYongShiJan() {
    setTimeout(function() {
        if (BuKeYongShiJianS.length > 0) {
            //$("#shiyanshi").text(ShiYanShiS.find(s => s.zidongbianhao == getUrlParamater("sysid")).mingzi);
            var d = new Date(riqi);
            var zhoushu = getYearWeek(d);
            var bukeyong = BuKeYongShiJianS.find(b => b.kaishizhou <= zhoushu && zhoushu <= b.jieshuzhou && b.zhouji == d.getDay());
            if (bukeyong) {
                $("#bukeyong").text(bukeyong.kaishiriqi + " - " + bukeyong.jieshuriqi);
                var kaishi = bukeyong.kaishiriqi.replace(":", "");
                var jieshu = bukeyong.jieshuriqi.replace(":", "");
                $("#kaishi option").each(function(i, o) {
                    var tmp = $(o).val().replace(":", "");
                    if (kaishi <= tmp && tmp < jieshu) {
                        bukeyongOption.push(o);
                        $(o).remove();
                    }
                });
                $("#jieshu option").each(function(i, o) {
                    var tmp = $(o).val().replace(":", "");
                    if (kaishi < tmp && tmp <= jieshu) {
                        bukeyongOption.push(o);
                        $(o).remove();
                    }
                });
            } else {
                $("#bukeyong").text("无");
            }
            $("#jieshu").val($("#jieshu option:eq(2)").val());
            $("#jieshu").change();
        } else {
            $("#bukeyong").text("无");
            setBuKeYongShiJan();
        }
    }, 300);
}

function setYiYuYueZuoWei() {
    setTimeout(function() {
        if (YuYueS && YuYueS.length > 0) {
            if (sc.find("selected").length) {
                sc.find("selected").seats[0].status("available");
            }
            if (sc.find("unavailable").length > 0) {
                sc.find("unavailable").each(function() {
                    this.status("available");
                });
            }
            YuYueS.forEach(function(y) {
                for (var i = 0; i < zuoweiObjs.length; i++) {
                    var zhuo = zuoweiObjs[i];
                    if (zhuo) {
                        for (var j = 0; j < zhuo.length; j++) {
                            var zuowei = zhuo[j];
                            var kTemp = new Date($.trim(y.kaishi.substr(0, 10))).toString();
                            var rTemp = new Date(riqi).toString();
                            if (zuowei.zidongbianhao == y.zuoweihao && kTemp.substr(0, kTemp.indexOf(':') - 3) == rTemp.substr(0, rTemp.indexOf(':') - 3)) {
                                var kaishiSelected = $("#kaishi").val().replace(":", "");
                                var jieshuSelected = $("#jieshu").val().replace(":", "");
                                var kaishiY = y.kaishi.substr(y.kaishi.indexOf(" "), y.kaishi.length - y.kaishi.indexOf(" "));
                                kaishiY = $.trim(kaishiY.replace(":", ""));
                                var jieshuY = y.jieshu.substr(y.jieshu.indexOf(" "), y.jieshu.length - y.jieshu.indexOf(" "));
                                jieshuY = $.trim(jieshuY.replace(":", ""));
                                console.log(kaishiSelected + "<" + kaishiY + "&&<" + jieshuY + "<" + jieshuSelected);
                                if (
                                    (kaishiY <= kaishiSelected && kaishiSelected < jieshuY) ||
                                    (kaishiY < jieshuSelected && jieshuSelected <= jieshuY)
                                ) {
                                    sc.get(i + "_" + (j + 1)).status("unavailable");
                                }
                            }
                        }
                    }
                }
            });
        } else {
            setYiYuYueZuoWei();
        }
    }, 300);
}

function getYearWeek(date) {
    var date2 = new Date(date.getFullYear(), 0, 1);
    var day1 = date.getDay();
    if (day1 == 0) day1 = 7;
    var day2 = date2.getDay();
    if (day2 == 0) day2 = 7;
    d = Math.round((date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000);
    return Math.ceil(d / 7) + 1;
}