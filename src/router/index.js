import Vue from "vue";
import VueRouter from "vue-router";
// import Main from "../views/Main.vue";


Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {

return originalPush.call(this, location).catch(err => err)

}

const routes = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  }
  , {
    path: "/Error",
    name: "Error",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Error.vue")
  },
  // {
  //   path:"/main",
  //   name:"Main",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Main.vue")
  // }
]

const router = new VueRouter({
  routes
})

const dynamicRoute = []

var formateRoutes = function (menuList) {
  menuList.forEach((item) => {
    //不存在
    if (!item.childMenus || item.childMenus.length === 0) {
      var path = item.path;
      let route = {
        path: item.path,
        name: item.path,
        component: () =>
          // 动态导入  截取字符串的一部分 给出View名
          import(`@/views/modules/sys${path}.vue`),
      };
      dynamicRoute.push(route);
    } else {
      formateRoutes(item.childMenus);
    }
  })
}

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == "/") {
    next()
  } else {
    // 已登录 判断是刷新操作
    if (sessionStorage.getItem("token") ) {
      
      if(sessionStorage.getItem("refresh") === "refresh"){
        console.log('刷新操作')
        var menuList =JSON.parse( sessionStorage.getItem("menuList"))
        formateRoutes(menuList)
        router.addRoutes([
          {
            name: "Main",
            path: "/main",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/Main.vue"
              ),
            children: dynamicRoute,
          },
        ])
        sessionStorage.setItem("refresh","null")
        // 让动态路由加载完成
        next({ ...to, replace: true })
      }else{
        next()
      }   
    } else {
      next("/")
    }
  }
})

export default router;
