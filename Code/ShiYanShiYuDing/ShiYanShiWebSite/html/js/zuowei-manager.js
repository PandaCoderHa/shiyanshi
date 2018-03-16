$(function() {
    getShiYanShis();
    getZuoWei();
    $("#shiyanshiSelect").change(getZuoWei);

    var modal = $("#myModal");
    modal.on("show.bs.modal", function(e) {
        var id = $(e.relatedTarget).data("id");
        if (id) {
            var selectedS = ShiYanShiS.find(s => s.zidongbianhao == id);
            $("#M_id").val(id);
            $("#M_mingzi").val($.trim(selectedS.mingzi));
            $("input:radio[name='M_shifoshiyong']")
                .eq(0)
                .attr("checked", true);
            //$("input:radio[name='M_shifoshiyong']:checked")
        } else {
            $("#M_id").val("");
            $("#M_mingzi").val("");
            $("input:radio[name='M_shifoshiyong']")
                .eq(0)
                .attr("checked", true);
        }
    });
    modal.on("hide.bs.modal", function() {
        $("#M_id").val("");
        $("#M_mingzi").val("");
    });
    $("#M_Save").click(function() {
        var id = $("#M_id").val();
        var zuowei = {
            zuoweimingcheng: $("#M_mingzi").val(),
            shifoutingyong: $("input:radio[name='M_shifoshiyong']:checked").val() ?
                false : true,
            zhuohao: $("#M_zhuohaoSelect").val(),
            gengxinriqi: new Date().toString().substr(0, 24)
        };
        if (id) {
            $.ajax({
                type: "put",
                url: apiUrl + "M_ZuoWei/" + id,
                data: zuowei,
                dataType: "json",
                success: function(response) {
                    $("#myModal").modal("hide");
                    getZuoWei();
                }
            });
        } else {
            // $.post(apiUrl + 'M_ZuoWei/?shiyanshibianhao=' + $("#shiyanshiSelect").val(), zuowei,
            //     function (data, textStatus, jqXHR) {
            //         alert('保存成功！');
            //         $('#myModal').modal('hide');
            //         window.location.href = window.location.href;
            //     },
            //     "json"
            // );
            $.ajax({
                type: "post",
                url: apiUrl + "M_ZuoWei/?shiyanshibianhao=" + $("#shiyanshiSelect").val(),
                data: zuowei,
                dataType: "json",
                complete: function() {
                    $("#myModal").modal("hide");
                    getZuoWei();
                }
            });
        }
    });

    var modal1 = $("#myModal1");
    modal1.on("show.bs.modal", function(e) {
        $("#M_renShuSelect").val(1);
        $("#M_zhuoShuSelect").val(1);
        $('#jqmeter-container').hide();
    });
    modal1.on("hide.bs.modal", function() {

    });
    $("#M_PiLiang").click(function() {
        var zuoweishu = $("#M_renShuSelect").val() * $("#M_zhuoShuSelect").val();
        if (confirm("将为实验室【" + $.trim($("#shiyanshiSelect option:selected").text()) + "】批量添加" + zuoweishu + "个座位？")) {
            var count = 0;
            $('#jqmeter-container').show();
            var interval = setInterval(() => {
                $('#jqmeter-container').jQMeter({
                    goal: '$' + (zuoweishu - 1),
                    raised: '$' + count,
                    // animationSpeed: 500,
                    // counterSpeed: 500,
                    height: '20px'
                });
                if (zuoweishu == count) {
                    clearInterval(interval);
                    $("#myModal1").modal("hide");
                    getZuoWei();
                }
            }, 100)
            for (let i = 0; i < $("#M_zhuoShuSelect").val(); i++) {
                for (let j = 0; j < $("#M_renShuSelect").val(); j++) {

                    var zuowei = {
                        zuoweimingcheng: '座位',
                        shifoutingyong: false,
                        zhuohao: i + 1,
                        gengxinriqi: new Date().toString().substr(0, 24)
                    };
                    $.ajax({
                        type: "post",
                        url: apiUrl + "M_ZuoWei/?shiyanshibianhao=" + $("#shiyanshiSelect").val(),
                        data: zuowei,
                        dataType: "json",
                        complete: function() {
                            count = count + 1;
                        }
                    });
                }
            }


        }
    });
});

function getZuoWei() {
    setTimeout(function() {
        console.log('$("#shiyanshiSelect").val()' + $("#shiyanshiSelect").val());
        if ($("#shiyanshiSelect").val() != 0) {
            getZuoWeiByShiyanshi($("#shiyanshiSelect").val());
            setZhuoHao();
        } else {
            getZuoWei();
        }
    }, 300);
}

function ShanChuan(id) {
    deleteZuoWei(id);
}

var setZhuoHaoCount = 0;

function setZhuoHao() {
    var tempHtml = "";
    for (var i = 1; i <= 30; i++) {
        tempHtml += '<option value="' + i + '">' + i + "</option>";
    }
    $("#M_zhuohaoSelect").html(tempHtml);
    $("#M_zhuoShuSelect").html(tempHtml);
    $("#M_renShuSelect").html(tempHtml);
    // setTimeout(function () {
    //     if (ZuoWeiS && ZuoWeiS.length > 0) {
    //         var tempHtml = '';
    //         var mapOption = Math.max.apply(Math, ZuoWeiS.map(z => z.zhuohao));
    //         for (var i = 0; i <= mapOption + 1; i++) {
    //             tempHtml += '<option value="' + i + '">' + i + '</option>';
    //         }
    //         $("#M_zhuohaoSelect").html(tempHtml);
    //     } else {
    //         if (setZhuoHaoCount < 5) {
    //             setZhuoHao();
    //         } else {
    //             var tempHtml = '';
    //             tempHtml += '<option value="' + 0 + '">' + 0 + '</option>';
    //             $("#M_zhuohaoSelect").html(tempHtml);
    //         }
    //     }
    //     setZhuoHaoCount++;
    // }, 300);
}