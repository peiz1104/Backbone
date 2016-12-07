 var Imgmodule = require('../model/img');
    //创建集合类
    var imgCollection=Backbone.Collection.extend({
        model:Imgmodule,
        //图片模型中存储一个id
        imgid:0,
        //m:13,
        //定义一个获取数据的方法
        fetchData:function(){
            //用Ajax请求数据
            //备份this
            var self=this;
            $.get('data/imageList.json',function(res){
                if(res && res.errno===0){
                    //将顺序进行打乱用sort方法
                    res.data.sort(function(){
                        return Math.random()>0.5 ? 1 : -1;
                    })
                    //进行遍历每一个
                    for(var i=0;i<res.data.length;i++){
                        //self.m++
                        //设置在集合类中的属性会添加得到原型上如果此属性是运算后的；此时也会添加到实例化对象身上
                        //给每一个图片赋值id这样每一张图片的id与图片名数字对应
                        res.data[i].id=++self.imgid
                    }
                    //将数据添加到集合实例化对象中
                    //这就相当于实例化对象的时候传的参数
                    self.add(res.data);
                    //console.log(new Imgmodule(res.data))//输出模型实例化对象
                    //这时add传递的参数就会以集合类中的model属性中的模块模型进行创建集合参数为new集合类是传递的参数
                    //或add添加的时候传递的参数
                }
            })
        }
    })
    //实例化集合类
    //var ImgCollction=new imgCollection();
    // ImgCollction.fetchData()
    //setTimeout(function(){
    //    console.log(ImgCollction);
    //})
    //向外暴露集合实例化模型
    module.exports=imgCollection;