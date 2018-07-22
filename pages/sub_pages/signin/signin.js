// pages/sub_pages/signin/signin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    signinCount: 0,
  
    day: ["第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "第七天"],
    gold: [20, 40, 60, 80, 100, 120, 140],
    isSignin: !1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = parseInt(new Date().getTime() / 864e5), t = parseInt(Number(wx.getStorageSync(getApp().globalData.LAST_SIGNIN)) / 864e5);
    this.setData({
      isSignin: a - t == 0
    }), 
    console.log("lasTotalDays::" + t + "   curTotalDays::" + a);
    var e = [], g = [], o = [];
    if (a - t == 1) {
      this.data.signinCount = Number(wx.getStorageSync(getApp().globalData.TOTAL_SIGNIN_COUNT)),
        console.log("signinCount::" + t + "   curTotalDays::" + a);
      for (n = 0; n < 7; n++) n <= this.data.signinCount ? (e[n] = this.data.ITEM_BG_NOR,
        g[n] = this.data.NUM_BG_NOR, o = this.data.FONT_COLOR_NOR) : (e[n] = this.data.ITEM_BG_SEL,
          g[n] = this.data.NUM_BG_SEL, o = this.data.FONT_COLOR_SEL);
    } else {
      wx.setStorageSync(getApp().globalData.TOTAL_SIGNIN_COUNT, 0);
      for (var n = 0; n < 7; n++) n <= 0 ? (e[n] = this.data.ITEM_BG_NOR, g[n] = this.data.NUM_BG_NOR,
        o = this.data.FONT_COLOR_NOR) : (e[n] = this.data.ITEM_BG_SEL, g[n] = this.data.NUM_BG_SEL,
          o = this.data.FONT_COLOR_SEL);
    }
    var N = wx.getStorageSync(getApp().globalData.TOTAL_SIGNIN_COUNT);
    this.setData({
      item_bg: e,
      num_bg: g,
      font_color: o,
      signinCount: N
    });
  },
  onKnow: function () {
    wx.navigateBack({});
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
    if (parseInt(new Date().getTime() / 864e5) - parseInt(Number(wx.getStorageSync(getApp().globalData.LAST_SIGNIN)) / 864e5) != 0) {
      var e = Number(wx.getStorageSync(getApp().globalData.TOTAL_POINT)), g = Number(wx.getStorageSync(getApp().globalData.TOTAL_SIGNIN_COUNT)), o = 20;
      6 == g ? (g = 0, e += 140, o = 140) : (e += 20 * ++g, o = 20 * g);
      var n = new Date().getTime();
      try {
        wx.setStorageSync(getApp().globalData.TOTAL_SIGNIN_COUNT, g), wx.setStorageSync(getApp().globalData.TOTAL_POINT, e),
          wx.setStorageSync(getApp().globalData.LAST_SIGNIN, n);
      } catch (a) {
        wx.setStorage({
          key: getApp().globalData.TOTAL_SIGNIN_COUNT,
          data: g
        }), wx.setStorage({
          key: getApp().globalData.TOTAL_POINT,
          data: e
        }), wx.setStorage({
          key: getApp().globalData.LAST_SIGNIN,
          data: n
        });
      }
      t.setGoldNum(e), t.setLastTime(n), a.reportGold(o, e, 0 == g ? 7 : g, 7), wx.showToast({
        title: "获得" + o + "金币",
        image: "../images/coin.png",
        duration: 2e3
      });
    } else console.log("已签到了");
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
  onJump: function () {
    var a = Number(wx.getStorageSync(getApp().globalData.TOTAL_POINT)), t = Number(wx.getStorageSync(getApp().globalData.TOTAL_SIGNIN_COUNT));
    6 == t ? (t = 0, a += 140) : a += 20 * ++t, wx.setStorageSync(getApp().globalData.TOTAL_SIGNIN_COUNT, t),
      wx.setStorageSync(getApp().globalData.TOTAL_POINT, a), wx.setStorageSync(getApp().globalData.LAST_SIGNIN, new Date().getTime()),
      wx.navigateToMiniProgram({
        appId: "wx0ec28a2ab520a4af",
        path: "pages/index/index",
        success: function (a) {
          wx.navigateBack({});
        }
      });
  }
})