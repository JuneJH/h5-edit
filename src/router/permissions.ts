import { RouteRecordRaw } from 'vue-router';
import Layout from '../layouts/index.vue';
import Home from '../pages/index.vue';
import About from '../pages/about/index.vue';
import Edit from '../pages/edit/index.vue';

const permissions: RouteRecordRaw[] = [
    {
        path: "/",
        component: Layout,
        redirect:"/home",
        children: [
            {
                path:"/home",
                component:Home
            },
            {
                path: "/edit",
                component: Edit
            }
        ]
    }
];


export default permissions;