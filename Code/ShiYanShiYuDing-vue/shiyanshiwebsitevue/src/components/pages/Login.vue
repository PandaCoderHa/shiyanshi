<template>
<div>
    <div class="  app-header-fixed modal-over bg-black">
        <div class="container w-xxl w-auto-xs sy-login sy-login-mobie ">
            <div class="m-b-lg">
                <b-alert show variant="danger" :show="showAlert">{{messge}}</b-alert>

                <div class="wrapper text-center">
                    <strong>创新实践共享平台在线监控及评测平台</strong>
                </div>
                <ul class="loginNav">
                    <li onclick="navChange(this, 1);" class="active">
                        <span>帐号登录</span>
                    </li>
                </ul>

                <div name="form" class="form-validation  box-login">
                    <div class="list-group list-group-sm">
                        <div class="list-group-item">
                            <input id="user" type="email" v-model:vlue="user" placeholder="请输入工号/学号" class="form-control no-border" ng-model="user.email" required>
                        </div>
                        <div class="list-group-item">
                            <input id="password" type="password" placeholder="密码" v-model="password" class="form-control no-border" ng-model="user.password" required>
                        </div>
                    </div>
                    <a id="login" href="#" @click="login()" class="btn btn-lg btn-primary btn-block">登录</a>

                </div>
            </div>
        </div>
    </div>
    <!-- Modal Component -->
    <b-modal v-model="dialogVisible" centered title="实验室详情">
        选择课程：<select id="kecheng"></select>
        <div slot="modal-footer">
            <button type="button" onclick="doLogin()" class="btn btn-primary">确定</button>
        </div>

    </b-modal>
    <!-- <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      
    </div> -->

</div>
</template>

<script>
import CryptoJS from "crypto-js/crypto-js";
export default {
    name: "Login",
    data() {
        return {
            title: "创新实践共享平台在线监控及评测平台",
            user: "20161329",
            password: "20161329",
            dialogVisible: false,
            showAlert: false,
            messge: "",
            API_KEY: "dMSHsWKy",
            SECRET_KEY: "nSemlZ2e7EVZAkROr5x44pMUkEbqKAlMIlJ2GdW0olrA2D4mwvRgLuZssy97AUByVYU",
            baseApi: "http://xiaosiapi.mindaxiaosi.com/api/process/aponitment",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        };
    },
    methods: {
        showAlertMessage(msg) {
            this.messge = msg;
            this.showAlert = true;
        },
        login() {
            console.log("CryptoJS", CryptoJS);
            if (!this.user) {
                this.showAlertMessage("请输入工号");
                return;
            }
            if (!this.password) {
                this.showAlertMessage("请输入密码");
                return;
            }

            //var user = $("#user").val();
            var userObj = JSON.stringify({
                id: this.user,
                name: this.user
            });
            console.log(this.axios);
            if (this.user) {
                if (this.user == "admin") {
                    if (
                        CryptoJS.MD5(this.password).toString() ==
                        "c93ccd78b2076528346216b3b2f701e6"
                    ) {
                        sessionStorage.setItem("user", userObj);
                        window.location.href = "/html/jiaoshi-manager.html";
                    } else {
                        this.showAlertMessage("账号或密码错误。");
                    }
                } else if (this.user.length == 10) {
                    var encryptObj = this.encrypt({
                        t_uid: this.user,
                        passwd: this.password
                    });
                    this.axios
                        .post(
                            this.baseApi +
                            "?nonce=" +
                            encryptObj.nonce +
                            "&msg_signature=" +
                            encryptObj.msg_signature, {
                                encrypt_msg: encryptObj.encrypt_msg,
                                api_key: encryptObj.API_KEY
                            },
                            (headers = this.headers)
                        )
                        .then(response => {
                            if (response && response.errcode && response.errcode == 2) {
                                this.showAlertMessage("账号或密码错误。");
                                return;
                            }
                            if (response) {
                                studentJson = JSON.parse(this.decrypt(response));
                                console.log(studentJson);
                                if (studentJson && studentJson.message) {
                                    userObj = JSON.parse(userObj);
                                    userObj.classes = studentJson.classes;
                                    userObj.name = studentJson.name;
                                    sessionStorage.setItem("user", JSON.stringify(userObj));
                                    window.location.href = "/html/home.html?sysid=1";
                                }
                                this.dialogVisible = true;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else if (this.user.length == 8) {
                    var encryptObj = this.encrypt({
                        t_uid: this.user,
                        passwd: this.password
                    });
                    this.axios
                        .post(
                            this.baseApi + "?nonce=" + encryptObj.nonce + "&msg_signature=" + encryptObj.msg_signature, {
                                encrypt_msg: encryptObj.encrypt_msg,
                                api_key: encryptObj.API_KEY
                            }, {
                                headers: this.headers
                            }
                        )
                        .then(response => {
                            if (response && response.errcode && response.errcode == 2) {
                                this.showAlertMessage("账号或密码错误。");
                                return;
                            }
                            teacherJson = JSON.parse(this.decrypt(response));
                            console.log(teacherJson);
                            // $("#kecheng").html("");
                            // teacherJson.forEach(function (s) {
                            //     $("#kecheng").append(
                            //         ' <option value="' + s.name + '">' + s.name + "</option>"
                            //     );
                            // });
                            this.dialogVisible = true;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
        },
        handleClose() {
            //this.$router.push({path:'/home'});
        },
        close() {
            this.$router.push({
                path: "/home"
            });
        },

        encrypt(word) {
            var nonce = this.randomString();
            // var key = CryptoJS.enc.Utf8.parse("1234567890000000"); //16位
            // var iv = CryptoJS.enc.Utf8.parse("1234567890000000");
            console.log("nonce", nonce);
            var key = "";
            var iv = "";
            var mkey = CryptoJS.MD5(this.API_KEY + nonce)
                .toString()
                .split("")
                .reverse();
            var mIv = CryptoJS.MD5(nonce + this.SECRET_KEY)
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
                var data = JSON.stringify(word);
                var srcs = CryptoJS.enc.Utf8.parse(data);
                encrypted = CryptoJS.AES.encrypt(srcs, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.ZeroPadding
                });
            }
            var encrypt_msg = encrypted.ciphertext.toString();
            var msg_signature = CryptoJS.SHA1(
                    [nonce, encrypt_msg, this.API_KEY].sort().join("")
                )
                .toString()
                .toLocaleUpperCase();
            console.log("msg_signature", msg_signature);
            return {
                API_KEY: this.API_KEY,
                SECRET_KEY: this.SECRET_KEY,
                nonce: nonce,
                encrypt_msg: encrypt_msg,
                msg_signature: msg_signature
            };
        },

        // aes解密
        decrypt(result) {
            var nonce = result.nonce;
            var key = "";
            var iv = "";
            var mkey = CryptoJS.MD5(this.API_KEY + nonce)
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
        },
        randomString(len) {
            len = len || 32;
            var $chars =
                "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            var maxPos = $chars.length;
            var pwd = "";
            for (var i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        }
    }
};
</script>

<style scoped>

</style>
