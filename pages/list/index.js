const interfaces = require("../../utils/urlConfig");
// pages/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.setNavigationBarTitle({
      title:options.title,
    })

    const self = this;
    wx.showLoading({
      title:"加载中..."
    })

    wx.request({
      url:interfaces.productionsList,
      success(res){
        wx.hideLoading();
        self.setData({
          prolist:res.data
        })
      }
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
    wx.showNavigationBarLoading();
    const self = this;

    wx.request({
      url:interfaces.productionsList,
      success(res){
        console.log('大肥猪',res.data);
        self.setData({
          prolist:res.data
        })
        // 隐藏加载状态
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
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