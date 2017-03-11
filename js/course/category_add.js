define(['jquery','common','nprogress','util','template'], function ($,undefined,nprogress,util,template) {
    //该页面所有的js加载完毕，进度条结束
    nprogress.done();

    //课程分类管理
    function categoryManage(){
        this.cg_id = util.getQueryString('cg_id') //要编辑的ID，添加的话则没有
        this.isEdit = !!this.cg_id;  //用来判断当前是不是编辑页面
        this.selectorTpl = 'category-list-tpl'       // 模板ID
        this.selectorTplParent = '.course-category'   //未来模板的坑选择器
        this.selectorform = '#category-manage-form'; //form表单选择器
        this.getCategoryEdiUrl = '/v6/category/edit'; //获取课程分类信息
        this.submitUrl = this.isEdit? '/v6/category/modify':'/v6/category/add' //表单提交的url
        //判断当前有没有cg_id如果有的话，就修改，没有就添加


        this.init();
    }

    categoryManage.prototype={
        //初始化页面  ==> 获取渲染数据 ==> 渲染页面 ==>监听表单提交事件
        init: function () {
            var self = this;
            this.getRenderDate(function (data) {
                self.render(data);
                self.onSubmit();
            })
        },
        //获取模板所需数据，因为涉及到异步获取数据，所以需要一个回调函数来接收
        getRenderDate: function (fn) {
            if(this.isEdit){
                $.get(this.getCategoryEdiUrl,{cg_id: this.cg_id}, function (data) {
                    if(data.code == 200){
                        fn(data.result);
                    }
                })
            }else{
                fn({});
            }
        },

        //渲染模板到页面
        render: function (data) {
            $(this.selectorTplParent).html(template(this.selectorTpl,data   ))
        },
        //获取表单提交的数据
        getSubmitData: function () {
            return this.isEdit? ($(this.selectorform).serialize() + '&cg_id=' +this.cg_id):$(this.selectorform).serialize();
        },

        //监听页面submit事件，转为ajax方式提交数据
        onSubmit: function () {

            var self = this;
            $(this.selectorform).on('submit', function () {

                $.ajax({
                    url:self.submitUrl,
                    type:'post',
                    data:self.getSubmitData(),
                    success: function (data) {
                        if(data.code == 200){
                            location.href = '/html/course/category.html'
                        }
                    }
                })
                return false;
            })
        }
    }

    //创建实例，会自动调用初始化方法。
    new categoryManage();


})