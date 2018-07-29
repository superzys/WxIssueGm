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
              this.globalData.wxLoginCode = res.code
        console.log(res);
      }
    })
    // 获取用户信息 //  这个是当用户获取过后走的  第一次一定要通过按钮点击获取
    wx.getSetting({
      success: res => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          wx.showLoading({
            title: "加载中..."
        });
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              wx.hideLoading();
              console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.wxLoginInfo = res
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: function(t) {
                wx.hideLoading();
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
    wxLoginCode: null,
    wxLoginInfo: null,
    isiPhone: 0,
    isiPhoneX: 0,
    GAME_USERID: "gameUserID",
    GAME_GOLD: "gameGold",

    GAME_CHAPTERID: "gameChapterId",
    GAME_CPPLOTINDEX: "gameCpPlotIndex",
    GAME_PLOT_ARR: "gamePlotArr",
    
    IS_AGREE_XIEYI: "IsAgreeXieYi",
    SHARE_COUNT: "ShareCount",
    LAST_SIGNIN: "LastSignin",
    TOTAL_SIGNIN_COUNT: "TotalSigninCount",

    CodeVersion: "0.1.01"
  },
  gameData: {
    gameUserId :0,
    SessonId :0,
    goldNum :0,
    gameChapterId :0,
    gameCpPlotIdx :0,
    isAgreeXieYi :0,

    chapterId :0,
    cpPlotIndex: 0,
    shareNumToday:0,
    remainSignNum:0,
    totalSignedDayNum:0,
    lastSignDay:0,
    plotIdArr:[],

    choosePhotoLeft:0,
    choosePhotoRight:0
  }
})