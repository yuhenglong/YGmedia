const interfaces = require("../../utils/urlConfig.js")

// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    partData:{},
    baitiao:[],
    baitiaoSelectItem:{
      desc:'[白条支付] 首单享立减优惠'
    },
    hideBaitiao:true,
    hideBuy:true,
    badgeCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id;
    const self = this;
    wx.showLoading({
      title:"加载中..."
    })
    wx.request({
      url:interfaces.productionDetail,
      success(res){
        
        let result = null;
        res.data.forEach(data =>{
          if(data.partData.id == id){
            result = data;
          }
        })

        self.setData({
          partData:result.partData,
          baitiao:result.baitiao
        })

        wx.hideLoading();
      }
    })
  },
  onShow:function(){
    const self = this;
    wx.getStorage({
      key: 'cartInfo',
      success:function(res){
        const cartArray = res.data;
        self.setBadge(cartArray);
      }
    })
  },
  showCartView(){
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },
  popBaitiaoView(){
    // console.log("显示白条");
    this.setData({
      hideBaitiao:false
    })
  },
  updateSelectItem(e){
    // console.log(e);
    this.setData({
      baitiaoSelectItem:e.detail
    })
  },
  // 更新数量
  updateCount(e){
    let partData = this.data.partData;
    partData.count = e.detail.val;
    this.setData({
      partData
    })
  },
  popBuyView(){
    this.setData({
      hideBuy:false
    })
  },
  addCart(){
    // console.log("加入购物车");
    let self = this;
    wx.getStorage({
      key:'cartInfo',
      success:function(res){
        const cartArray = res.data;
        const partData = self.data.partData;
        let isExit = false;
        cartArray.forEach(cart =>{
          if(cart.id == partData.id){
            isExit = true;
            cart.total += self.data.partData.count;
            wx.setStorage({
              key: 'cartInfo',
              data:cartArray
            })
          }

          if(!isExit){
            partData.total = self.data.partData.count;
            cartArray.push(partData);
            wx.setStorage({
              key: 'cartInfo',
              data: cartArray
            })
          }

          // 商品数量
          self.setBadge(cartArray);
        })
        wx.showToast({
          title:"加入购物车成功",
          icon:'success',
          duration:3000
        })
      },
      fail(){
        let partData = self.data.partData;
        partData.total = self.data.partData.count;
        let cartArray = [];
        cartArray.push(partData);
        wx.setStorage({
          key:'cartInfo',
          data:cartArray
        })
        // 商品数量
        self.setBadge(cartArray);
      }
    })
  },
  // 商品数量方法
  setBadge(cartArray){
    this.setData({
      badgeCount:cartArray.length
    })
  }
  
})