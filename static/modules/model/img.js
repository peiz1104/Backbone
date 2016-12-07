 //定义图片模型
    var w = ($(window).width() - 6 * 3) / 2;

    var imgModel=Backbone.Model.extend({
        initialize:function(obj){
            //得到h
             h=w*(obj.height)/obj.width;
            this.attributes.viewwidth=w;
            this.attributes.viewheight=h;
        }
    });
    //定义集合
    //var imgCollection=Backbone.Collection.extend({
    //    model:imgModel
    //
    //})
    //var obj={
    //    "title": "精彩建筑摄影作品",
    //    "url": "images/01.jpg",
    //    "type": 1,
    //    "width": 640,
    //    "height": 400
    //}
    //var ic=new imgCollection()
    //ic.add(obj)
    //console.log(ic)
    //向外暴露一个图片模型
    //console.log(new imgModel)
    module.exports=imgModel