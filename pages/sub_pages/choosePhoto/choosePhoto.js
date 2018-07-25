const app = getApp()
// pages/sub_pages/choosePhoto/choosePhoto.js
//选择了头像后存在game info里
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftPhoto: 0,
    rightPhoto: 0
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
  btnClick_Left_Pre: function () {
    this.data.leftPhoto--;
    if (this.data.leftPhoto < 0) {
      this.data.leftPhoto = 0;
    }
    this.setData({
      leftPhoto: this.data.leftPhoto
    });
  },
  btnClick_Left_Next: function () {
    this.data.leftPhoto++;
    if (this.data.leftPhoto > 2) {
      this.data.leftPhoto = 2;
    }
    this.setData({
      leftPhoto: this.data.leftPhoto
    });
  },
  btnClick_Right_Pre: function () {
    this.data.rightPhoto--;
    if (this.data.rightPhoto < 0) {
      this.data.rightPhoto = 0;
    }
    this.setData({
      rightPhoto: this.data.rightPhoto
    });
  },
  btnClick_Rightt_Next: function () {
    this.data.rightPhoto++;
    if (this.data.rightPhoto > 2) {
      this.data.rightPhoto = 2;
    }
    this.setData({
      rightPhoto: this.data.rightPhoto
    });
  },

  btnClick_Sure: function () {
    app.choosePhotoLeft = this.data.leftPhoto;
    app.choosePhotoRight = this.data.rightPhoto;
      wx.navigateTo({
      url: "../createMyIssue/createMyIssue"
    });
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