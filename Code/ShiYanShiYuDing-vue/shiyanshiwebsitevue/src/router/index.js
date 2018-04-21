import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        }
    ]
})