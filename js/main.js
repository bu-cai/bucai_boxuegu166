requirejs.config({
    baseUrl:'/',
    paths:{
        //���������·������
        jquery: 'lib/jquery/jquery.min',
        bootstrap:'lib/bootstrap/js/bootstrap.min',

        // �Լ�д��·������
        userList:'js/uers/list',
        userProfile: 'js/user/profile'
    },
});

//���е�ҳ�涼��Ҫ������js���ȼ������ǡ�
require(['jquery','bootstrap']);

(function(window){
    var pathname = window.location.pathname;
    if(pathname === '/html/user/list.html'){
        require(['userList']);
    }else if(pathname === '/html/user/profile.html'){
        require(['userProfile']);
    }

})(window);




