// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray:[],
    totalMoney:'0.00',
    totalCount:0,
    selectAll:false,
    startX:0,
    startY:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let self = this;
    wx.getStorage({
      key:'cartInfo',
      success:function(res){
        const cartArray = res.data;

        cartArray.forEach(cart =>{
          cart.select = false; //全部没有选中
          cart.isTouchMove = true; //是否滑动
        })
        self.setData({
          cartArray,
          selectAll:false,
          totalMoney:"0.00",
          totalCount:0
        })

        // 设置tabbar图标
        cartArray.length > 0? wx.setTabBarBadge({
          index:2,
          text:String(cartArray.lenght)
        }) :wx.removeTabBarBadge({
          index:2
        })
      }
    })
  },
  onGetCount(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    cartArray[index].total = e.detail.val;
    this.setData({
      cartArray
    })
  },
  switchGoodDetail(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    // 页面跳转
    wx.navigateTo({
      url:"/pages/detail/index?id=" + cartArray[index].id
    })
  },
  selectGood(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    
    // 合计和数量
    let totalMoney = Number(this.data.totalMoney);
    let totalCount = this.data.totalCount;

    // 选中状态
    let selectAll = this.

    // 设置选中或不选中状态
    cartArray[index].select = !cartArray[index].select;

    // 如果选中
    if(cartArray[index].select){
      totalMoney += Number(cartArray[index].price) * cartArray[index].total;
      totalCount ++;
    }else{
      // 没有选中
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total;
      totalCount --;

      selectAll = false;
    }
    // 更新数据
    this.setData({
      cartArray,
      totalMoney:String(totalMoney.toFixed(2)),
      totalCount,
      selectAll
    })
  },
  subCount(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    // 合计
    let totalMoney = Number(this.data.totalMoney);
    let totalCount = this.data.totalCount;
    // 选中状态
    let selectAll = this.data.selectAll;

    // 计算金额
    if(cartArray[index].select){
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total;
    }
    // 更新数据
    this.setData({
      totalMoney:String(totalMoney.toFixed(2))
    })
  },
  addCount(){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    let totalMoney = Number(this.data.totalMoney);
    // 计算金额
    if(cartArray[index].select){
      totalMoney += Number(cartArray[index].price) * cartArray[index].total;
    }
    // 更新数据
    this.setData({
      totalMoney:String(totalMoney.toFixed(2))
    })
  },
  selectAll(){
    const cartArray = this.data.cartArray;
    let totalMoney = 0;
    let totalCount = 0;
    let selectAll = this.data.selectAll;
    selectAll = !selectAll;
    cartArray.forEach(cart =>{
      // 设置选中或不选中状态和全选按钮是一样的状态
      cart.select = selectAll;

      // 计算总金额和商品个数
      if(cart.select){
        totalMoney += Number(cart.price) * cart.total;
        totalCount ++;
      }else{
        totalMoney = 0;
        totalCount = 0;
      }
    })

    // 更新数据
    this.setData({
      cartArray,
      totalMoney:String(totalMoney.toFixed(2)),
      totalCount,
      selectAll
    })

  },
  touchstart(e){
    // 开始触摸时，重置所有删除
    this.data.cartArray.forEach(cart =>{
      if(cart.isTouchMove){   //为true的时候 
        cart.isTouchMove = false;
      }
    })
    this.setData({
      startX:e.changedTouches[0].clientX,
      startY:e.changedTouches[0].clientY,
      cartArray:this.data.cartArray
    })
  },
  touchmove(e){
    let index = e.currentTarget.dataset.index;
    // 开始x和y坐标
    let startX = this.data.startX;
    let startY = this.data.startY;

    // 移动的x和y坐标
    let touchMoveX = e.changedTouches[0].clientX,
        touchMoveY = e.changedTouches[0].clientY;
    console.log(touchMoveX);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 更新Storage
    const cartArray = this.data.cartArray
    wx.setStorage({
      key: 'cartInfo',
      data: cartArray
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})