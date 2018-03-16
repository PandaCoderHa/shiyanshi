$(function() {
    getShiYanShis();
    getYuYue(loginuser.id, -1);
    setYuYueTable();

    var modal = $("#myModal");
    modal.on("show.bs.modal", function(e) {
        var id = $(e.relatedTarget).data("id");
        if (id) {
            var selectedS = ShiYanShiS.find(s => s.zidongbianhao == id);
            $("#M_id").val(id);
            $("#M_mingzi").val($.trim(selectedS.mingzi));
            $("input:radio[name='M_shifoshiyong']").eq(0).attr("checked", true);
            //$("input:radio[name='M_shifoshiyong']:checked")
        } else {
            $("#M_id").val('');
            $("#M_mingzi").val('');
            $("input:radio[name='M_shifoshiyong']").eq(0).attr("checked", true);
        }
    });
    modal.on('hide.bs.modal', function() {
        $("#M_id").val('');
        $("#M_mingzi").val('');
    });

    var myModal2 = $("#myModal2");
    myModal2.on("show.bs.modal", function(e) {
        var shiyanshi = $(e.relatedTarget).data("shiyanshi");
        var kaishi = $(e.relatedTarget).data("kaishi");
        var html = '';
        YuYueS.filter(y => y.shiyanshihao == shiyanshi && y.kaishi == kaishi).forEach(function(yy, i) {
            html += '<tr><td>' + (i + 1) + '</td><td>' + yy.xueshengbianhao + '</td><td>' + loginuser.students.find(s => s.card_number == yy.xueshengbianhao).name + '</td></tr>';

        }, this);
        $("#M_tbody").html(html);
    });
    myModal2.on('hide.bs.modal', function() {
        $("#M_tbody").html('');
    });

});

function setYuYueTable() {
    setTimeout(function() {
        if (YuYueS) {
            if ($("#yuyueFoot")) {
                YuYueS.length != 0 ? $("#yuyueFoot").hide() : $("#yuyueFoot").show();
            }
            //$('#mycalendar').dcalendar();
            var yyHtml = '';
            var now = new Date();

            for (var i = 0; i < YuYueS.length; i++) {
                var y = YuYueS[i];
                if (i > 0) {
                    var preY = YuYueS[i - 1];
                    if (y.shiyanshihao == preY.shiyanshihao &&
                        y.kaishi == preY.kaishi &&
                        y.jieshu == preY.jieshu) {
                        continue;
                    }
                }
                var kaishi = new Date(y.kaishi);
                var jieshu = new Date(y.jieshu);
                var tempName = '';
                var chengYuan = '个人预约';
                if (loginuser.id.length == 8) {
                    //tempName = loginuser.students.find(s => s.id == y.xueshengbianhao) ? loginuser.students.find(s => s.id == y.xueshengbianhao).name : '';
                    chengYuan = '<a href="" class="look-details" data-shiyanshi="' + y.shiyanshihao + '" data-kaishi="' + y.kaishi + '" data-toggle="modal" data-target="#myModal2">查看详情</a>'
                }

                yyHtml += '<tr><td>' + $.trim(y.shiyanshiMing) + ' ' + (loginuser.id.length == 10 ? $.trim(y.zuoweiMing) : '') + '</td>' +
                    '<td>' + loginuser.name + '</td><td>' + chengYuan + '</td>' +
                    '<td><p>开始：' + y.kaishi.substr(5, 11) + '</p><p> 结束：' + y.jieshu.substr(5, 11) + '</p></td>';
                if (kaishi > now) {
                    yyHtml += '<td><span class="yuyue-success">预约成功</span></td>' +
                        '<td><button type="button" onclick="deleteYuYue(' + y.zidongbianhao + ')" class="btn w-xs btn-info">取消</button></td></tr>';
                } else {
                    if (jieshu < now) {
                        yyHtml += '<td><span class="yuyue-success">已结束</span></td>' +
                            '<td></td></tr>';
                    } else {
                        yyHtml += '<td><span class="yuyue-success">已生效</span></td>' +
                            '<td><button type="button" class="btn w-xs btn-info" data-toggle="modal" data-target="#myModal">提前结束</button></td></tr>';
                    }

                }
            }

            // YuYueS.forEach(function (y) {


            // }, this);

            $("#yuyuetable").html(yyHtml);
        } else {
            setYuYueTable();
            if ($("#yuyueFoot")) {
                $("#yuyueFoot").show();
            }
        }
    }, 500);
}

function deleteYuYue(id) {
    $.Zebra_Dialog('您确定要取消预约吗?', {
        type: 'question',
        title: '删除确认',
        buttons: ['确定', '取消'],
        onClose: function(caption) {
            if (caption == "确定") {

                if (id && YuYueS.length > 0) {
                    if (loginuser.id.length == 8) {
                        var tempY = YuYueS.find(y => y.zidongbianhao == id);
                        var selected = YuYueS.filter(
                            y => y.shiyanshihao == tempY.shiyanshihao &&
                            y.kaishi == tempY.kaishi &&
                            y.jieshu == tempY.jieshu
                        );
                        selected.forEach(function(yy, i) {
                            $.ajax({
                                type: "delete",
                                url: apiUrl + 'T_YuYue/' + yy.zidongbianhao,
                                success: function(response) {
                                    if ((i + 1) == selected.length) {
                                        getYuYue(loginuser.id, -1);
                                        setYuYueTable();
                                    }
                                }
                            });
                        })
                    } else {
                        $.ajax({
                            type: "delete",
                            url: apiUrl + 'T_YuYue/' + id,
                            success: function(response) {
                                getYuYue(loginuser.id, -1);
                                setYuYueTable();
                            }
                        });
                    }
                }


            }
        }
    });
}

function tiqianjieshu() {
    var id = $("#M_id").val();
    var zuowei = {
        zuoweimingcheng: $("#M_mingzi").val(),
        shifoutingyong: $("input:radio[name='M_shifoshiyong']:checked").val() ? false : true,
        zhuohao: $("#M_zhuohaoSelect").val(),
        gengxinriqi: new Date().toString().substr(0, 24)
    };
    // if (id) {
    //   $.ajax({
    //     type: "put",
    //     url: apiUrl + 'M_ZuoWei/' + id,
    //     data: zuowei,
    //     dataType: "json",
    //     success: function (response) {
    //       $('#myModal').modal('hide');
    //       getZuoWei();
    //     }
    //   });
    // } else {
    //   // $.post(apiUrl + 'M_ZuoWei/?shiyanshibianhao=' + $("#shiyanshiSelect").val(), zuowei,
    //   //     function (data, textStatus, jqXHR) {
    //   //         alert('保存成功！');
    //   //         $('#myModal').modal('hide');
    //   //         window.location.href = window.location.href;
    //   //     },
    //   //     "json"
    //   // );
    //   $.ajax({
    //     type: "post",
    //     url: apiUrl + 'M_ZuoWei/?shiyanshibianhao=' + $("#shiyanshiSelect").val(),
    //     data: zuowei,
    //     dataType: "json",
    //     complete: function () {
    //       $('#myModal').modal('hide');
    //       getZuoWei();
    //     }
    //   });
    // }
}