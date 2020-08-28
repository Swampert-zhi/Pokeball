// pages/bookdetail/bookdetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    book:{},
    show:false,
    purchasenum:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bookId = options.bookId;
    var bookservice = require("../../services/Bookservice");
    const callback=(data)=>{
      this.setData({book:data});
    }
    bookservice.getBookById(bookId,callback);
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

  onClickIcon() {
  },

  showModel() {
    this.setData({show:true});
  },

  changeNum(e){
    this.setData({purchasenum:e.detail});
  },

  purchase(){
    var orderservice=require("../../services/Orderservice");
    const callback=(res)=>{
      let message="成功购买"+this.data.purchasenum+"本《"+this.data.book.title+
      "》，现在购物车中已有"+res+"本";
      wx.showToast({
        title: message,
        icon:'none'
      })
    };
    if(this.data.purchasenum>0)
    wx.getStorage({
      key: 'userId',
      success:(res)=>{
        const value={
          id:res.data,
          bookId:this.data.book.bookId,
          num:this.data.purchasenum
        }
        console.log(value);
        orderservice.addCart(value,callback);
      }
    });
  },

  onChange() {
    // this.setData({active:event.detail});
    wx.redirectTo({
      url: '../homeview/homeview?active=1',
    });
  },

  onClose() {
    this.setData({show:false});
  },
})