import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Grid from '../components/Grid/Index.vue';
Vue.use(VueRouter);

const routes = [
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
];
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});
export default router;
//# sourceMappingURL=index.js.map