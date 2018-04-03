$(function () {
    getShiYanShis();

    // $("#M_tupian").change(function() {
    //     $("#M_tupian_show").attr('src', 'file://' + $("#M_tupian").val());
    //     $("#M_tupian_show").show();
    // });


    var modal = $("#myModal");
    modal.on("show.bs.modal", function (e) {
        var id = $(e.relatedTarget).data("id");
        $("#M_tupian").val('');
        if (id) {
            var selectedS = ShiYanShiS.find(s => s.zidongbianhao == id);
            $("#M_id").val(id);
            $("#M_mingzi").val($.trim(selectedS.mingzi));
            $("#M_miaoshu").val($.trim(selectedS.miaoshu));
            $("#M_louceng").val(selectedS.louceng);
            $("#M_fuzeren").val(selectedS.fuzeren);
            $("#M_shifoshiyong").prop("checked", selectedS.shifoutingyong);
            //$("input:radio[name='M_shifoshiyong']:checked")
            $("#M_tupian_show").attr('src', selectedS.tupian);
            $("#M_tupian_show").show();

        } else {
            $("#M_mingzi").val('');
            $("#M_miaoshu").val('');
            $("#M_shifoshiyong").prop("checked", false);
            $("#M_tupian_show").hide();
            $("#M_fuzeren").val('');
        }
    });
    modal.on('hide.bs.modal', function () {
        $("#M_id").val('');
        $("#M_mingzi").val('');
        $("#M_miaoshu").val('');
        $("#M_louceng").val(1);
        $("#M_tupian").val('');
        $("#M_tupian_show").hide();
        $("#M_fuzeren").val('');
    });
    $("#M_Save").click(function () {

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
            miaoshu: $("#M_miaoshu").val(),
            louceng: $("#M_louceng").val(),
            shifoutingyong: $("#M_shifoshiyong").prop("checked"),// $("input:radio[name='M_shifoshiyong']:checked").val() ? false : true,
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
                success: function (response) {
                    var imgUrl = apiUrl.replace('api/', 'Imgs/') + response.substring(response.lastIndexOf('\\') + 1);
                    sys.tupian = imgUrl;
                    console.log(imgUrl);
                    doSave();
                },
                error: function (e) {
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
        }

    });



});

var alertOption = {
    type: 'information',
    title: '信息提示'
};
function kaimen(id) {
    var loadOption = {
        message: '开门中,请稍候。。。',
        theme: 'dark'
    };
    var doornums = {
        G309: 8009,
        G306: 8008,
        G305: 8007,
        G301: 8006,
        E103: 8005,
        G211: 8004,
        G206: 8003,
        G205: 8002,
        G201: 8001,
        G109: 8000

    }
    $("body").loading(loadOption);
    var shiyanshi = ShiYanShiS.find(s => s.zidongbianhao == id);
    if (shiyanshi) {
        $.ajax({
            type: "post",
            url: 'http://labdoor.xiaosikeji.com/api/open_door',
            data: {
                door_num: doornums[shiyanshi.mingzi.substr(0, 4)]
            },
            dataType: "json",
            //jsonpCallback: "getData",
            success: function (response) {
                $("body").loading('stop');
                if (response && response == 'open') {
                    $.Zebra_Dialog('远程开门成功', alertOption);
                } else {
                    $.Zebra_Dialog('远程开门失败', alertOption);
                }
            },
            error: function (e) {
                setTimeout(() => {
                    if (e.responseText == "open") {
                        $.Zebra_Dialog('远程开门成功', alertOption);
                    } else {
                        $.Zebra_Dialog('远程开门失败', alertOption);
                    }
                    $("body").loading('stop');
                    console.log(e);
                }, 10*1000);

            }
        });
    }

}

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