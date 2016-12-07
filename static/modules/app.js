//在视图中引入图片集合这样在newlist视图类与newlayer视图类的时候传入图片集合类
    //方便在layer.js中与list.js中调用
    var imgColl = require('collection/collection');
    var layer=require('layer/layer');
    var list=require('list/list');
    //new图片集合
    var imageCollection=new imgColl;
    //console.log(imageCollection);输出集合实例化对象

    //var homev=new home({
    //    el:$('#app'),
    //    collection:imageCollection
    //})
    var layerv=new layer({
        el:$('#app'),
        collection:imageCollection
    })
    var listv=new list({
        el:$('#app'),
        collection:imageCollection
    })
    var Router=Backbone.Router.extend({
        routes:{
            'layer/:num':'showlayer',
            '*other':'showlist'
        },
        showlist:function(){
            //listv.render(query,num)
            layerv.$el.find('.layer').hide()
        },
        showlayer:function(num){
            layerv.render(num)
            layerv.$el.find('.layer').show()
        }
    })
    //实例化路由
    var router=new Router();
    //console.log(layerv)输出视图实例化对象
    module.exports=function(){
        console.log("success")
        //启动路由
        Backbone.history.start();
    }