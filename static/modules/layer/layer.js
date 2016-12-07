  //引入css
    // require('modules/layer/layer.css')
    //定义视图类
    //得到窗口的高以便在上模板样式的时候使用
    var h=$(window).height();
    var layer=Backbone.View.extend({
        //颜色数组
        colorArry:['#fe0000','white','purple','green','blue','#7b1dda','#bc4fce','#ef8d44','#d71a78','#b01efd','#d71a3b','#e81010','#89c15a','#fd7331','#448aff','#dd4e42'],
        //当前图片的id
        imgId:0,
       //定义一个数组容器来存储图片
         imgList:[],
        //用events进行事件绑定
        events:{
            'tap .layer-container img':'toggleTitle',
            // 给图片绑定滑动事件
            // 向左滑，显示后一张图片
            'swipeLeft .layer-container img': 'showNextImage',
            // 向右滑，显示前一张图片
            'swipeRight .layer-container img': 'showPreImage',
            // 点击返回按钮
            'tap .layer .go-back': 'goBack',
            'tap .layer .go-next':'goNext'
        },
       //定义模板
        tpl: _.template($('#tpl_layer').html()),
        //定义render渲染方法
        render:function(routeId){
            var model=this.collection.get(routeId);
            //判断如果模型不存在要进行跳转到列表页
            if(!model){
                location.href='';
                return;
            }
            //如果存在则要把当前图片的id改为对应图片的id
            this.imgId=model.get('id');//这样就进行一一对应
            //并且往数组图片容器中push当前图片的id
            this.imgList.push(this.imgId);
            //根据模板进行数据的定义
            var data={
                url:model.get('url'),
                title:model.get('title'),
                //自定义样式这样可以渲染页面时按其定义样式自动进行
                style:'line-height:'+h+'px'
            }
            //格式模板数据
            var html=this.tpl(data);
            //渲染视图
            this.$el.find('.layer').html(html);
            //console.log(111)
        },
        colorchange:function(){
            var self=this
            var nowcolor;
            setInterval(function(){
                nowcolor=self.colorArry[parseInt(Math.random()*self.colorArry.length)];
            },10)
            setTimeout(function(){
                self.$el.find('.layer h1')[0].style.color=nowcolor;
                //得到数组
                //console.log(this.$el.find('.layer .header .arrow1,arrow2'))
                self.$el.find('.layer .header .arrow1')[0].style.backgroundColor=nowcolor;
                self.$el.find('.layer .header .arrow2')[0].style.backgroundColor=nowcolor;
                self.$el.find('.layer .go-next .arrow1')[0].style.backgroundColor=nowcolor;
                self.$el.find('.layer .go-next .arrow2')[0].style.backgroundColor=nowcolor;
            },10)

        },
        toggleTitle:function(){
            this.colorchange()
            this.$el.find('.layer .header').toggleClass('hide');
            //console.log(this.$el.find('.layer h1'))//得到的维数组

        },
        showNextImage:function(){
            this.colorchange()
            //图片的id进行++
            this.imgId++;
            var model = this.collection.get(this.imgId);
            // 如果获取不到模型说明是最后一张了，提示
            if (!model) {
                alert('谢谢看完我所有图片！');
                // 并且将imgId重置成当前id
                this.imgId--;
            } else {
                // 更新页面
                this.updateView(model)
                this.leftMove();
                // 缓存图片的id
                this.imgList.push(this.imgId)
            }

        },
        //显示上一张
        showPreImage:function(){
            this.colorchange();
            //图片的id进行--
            this.imgId--;
            //得到模型
            var model=this.collection.get(this.imgId);
            if(!model){
                alert('已近是第一张了!回去再看看其他美图吧!');
                //将imgId++重置回来
                this.imgId++;
            }else{
                this.updateView(model);
                this.rightMove();
                //将图片的id缓存在imgList中
                this.imgList.push(this.imgId);
            }
        },
        //go-back返回上一页
        goBack:function(){
            //第一种方法直接返回
            //location.href='';
            //第二种返回上一次浏览的大图页如果图片数组中没有图片则就返回首页
            //每点击一次返回按钮则就在图片数组中删除一个
            this.imgList.pop();
            if(this.imgList.length){
                //id则就变为图片数组中的最后一张
                var id=this.imgList[this.imgList.length-1];
                var model=this.collection.get(id);
                //渲染
                this.updateView(model);
                this.leftMove();
            }else{
                //返回列表页
                location.href='';
            }
           this.colorchange();
        },
        goNext:function(){

            this.showNextImage();
            this.rightMove();

        },
        //定义updateView
        updateView:function(model){
            //图片换地址
            //console.log(this.$el.find('.layer-container img'));
            //得到的是数组对象其原型上具有对dom元素操作的方法所以可以直接调用其方法
            //如果要设置dom元素的css属性值时则要通过调用数组的第一项

            this.$el.find('.layer-container img').attr('src',model.get('url'));
            //换标题
            this.$el.find('.layer h1').html(model.get('title'));
        },
        leftMove:function(){
            $('.layer-container img').css('left','100%');

            $('.layer-container img').stop(true).animate({'left':0},600,'easeOutSine');

        },
        rightMove:function(){
            $('.layer-container img').css('left','-100%');

            $('.layer-container img').stop(true).animate({'left':0},600,'easeOutSine');

        }
    })
    module.exports=layer