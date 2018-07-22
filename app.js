//app.js
App({
  onLaunch: function () {
    let curApp=this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success:  res => {
        if(res.model.search("iPhone")){
          this.globalData.isiPhone = 1;
          if(res.model.search("iPhone X")){
            this.globalData.isiPhoneX = 1;
          }else{
            this.globalData.isiPhoneX = 0;
          }
        }else{
          this.globalData.isiPhone = 0;
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    isiPhone: 0,
    isiPhoneX: 0,
    SHARE_TIME: "ShareTime",
    SHARE_COUNT: "ShareCount",
    LAST_SIGNIN: "LastSignin",
    TOTAL_SIGNIN_COUNT: "TotalSigninCount",
    CodeVersion: "0.1.01"
  }
})