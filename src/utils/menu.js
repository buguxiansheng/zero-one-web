const formateRoutes = function (menuList) {
    menuList.forEach((item) => {
        //不存在
        if (!item.childMenus) {
            var path = item.path;
            let route = {
                path: item.path,
                name: item.path,
                component: () =>
                    // 动态导入  截取字符串的一部分 给出View名
                    import(`@/views/modules/sys${path}.vue`),
            };
            this.dynamicRoute.push(route);
        } else {
            this.formateRoutes(item.childMenus);
        }
    });
}

export default formateRoutes