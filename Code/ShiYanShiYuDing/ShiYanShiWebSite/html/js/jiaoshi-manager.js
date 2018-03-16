$(function() {
    getShiYanShis();

    // $("#M_tupian").change(function() {
    //     $("#M_tupian_show").attr('src', 'file://' + $("#M_tupian").val());
    //     $("#M_tupian_show").show();
    // });


    var modal = $("#myModal");
    modal.on("show.bs.modal", function(e) {
        var id = $(e.relatedTarget).data("id");
        $("#M_tupian").val('');
        if (id) {
            var selectedS = ShiYanShiS.find(s => s.zidongbianhao == id);
            $("#M_id").val(id);
            $("#M_mingzi").val($.trim(selectedS.mingzi));
            $("#M_louceng").val(selectedS.louceng);
            $("#M_fuzeren").val(selectedS.fuzeren);
            $("input:radio[name='M_shifoshiyong']").eq(0).attr("checked", true);
            //$("input:radio[name='M_shifoshiyong']:checked")
            $("#M_tupian_show").attr('src', selectedS.tupian);
            $("#M_tupian_show").show();

        } else {
            $("#M_mingzi").val('');
            $("input:radio[name='M_shifoshiyong']").eq(0).attr("checked", true);
            $("#M_tupian_show").hide();
            $("#M_fuzeren").val('');
        }
    });
    modal.on('hide.bs.modal', function() {
        $("#M_id").val('');
        $("#M_mingzi").val('');
        $("#M_louceng").val(1);
        $("#M_tupian").val('');
        $("#M_tupian_show").hide();
        $("#M_fuzeren").val('');
    });
    $("#M_Save").click(function() {

        var imgFile = document.getElementById("M_tupian").files.length > 0 ? document.getElementById("M_tupian").files[0] : null;
        if (imgFile && imgFile.size > 1024 * 1024 * 10) {
            $.Zebra_Dialog('请上传小于10M的图片。', {
                type: 'error',
                title: '信息提示'
            });
            return;
        }
        var id = $("#M_id").val();
        var sys = {
            mingzi: $("#M_mingzi").val(),
            louceng: $("#M_louceng").val(),
            shifoutingyong: $("input:radio[name='M_shifoshiyong']:checked").val() ? false : true,
            fuzeren: $("#M_fuzeren").val(),
            gengxinriqi: new Date().toString().substr(0, 24)
        };
        if (imgFile) {
            var formData = new FormData();
            formData.append("img", document.getElementById("M_tupian").files[0]);
            $.ajax({
                type: "post",
                url: apiUrl + 'Image',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    var imgUrl = apiUrl.replace('api/', 'Imgs/') + response.substring(response.lastIndexOf('\\') + 1);
                    sys.tupian = imgUrl;
                    console.log(imgUrl);
                    doSave();
                },
                error: function(e) {
                    $.Zebra_Dialog('图片保存失败', {
                        type: 'error',
                        title: '信息提示'
                    });
                }
            });
        } else {
            doSave();
        }


        function doSave() {
            if (id) {
                $.ajax({
                    type: "put",
                    url: apiUrl + 'M_ShiYanShi/' + id,
                    data: sys,
                    dataType: "json",
                    success: function(response) {
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
                    success: function(response) {
                        $('#myModal').modal('hide');
                        getShiYanShis();
                    }
                });
            }
        }

    });
});

// function ShanChuan(id) {
//     $.Zebra_Dialog('您确定要删除吗?', {
//         type: 'question',
//         title: '删除确认',
//         buttons: ['确定', '取消'],
//         onClose: function(caption) {
//             if (caption == "确定") {
//                 deleteShiYanShi(id);
//             }
//         }
//     });
// }