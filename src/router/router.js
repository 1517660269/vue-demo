import VueRouter from 'vue-router';
import Index from "../components/Index";
import Vue from "vue";
import axios from "axios";
import store from "@/store/store";
import Aside from "@/components/Aside.vue";
import Login from "@/components/Login.vue";

const routes = [
    //一级路由
    {
        path: '/index',
        name: 'index',
        component: Index,
        redirect: '/main',
        children: [
            {
                path: '/main',
                name: '首页',
                component: () => import('../components/Main.vue')
            }
        ]
    },
    {
        path: '/aside',
        name: 'aside',
        component: Aside
    },
    {
        path: '/',
        name: 'index',
        component: Login
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    next();
    axios.get('/menu').then(res => {
        let isLoadRoute = store.state.isLoadRoute;
        if (!isLoadRoute) {
            store.commit('setMenuData', res.data.menu_data)
            buildRouter();
            store.commit('setLoadRoute', true)
        }
    })
})

let oRouters = router.options.routes;
const buildRouter = () => {
    let data = store.state.menu_data;
    data.forEach(item => {
        let new_route = {
            path: item.path,
            name: item.name,
            component: () => import('../components/' + item.component + '.vue')
        }
        oRouters[0].children.push(new_route)
    })
    router.addRoutes(oRouters)
}

export default router;
