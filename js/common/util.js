define([],{

    //获取指定的查询字符串
    getQueryString: function (key) {
        //去掉字符串首字母?号
        // slice(1) 提取字符串上的第一个?号
        //提取字符串的某个部分，并以新的字符串返回被提取的部分。
        var search = location.search.slice(1);
        //使用&符号得到每一个key=val
        //split('&') 把字符串分割成字符串数组
        var searchArr = search.split('&');

        var tempArr = null;
        var searchObj = {};

        //遍历数组中的每一个key=val字符串，使用=号劈开
        for (var i = 0; i < searchArr.length; i++) {
            // 然后以key为名，val为值添加到searchObj对象中。

            //tempArr[0]是获取属性值name = tempArr[1];
            // tempArr[0]: tempArr[1];  ==>  name:bucai
            tempArr = searchArr[i].split('=');

            searchObj[ tempArr[0] ] = tempArr[1];
        }
        //有参数返回指定的参数，没有参数则返回全部值
        return arguments.length? searchObj[key]:searchObj;//返回一个对象
    },

    extend: function () {

    }



})

