//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isiPhone: app.globalData.isiPhone,
    isiPhoneX: app.globalData.isiPhoneX
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindBtnClickStartGame: function () {
    console.log("click startGame");
    wx.navigateTo({
      url: "../sub_pages/signin/signin"
    });
  },
  bindBtnClickMoreGames: function () {

  },
  bindBtnClickOpenRank: function () {

  },
  bindBtnClickShare: function () {

  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //启动后应当初始化玩家的数据
    //如果没有登录过； 呵呵 给一份数据
    let signTime = wx.getStorageSync(app.globalData.LAST_SIGNIN);
    let date = new Date();
    let curDay = date.getDate();
    if (curDay != signTime) {
      wx.navigateTo({
        url: "../sub_pages/signin/signin"
      });
    }


  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
