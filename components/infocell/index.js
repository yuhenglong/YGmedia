// components/infocell/indx.js
Component({
  properties:{
    title:{
      type:String,
      value:''
    },
    desc:{
      type:String,
      value:''
    }
  },
  /**
   * 页面的初始数据
   */
  data: {

  },
  methods:{
    popView:function(){
      // 注册事件
      this.triggerEvent("popView");
    }
  }
 
})