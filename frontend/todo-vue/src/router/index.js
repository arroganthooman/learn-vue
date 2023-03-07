import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: import('../pages/Todo.vue')
    },
    {
        path: '/archive',
        name: 'Archive',
        component: import('../pages/Archive.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router