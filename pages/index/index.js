// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'wo',
    userInfo:{},
    isShow:true
  },
  setName(){
    console.log(111)
    this.setData({
      msg:'ni'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
  },

  getInfo(){
    wx.getUserInfo({
      success: (data) => {
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail: () => {
        console.log('获取信息失败')
      }
    })
  },
  getUserInfo(data){
    if (data.detail.rawData){  //获取用户信息成功
      this.setData({
        isShow:false
      })
      this.getInfo()
    }
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