import {createRouter, createWebHistory} from 'vue-router';

// import views
import Home from '../views/Home.vue';
import About from '../views/About.vue';

const routes = [
    {path:'/', redirect:'/home'},
    { path: '/home', component: Home, name: 'home-page' },
    {path:'/about',component:About,name:'about-page'}
    
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes,
    
    

})

export default router;