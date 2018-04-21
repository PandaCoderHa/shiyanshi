<template>
<!-- <el-main>
    <el-row :gutter="20">
        <el-col :span="6">
            <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6" :offset="6">
            <div class="grid-content bg-purple"></div>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="6" :offset="6">
            <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6" :offset="6">
            <div class="grid-content bg-purple"></div>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12" :offset="6">
            <div class="grid-content bg-purple"></div>
        </el-col>
    </el-row>
</el-main> -->
<div>
    <div class="  app-header-fixed modal-over bg-black">
        <div class="container w-xxl w-auto-xs sy-login sy-login-mobie ">
            <div class="m-b-lg">
                <div class="wrapper text-center">
                    <strong>{{title}}</strong>
                </div>
                <div name="form" class="form-validation  box-login">

                    <div class="list-group list-group-sm">
                        <div class="list-group-item">
                            <el-input v-model="user" size="mini" placeholder="请输入工号/学号" class="form-control no-border"></el-input>
                        </div>
                        <div class="list-group-item">
                            <el-input v-model="password" size="mini" type="password" placeholder="密码"></el-input>
                        </div>
                        <div class="list-group-item">
                            <el-button type="primary" @click="login()" size="mini">登录</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
    <el-dialog title="选择课程" @close="close()" :visible.sync="dialogVisible" width="30%" :before-close="handleClose()">
        <div class="table-responsive">
            <table class="table table-striped b-light">
                <thead>
                    <tr>
                        <td>
                            选择课程：
                        </td>
                        <td>
                            <select id="kecheng"></select>
                        </td>
                    </tr>
                </thead>
                <tbody id="M_tbody">

                </tbody>
            </table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary"  @click="dialogVisible = false">确定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            title: "创新实践共享平台在线监控及评测平台",
            user: "20161329",
            password: "20161329",
            dialogVisible: false
        };
    },
    methods: {
        login() {
            console.log(this.dialogVisible);
            this.dialogVisible = !this.dialogVisible;
        },
        handleClose() {
            //this.$router.push({path:'/home'});
        },
        close() {
            this.$router.push({
                path: "/home"
            });
        }
    }
};
</script>

<style scoped>

</style>
