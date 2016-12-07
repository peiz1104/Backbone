   var list=Backbone.View.extend({
        //通过events添加事件
        events:{
            'tap .go-top':'goTop',
            'tap .search span':'showSearchView',
            'tap .type li':'searchAbout',
            'tap .list .go-back':'showhome',
            'tap .list .go-main':'showhome'
        },
       //定义模板
        tpl: _.template('<a href="#layer/<%=id%>"><img style="<%=style%>" src="<%=url%>" alt="" /></a>'),
        //定义两个变量以后通过比较哪个盒子的高度低就往那个盒子中添加图片
        leftHeight:0,
        rightHeight:0,
        initialize:function(){
            //初始化dom元素
            this.initDOM();
            //得到数据
            this.getData();
            //在构造函数中进行监听集合的add事件；得到model实例化对象进行渲染
            //this.collection.on('add',function(model,collection){})
            //此方法的函数作用域为集合collection实例化对象；所以在后面的使用不方便
            //所以用listenTo进行事件监听
            this.listenTo(this.collection,'add',function(model,collection){
                //此时作用域为list实例化对象
                this.render(model);
            })
            var self=this;
            //var result = this.collection.filter(function(model,index,models){
            //     return model.get('type')==id
            // })
            //定义window滚动事件
            $(window).on('scroll',function(){

                //var type=self.collection.models[id].get('type')

                //body的高度
                //窗口的卷动$(window).scrollTop()
                //窗口的高$(window).height()
                //判断
                if($('body').height()<$(window).scrollTop()+$(window).height()+400){

                        self.getData();
                }
                self.showgoTop();
            })
        },
        showhome:function(){
            this.$el.find('.list .home').fadeToggle()

            //this.$el.find('.layer .header').toggleClass('hide')
        },
        //showgoTop方法
        showgoTop:function(){
            if($(window).scrollTop()>310){
                this.$el.find('.go-top').show();
                this.$el.find('.go-top').css('z-index',13)
            }else{
                this.$el.find('.go-top').hide();
                 this.$el.find('.go-top').css('z-index',0)
            }
        },
        //定义回到顶部函数
        goTop:function(){
          window.scrollTo(0,0);
        },

        //对input里得到内容的合法性进行判断
        checkinput:function(val){
            if(/^\s*\s$/.test(val)){
                alert('请输入真确内容！！')
                return false;
            }else{
                return true;
            }
        },
        //定义FilterBykey
        FilterBykey:function(value,type){
          //得到的是返回实例化对象
           return this.collection.filter(function(model,index,models){
               if(type==='type'){
                   return model.get('type')==value;
                   //这儿要做值类型的判断不是做的类型的判断；若果做类型的判断就要加+
               }
               //console.log(model)
                return model.get('title').indexOf(value)>-1
            })
        },
        //定义删除页面的方法
        clearview:function(){
            this.leftContainer.html('');
            this.rightContainer.html('');
            this.leftHeight=0;
            this.rightHeight=0;
        },
        //重新渲染方法
        resetrender:function(result){
            //遍历result里面的每一个实例化对象对其进行渲染
            for(var i=0;i<result.length;i++){
                this.render(result[i]);
            }
            //console.log(result);
        },
        //定义搜索方法
        showSearchView:function(){
            //得到搜索框的内容
            var inputval=this.$el.find('.search input').val();
            //console.log(inputval);
            //调用检查的方法
            if(!this.checkinput(inputval)){
                return;
                //输入内容不符合要求停止操作业务
            }
            //否则的话去掉空白
            value=inputval.replace(/^\s+|\s+$/g,'');
            //用得到的值进行过滤得到实例化对象再进行页面的渲染
            var result=this.FilterBykey(value);
            //再进行页面渲染前要进行删除容器及高度
            this.clearview()
            //重新渲染页面
            this.resetrender(result);
            //console.log(13)
        },
        //得到数据
        getData: function () {
            // 通过集合拉去
            this.collection.fetchData();
        },
        //得到dom的函数
        initDOM:function(){
            this.leftContainer=this.$el.find('.left-container');
            this.rightContainer=this.$el.find('.right-container');
        },
        //render方法
        render:function(model){
            var height=model.get('viewheight');
            //获取data
            var data={
                //因为在图片集合中给其设置了一个id属性让其与图片名一一对应
                 id:model.get('id'),
                 url:model.get('url'),
                style: 'width: ' + model.get('viewwidth') + 'px;height: ' + height + 'px;'
            }
            //获取模板
            var tpl=this.tpl;
            //格式化模板
            var html=tpl(data);
            //console.log(html)
            //进行渲染页面此时要进行判断
            //如果左边的盒子高度低则就添加到左边反之添加到右边
            if(this.rightHeight<this.leftHeight){
                //就调用renderRight方法
                this.renderRight(html,height);
            }else{
                this.renderLeft(html,height);
            }
        },
        //定义renderRight方法
        renderRight:function(html,height){
            this.$el.find('.right-container').append(html);
            this.rightHeight+=height+6;
        },
        //定义renderLeft方法
        renderLeft:function(html,height){
            this.$el.find('.left-container').append(html);
            this.leftHeight+=height+6;
        },
        //点击显示相应的图片
        searchAbout:function(e){
            //de到li上的data-id属性
            //console.log(e.target);
            var id=$(e.target).attr('data-id');
            //console.log(id);
            //得到model数组
           var result= this.FilterBykey(id,'type');
            //清屏
            this.clearview();
            //重绘
            this.resetrender(result);
        }
        //将有些过程定义为方法这样就可以被复用；便于使用和代码的维护
    })
    module.exports=list;