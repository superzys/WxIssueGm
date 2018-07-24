//index.js
//获取应用实例
const app = getApp()
const dataCenter = require('../../utils/dataCenter.js')


Page({
  data: {
    txt:"sss",
    isShow:true,
    iconClass:"adsasd",
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
  toastShow:function(str,icon){
    var _this = this;
    _this.setData({
        isShow: true,
        txt: str,
        iconClass:icon
    });
    setTimeout(function () {    //toast消失
        _this.setData({
            isShow: false
        });
    }, 1500);  
},

  bindBtnClickStartGame: function () {
    // wx.showToast({
    //   // title: "获得" + this.data.curRewardNum + "萝卜币",
    //   image: "../imagesUrl/Dialog_LockChapter.png",
    //   mask:true,
    //   duration: 2e3
    // });

      // this.toastShow('登录名不能为空',"Btn_MoreGame");

    // console.log("click startGame");
    wx.navigateTo({
      url: "../sub_pages/chapterLv/chapterLv"
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
    // let signTime = wx.getStorageSync(app.globalData.LAST_SIGNIN);
    let chapterId = wx.getStorageSync(app.globalData.GAME_CHAPTERID);
    if (chapterId == undefined || chapterId == "") {//没存的话初始化用户
      app.gameData.chapterId = 1;
      app.gameData.cpPlotIndex = 0;
      app.gameData.goldNum = 0;
      app.gameData.shareNumToday = 0;
      app.gameData.totalSignedDayNum = 0;
      app.gameData.lastSignDay = 0;
      app.gameData.plotIdArr = [];
      
    dataCenter.SaveAllData(app.gameData,app.globalData);
    }
    else {//如果是登录过的根据时间判断 初始化

      app.gameData.goldNum = wx.getStorageSync(app.globalData.GAME_GOLD);

      app.gameData.chapterId = wx.getStorageSync(app.globalData.GAME_CHAPTERID);
      app.gameData.cpPlotIndex = wx.getStorageSync(app.globalData.GAME_CPPLOTINDEX);
      app.gameData.plotIdArr = wx.getStorageSync(app.globalData.GAME_PLOT_ARR);

      app.gameData.shareNumToday = wx.getStorageSync(app.globalData.SHARE_COUNT);
      app.gameData.totalSignedDayNum = wx.getStorageSync(app.globalData.TOTAL_SIGNIN_COUNT);
      app.gameData.lastSignDay = wx.getStorageSync(app.globalData.LAST_SIGNIN);

    }
    
    let date = new Date();
    let curDay = date.getDate();   

    if (curDay != app.gameData.lastSignDay) {
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
