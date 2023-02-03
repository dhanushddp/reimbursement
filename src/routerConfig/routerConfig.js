import VueRouter from "vue-router";
import employeePortal from '../components/employeePortal.vue'
import managerPortal from '../components/managerPortal.vue'
import financePortal from '../components/financePortal.vue'
import directorPortal from '../components/directorPortal.vue'
import presidentPortal from '../components/presidentPortal.vue'

import loginComponent from "../components/loginComponent.vue";

let routes = [{
    path:'/login',
    name:"loginComponent",
    component:loginComponent
},
{
    path:'/',
    name:"loginComponent",
    component:loginComponent
},
{
    path:'/employeePortal',
    name:'employeePortal',
    component:employeePortal
},
{
    path:'/managerPortal',
    name:'managerPortal',
    component:managerPortal
},
{
    path:'/financePortal',
    name:'financePortal',
    component:financePortal
},
{
    path:'/directorPortal',
    name:'directorPortal',
    component:directorPortal
},
{
    path:'/presidentPortal',
    name:'presidentPortal',
    component:presidentPortal
}

]

const router = new VueRouter(
    {
        mode:"history",
        routes
    }
)
export default router
