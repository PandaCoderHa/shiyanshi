<template>
   <header id="header" class="app-header navbar" role="menu">
        <div class="navbar navbar-static-top">
            <div class="container">
                <div class="navbar-header bg-dark">
                    <button class="pull-right visible-xs dk" ui-toggle-class="show" target=".navbar-collapse">
                        <i class="glyphicon glyphicon-cog"></i>
                    </button>
                    <button class="pull-right visible-xs" ui-toggle-class="off-screen" target=".app-aside" ui-scroll="app">
                        <i class="glyphicon glyphicon-align-justify"></i>
                    </button>
                    <a href="home.html" class="navbar-brand text-lt">
                        <span class="hidden-folded m-l-xs">高校实验室预约系统</span>
                    </a>
                </div>

                <div class="collapse navbar-collapse pull-left" id="navbar-collapse">

                    <ul class="nav navbar-nav navbar-menu">
                        <li>
                            <a href="jiaoshi-manager.html">
                                <span>实验室管理</span>
                            </a>
                        </li>

                        <li>
                            <a href="ziyuan-list.html">
                                <span>实验室座位管理</span>
                            </a>
                        </li>
                        <li>
                            <a href="yuyue-manager.html">
                                <span>预约记录</span>
                            </a>
                        </li>

                        <li>
                            <a href="yuyue-liucheng.html">
                                <span>预约流程</span>
                            </a>
                        </li>

                    </ul>
                </div>


                <div class="navbar-custom-menu hidden-xs">
                    <ul class="nav navbar-nav">


                        <li class="dropdown">
                            <a href="#" data-toggle="dropdown" class="dropdown-toggle" aria-expanded="false">
                                <i class="fa fa-fw fa-plus visible-xs-inline-block"></i>
                                <span translate="header.navbar.new.NEW">
                                    <img src="img/user.png" class="user-image" alt="User Image"> 个人中心</span>
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" role="menu">

                                <li>
                                    <a href="info-change.html">修改个人资料</a>
                                </li>
                                <li>
                                    <a id="logout" ui-sref="access.signin">退出登录</a>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>


            </div>
        </div>

    </header>
</template>
<script>
export default {
  
}
</script>

