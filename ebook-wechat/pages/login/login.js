// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    password: "",
    errorMessage: ""
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

  },
  //用户名输入
  bindNameInput: function(event){
    this.setData({userName : event.detail.value})
  },
  //密码输入
  bindPasswordInput: function(event){
  this.setData({ password: event.detail.value })
  },
  //事件处理函数
  bindViewTap: function() {
     var userservice = require("../../services/Userservice");
     const value={
       username: this.data.userName,
       password: this.data.password
     }
     userservice.login(value);
    //  wx.getStorage({
    //    key: 'userId',
    //    fail: (res) => {
    //      console.log(res);
    //    },
    //    success: (result) => {
    //      console.log(result);

    //    },
    //  })
    }
})