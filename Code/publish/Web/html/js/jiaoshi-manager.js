$(function () {
    getShiYanShis();
    var modal = $("#myModal");
    modal.on("show.bs.modal", function (e) {
        var id = $(e.relatedTarget).data("id");
        if (id) {
            var selectedS = ShiYanShiS.find(s => s.zidongbianhao == id);
            $("#M_id").val(id);
            $("#M_mingzi").val($.trim(selectedS.mingzi));
            $("input:radio[name='M_shifoshiyong']").eq(0).attr("checked", true);
            //$("input:radio[name='M_shifoshiyong']:checked")
        }
        else {
            $("#M_mingzi").val('');
            $("input:radio[name='M_shifoshiyong']").eq(0).attr("checked", true);
        }
    });
    modal.on('hide.bs.modal', function () {
        $("#M_id").val('');
        $("#M_mingzi").val('');
    });
    $("#M_Save").click(function () {
        var id = $("#M_id").val();
        var sys = {
            mingzi: $("#M_mingzi").val(),
            shifoutingyong: $("input:radio[name='M_shifoshiyong']:checked").val() ? false : true,
            gengxinriqi: new Date().toString().substr(0, 24)
        };
        if (id) {
            $.ajax({
                type: "put",
                url: apiUrl + 'M_ShiYanShi/' + id,
                data: sys,
                dataType: "json",
                success: function (response) {
                    $('#myModal').modal('hide');
                    getShiYanShis();
                }
            });
        } else {
            $.ajax({
                type: "post",
                url: apiUrl + 'M_ShiYanShi',
                data: sys,
                dataType: "json",
                success: function (response) {
                    $('#myModal').modal('hide');
                    getShiYanShis();
                }
            });
        }
    });
});

function ShanChuan(id) {
    deleteShiYanShi(id);
}