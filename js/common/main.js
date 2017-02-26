requirejs.config({
    baseUrl:'/',
    paths:{
        //第三方库的路径配置
        jquery: 'lib/jquery/jquery.min',
        bootstrap:'lib/bootstrap/js/bootstrap.min',

        // 自己写的路径配置
        userList:'js/user/list',
        userProfile: 'js/user/profile',
        common:'js/common/common'
    },
    shim:{
        bootstrap:{
            deps:['jquery']
        }
    }
});

//所有的页面都需要这两个js，先加载他们。
require(['jquery','bootstrap','common']);

(function(window){
    var pathname = window.location.pathname;
    switch (pathname){
        case '/html/user/list.html':
            require(['userList']);
            break;
        case '/html/user/profile.html':
            require(['userProfile']);
            break;
    }
})(window);



