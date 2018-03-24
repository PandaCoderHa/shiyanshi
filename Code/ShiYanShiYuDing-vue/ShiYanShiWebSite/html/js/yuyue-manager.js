$(function () {
    app.getShiYanShis();
    app.getYuYue(app.loginuser.id, -1);

    var modal = $("#myModal");
    modal.on("show.bs.modal", function (e) {
        var id = $(e.relatedTarget).data("id");
        if (id) {
            var y = app.YuYueS.filter(s => s.zidongbianhao == id)[0];
            if (y) {
                // $("#M_id").val(id);
                $("#shiyanshi").val($.trim(y.mingzi));
                $("#kaishiriqi").text(y.kaishi.substr(0, y.kaishi.indexOf(' ')));
                $("#kaishishijian").text(y.kaishi.substr(y.kaishi.indexOf(' ') + 1));
                $("#jieshushijian option").each(function (i, o) {
                    $(o).show();
                    var kaishi = $("#kaishishijian").text().replace(':', '');
                    var jieshu = y.jieshu.substr(y.jieshu.indexOf(' ') + 1).replace(':', '');
                    var ov = $(o).val().replace(':', '')
                    if (ov <= kaishi || ov >= jieshu) {
                        $(o).hide();
                        // if ($("#jieshushijian").val().replace(':', '') < $("#kaishishijian").text().replace(':', '')) {
                        //     $("#jieshushijian").val($(o).val());
                        // }
                    }

                });
                $("#jieshushijian").val('');
            }
        }
    });
    modal.on('hide.bs.modal', function () {
        $("#shiyanshi").val('');
        $("#kaishiriqi").text('');
        $("#kaishishijian").text('');
        $("#jieshushijian").val('');
    });

    var myModal2 = $("#myModal2");
    myModal2.on("show.bs.modal", function (e) {
        var shiyanshi = $(e.relatedTarget).data("shiyanshi");
        var kaishi = $(e.relatedTarget).data("kaishi");
        var html = '';
        app.YuYueS.filter(y => y.shiyanshihao == shiyanshi && y.kaishi == kaishi).forEach(function (yy, i) {
            html += '<tr><td>' + (i + 1) + '</td><td>' + yy.xueshengbianhao + '</td><td>' + app.loginuser.students.find(s => s.card_number == yy.xueshengbianhao).name + '</td></tr>';
        }, this);
        $("#M_tbody").html(html);
    });
    myModal2.on('hide.bs.modal', function () {
        $("#M_tbody").html('');
    });

});

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