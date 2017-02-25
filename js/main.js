requirejs.config({
    baseUrl:'/',
    paths:{
        //第三方库的路径配置
        jquery: 'lib/jquery/jquery.min',
        bootstrap:'lib/bootstrap/js/bootstrap.min',

        // 自己写的路径配置
        userList:'js/uers/list',
        userProfile: 'js/user/profile'
    },
});

//所有的页面都需要这两个js，先加载他们。
require(['jquery','bootstrap']);

(function(window){
    var pathname = window.location.pathname;
    if(pathname === '/html/user/list.html'){
        require(['userList']);
    }else if(pathname === '/html/user/profile.html'){
        require(['userProfile']);
    }

})(window);




