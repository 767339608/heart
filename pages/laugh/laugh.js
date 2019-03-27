// client/pages/laugh/laugh.js
var localData = require('../../data/json.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    texts:{}
  },
  click:function(){
    console.log(this.data.texts)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //下拉刷新
  onPullDownRefresh: function () {
    wx.startPullDownRefresh() //在标题栏中显示加载
    console.log(1)
    this.fetchData()
    wx.stopPullDownRefresh();
  },
  fetchData:function(){
    let _this = this
    wx.request({
      url: 'http://v.juhe.cn/joke/randJoke.php',
      method: 'GET',
      dataType: 'json',
      data: {
        key: 'cbdda85be1858ff786f6eb7301a075ec'
      },
      success: function (data) {
        console.log(data.data.result)
        _this.setData({
          textJsonList: data.data.result
        })
        console.log(_this.data.texts)
      }
    })
  },
  onLoad: function (options) {
    this.fetchData()
    // ajax获取
    // //本地获取
    // this.setData({
    //   textJsonList:localData.textJsonList.result
    // })
    // console.log(this.data.textJsonList)
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