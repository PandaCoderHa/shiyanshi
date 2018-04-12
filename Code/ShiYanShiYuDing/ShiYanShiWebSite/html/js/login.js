var API_KEY = "dMSHsWKy";
var SECRET_KEY =
    "nSemlZ2e7EVZAkROr5x44pMUkEbqKAlMIlJ2GdW0olrA2D4mwvRgLuZssy97AUByVYU";
var teacherJson;
//var baseApi = "http://xiaosiapi.mindaxiaosi.com/api/wx_card/wx_signed";
var baseApi = "http://xiaosiapi.mindaxiaosi.com/api/process/aponitment";
var headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
};
var alertOption = {
    type: 'information',
    title: '信息提示'
};

$(function () {
    // var carNumber = $("#user").val();
    // if (carNumber.length == 8) {
    //   $("#login").attr("href", '#');
    //   $("#login").attr("data-toggle", "modal");
    //   $("#login").attr("data-target", "#myModal2");
    // }

    var myModal2 = $("#myModal2");
    myModal2.on("show.bs.modal", function (e) {
        // var shiyanshi = $(e.relatedTarget).data("shiyanshi");
        // var kaishi = $(e.relatedTarget).data("kaishi");
        // var html = '';
        // YuYueS.filter(y => y.shiyanshihao == shiyanshi && y.kaishi == kaishi).forEach(function (yy, i) {
        //   html += '<tr><td>' + (i + 1) + '</td><td>' + yy.xueshengbianhao + '</td><td>' + loginuser.students.find(s => s.card_number == yy.xueshengbianhao).name + '</td></tr>';
        // }, this);
        // $("#M_tbody").html(html);
    });
    myModal2.on("hide.bs.modal", function () {
        // $("#M_tbody").html('');
    });


    // //微信登录
    // $.ajax({
    //     type: "get",
    //     url: 'wx.mindaxiaosi.com/api/auth_lab',
    //     dataType: "json",
    //     //jsonpCallback: "getData",
    //     success: function (response) {
    //         if (response && response.userid) {
    //             var userObj = JSON.stringify({
    //                 id: response.userid,
    //                 classes: decodeURI(response.class),
    //                 name: decodeURI(response.username)
    //             });
    //             sessionStorage.setItem("user", JSON.stringify(userObj));
    //             window.location.href = "/html/home.html?sysid=1";
    //         }
    //     },
    //     error: function (XMLHttpRequest, textStatus, errorThrown) {
    //         console.log("XMLHttpRequest", XMLHttpRequest);
    //         console.log("textStatus", textStatus);
    //         console.log("errorThrown", errorThrown);
    //     }
    // });
});

