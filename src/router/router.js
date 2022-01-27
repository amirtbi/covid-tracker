import {createRouter, createWebHistory} from 'vue-router';

// import views
import Home from '../views/Home.vue';

const routes = [
    {path:'/', redirect:'/home'},
    {path:'/home', component:Home, name:'home-page'}
    
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes,
    
    

})

export default router;