import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/main",
    name: "Main",
    component: Main
  },
  {
    path: "/home",
    name: "Home",
    component: ()=>{
      import("../views/modules/Home.vue")
    }
  }
];

export const dynamicRoute=[
  {
    path: "/data_manage",
    name: "DataManage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/modules/sys/DataManage.vue")
  },
  {
    path: "/group_manage",
    name: "GroupManage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/modules/sys/GroupManage.vue")
  },
  {
    path: "/model_group_manage",
    name: "ModelGroupManage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */"../views/modules/sys/ModelGroupManage.vue")
  },
  {
    path: "/model_manage",
    name: "ModelManage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/modules/sys/ModelManage.vue")
  },
  {
    path: "/order_manage",
    name: "OrderManage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/modules/sys/OrderManage.vue")
  },
  {
    path: "/user_manage",
    name: "UserManage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/modules/sys/UserManage.vue")
  },
  {
    path: "/"
  },
  {
    path: "/settings",
    name: "Settings",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/modules/settings/Settings.vue")
  }
]

const router = new VueRouter({
  routes
});


router.beforeEach((to,from,next)=>{
  if(to.path=="/"){
    next();
  }else{
    if(sessionStorage.getItem("token")){
      next();
    }else{
      next("/") 
    }
  }
})

export default router;