function login() {
    if (!$("#user").val()) {
        $.Zebra_Dialog('请输入工号', alertOption);
        return;
    }
    if (!$("#password").val()) {
        $.Zebra_Dialog('请输入密码', alertOption);
        return;
    }
    //var user = $("#user").val();
    var userObj = JSON.stringify({
        id: $("#user").val(),
        name: $("#user").val()
    });

    var carNumber = $("#user").val();
    if (carNumber) {
        if (carNumber == "admin") {
            if (
                CryptoJS.MD5($("#password").val()).toString() ==
                "c93ccd78b2076528346216b3b2f701e6"
            ) {
                sessionStorage.setItem("user", userObj);
                window.location.href = "/html/jiaoshi-manager.html";
            } else {
                $.Zebra_Dialog('账号或密码错误。', alertOption);
            }
        } else if (carNumber.length == 10) {
            var encryptObj = encrypt({
                t_uid: carNumber,
                passwd: $("#password").val()
            });
            //var studentJson = JSON.parse(decrypt(studentResult));
            $.ajax({
                type: "post",
                url: baseApi +
                    "?nonce=" +
                    encryptObj.nonce +
                    "&msg_signature=" +
                    encryptObj.msg_signature,
                headers: headers,
                data: {
                    encrypt_msg: encryptObj.encrypt_msg,
                    api_key: encryptObj.API_KEY
                },
                dataType: "json",
                //jsonpCallback: "getData",
                success: function (response) {
                    if (response && response.errcode && response.errcode == 2) {
                        $.Zebra_Dialog('账号或密码错误。', alertOption);
                        return;
                    }
                    if (response) {
                        studentJson = JSON.parse(decrypt(response));
                        if (studentJson && studentJson.message) {
                            userObj = JSON.parse(userObj);
                            userObj.classes = studentJson.classes;
                            userObj.name = studentJson.name;
                            sessionStorage.setItem("user", JSON.stringify(userObj));
                            window.location.href = "/html/home.html?sysid=1";
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("XMLHttpRequest", XMLHttpRequest);
                    console.log("textStatus", textStatus);
                    console.log("errorThrown", errorThrown);
                }
            });
        } else if (carNumber.length == 8) {
            var encryptObj = encrypt({
                t_uid: carNumber,
                passwd: $("#password").val()
            });
            $.ajax({
                type: "post",
                url: baseApi +
                    "?nonce=" +
                    encryptObj.nonce +
                    "&msg_signature=" +
                    encryptObj.msg_signature,
                headers: headers,
                data: {
                    encrypt_msg: encryptObj.encrypt_msg,
                    api_key: encryptObj.API_KEY
                },
                dataType: "json",
                //jsonpCallback: "getData",
                success: function (response) {
                    if (response && response.errcode && response.errcode == 2) {
                        $.Zebra_Dialog('账号或密码错误。', alertOption);
                        return;
                    }
                    teacherJson = JSON.parse(decrypt(response));
                    $("#kecheng").html("");
                    teacherJson.forEach(function (s) {
                        $("#kecheng").append(
                            ' <option value="' + s.name + '">' + s.name + "</option>"
                        );
                    });
                    $("#myModal2").modal("show");
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("XMLHttpRequest", XMLHttpRequest);
                    console.log("textStatus", textStatus);
                    console.log("errorThrown", errorThrown);
                }
            });

            // teacherJson = JSON.parse(decrypt(teacherResult));
            // $("#kecheng").html('');
            // teacherJson.forEach(s => {
            //   $("#kecheng").append(' <option value="' + s.name + '">' + s.name + '</option>');
            // });
            // $("#myModal2").modal("show");
        }
    }
}

function doLogin() {
    var students = new Array();
    var all = teacherJson
        .find(s => s.name == $("#kecheng").val())
        .students.sort(function (a, b) {
            return a.card_number > b.card_number ? 1 : -1;
        });
    for (var i = 0; i < all.length; i++) {
        var st = all[i];
        if (i == 0 || st.card_number != all[i - 1].card_number) {
            students.push(st);
        }
    }
    userObj = JSON.stringify({
        id: $("#user").val(),
        name: $("#user").val(),
        students: students.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        })
    });
    console.log("students", students);
    sessionStorage.setItem("user", userObj);
    window.location.href = "/html/home.html?sysid=1";
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

function encrypt(word) {
    var nonce = randomString();
    // var key = CryptoJS.enc.Utf8.parse("1234567890000000"); //16位
    // var iv = CryptoJS.enc.Utf8.parse("1234567890000000");
    console.log("nonce", nonce);
    var key = "";
    var iv = "";
    var mkey = CryptoJS.MD5(API_KEY + nonce)
        .toString()
        .split("")
        .reverse();
    var mIv = CryptoJS.MD5(nonce + SECRET_KEY)
        .toString()
        .split("")
        .reverse();
    for (var i = 0; i < mkey.length; i = i + 2) {
        key += mkey[i];
        iv += mIv[i];
    }
    console.log(key + "__" + iv);
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);
    console.log("key:" + key);
    console.log("iv:" + iv);

    var encrypted = "";
    if (typeof word == "string") {
        var srcs = CryptoJS.enc.Utf8.parse(word);
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
    } else if (typeof word == "object") {
        //对象格式的转成json字符串
        data = JSON.stringify(word);
        var srcs = CryptoJS.enc.Utf8.parse(data);
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
    }
    var encrypt_msg = encrypted.ciphertext.toString();
    var msg_signature = CryptoJS.SHA1(
        [nonce, encrypt_msg, API_KEY].sort().join("")
    )
        .toString()
        .toLocaleUpperCase();
    console.log("msg_signature", msg_signature);
    return {
        API_KEY: API_KEY,
        SECRET_KEY: SECRET_KEY,
        nonce: nonce,
        encrypt_msg: encrypt_msg,
        msg_signature: msg_signature
    };
}

// aes解密
function decrypt(result) {
    var nonce = result.nonce;
    var key = "";
    var iv = "";
    var mkey = CryptoJS.MD5(API_KEY + nonce)
        .toString()
        .split("")
        .reverse();
    var mIv = CryptoJS.MD5(nonce + SECRET_KEY)
        .toString()
        .split("")
        .reverse();
    for (var i = 0; i < mkey.length; i = i + 2) {
        key += mkey[i];
        iv += mIv[i];
    }
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);
    // var key = CryptoJS.enc.Utf8.parse("1234567890000000"); //16位
    // var iv = CryptoJS.enc.Utf8.parse("1234567890000000");
    var encryptedHexStr = CryptoJS.enc.Hex.parse(result.encrypt_msg);
    var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}