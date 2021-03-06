// 引入interfaces
const interfaces = require("../../utils/urlConfig.js");

// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logos:[{image: "/image/yungu.png", title: "云股传媒"},{image: "/image/83dph.jpg", title: "3D大屏"},{image: "/image/yungu.png", title: "电梯LCD"},{image: "/image/yungu.png", title: "商圈覆盖"}],
    pageRow:[],
    quicks:[],
    swipers:[{image: "/image/home_one.jpg"},{image: "/image/home_two.jpg"},{image: "/image/home_thr.jpg"}],
    indicatorDots:true,
    vertical:false,
    autoplay: true,
    interval:3000,
    duration: 500,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    // wx.showLoading({
    //   title:"加载中..."
    // })
    wx.request({
      url:interfaces.homepage,
      header:{
        "content-type":"application/json" //默认值，返回的数据设置为json数据格式
      },
      success(res){
        console.log(res.data);
        self.setData({
          // logos:res.data.logos,
          pageRow: res.data.pageRow,
          quicks: res.data.quicks
          // swipers: res.data.swipers,
        });
        // wx.hideLoading();
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