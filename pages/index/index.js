//index.js
//获取应用实例
const app = getApp()
const dataCenter = require('../../utils/dataCenter.js');
const NetReprot = require('../../utils/NetReport.js');
const shareCmp = require("../../utils/share-util.js");
const soundCtl = require("../../utils/audio-manager");

    Page({
      data: {
        txt: "sss",
        isShow: true,

        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isiPhone: app.globalData.isiPhone,
        isiPhoneX: app.globalData.isiPhoneX
      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {
        app.gameData.isIndexPage = true;
      },

      //事件处理函数
      bindViewTap: function () {
        wx.navigateTo({
          url: '../logs/logs'
        })
      },
      // toastShow: function (str, icon) {
      //   var _this = this;
      //   _this.setData({
      //     isShow: true,
      //     txt: str,
      //     iconClass: icon
      //   });
      //   setTimeout(function () {    //toast消失
      //     _this.setData({
      //       isShow: false
      //     });
      //   }, 1500);
      // },

      onShareAppMessage: function (a) {
        var o = 7;
        let isCnacle = false;
        let wordsArr = ["领导说这个程序不错，要好好学习",
          "快上车，没时间解释了，目标秋名山",
          "新换了手机号码，想逗一下女朋友，结果。。。",
          "你的智商已欠费，请及时充值",
          "城市套路深，我要回农村；农村路也滑，套路更复杂",
          "涨姿势！撩汉/妹宝典在此，单身狗就靠它了！"
        ];
        let ranNum = Math.random(0, 1) * wordsArr.length;
        let TipIdx = Math.floor(ranNum);
        if (TipIdx >= 6) {
          TipIdx = 5;
        }
        let shareStr = wordsArr[TipIdx];
        return {
          title: shareStr, // 转发标题（默认：当前小程序名称）
          path: '/pages/index/index', // 转发路径（当前页面 path ），必须是以 / 开头的完整路径
          imageUrl: "../imagesUrl/Share_" + TipIdx + ".jpg",
          success(e) {
            console.log(e);
            // shareAppMessage: ok,
            // shareTickets 数组，每一项是一个 shareTicket ，对应一个转发对象
            // 需要在页面onLoad()事件中实现接口
            wx.showShareMenu({
              // 要求小程序返回分享目标信息
              withShareTicket: true
            });
          },
          fail(e) {
            console.log(e);
            isCnacle = true;
            // shareAppMessage:fail cancel
            // shareAppMessage:fail(detail message) 
          },
          complete() {
            console.log("complete");
            if (!isCnacle) {
              NetReprot.ShareOnce();
              if (app.gameData.shareNumToday < 5) {
                //不等结果。 自己计算成功    
                wx.showToast({
                  title: "获得萝卜币+20",
                  image: "../images/Img_DinaLB.png",
                  duration: 2e3
                });
                app.gameData.shareNumToday++;
                app.gameData.goldNum += 20;
                dataCenter.SaveShareData(app.gameData, app.globalData);

              }
            }

          }
        }
      },
      bindBtnClickStartGame: function () {
        this.StartLoginAndGotoGame();
        // wx.showToast({
        //   // title: "获得" + this.data.curRewardNum + "萝卜币",
        //   image: "../imagesUrl/Dialog_LockChapter.png",
        //   mask:true,
        //   duration: 2e3
        // });

        // this.toastShow('登录名不能为空',"Btn_MoreGame");

        // console.log("click startGame");

      },
      bindBtnClickMoreGames: function () {
        wx.navigateTo({
          url: "../sub_pages/moreGameFun/moreGameFun"
        });
      },
      bindBtnClickOpenRank: function () {
        wx.navigateTo({
          url: "../sub_pages/rankPage/rankPage"
        });
      },
      bindBtnClickShare: function () {
        wx.navigateTo({
          url: "../sub_pages/createMyIssue/createMyIssue"
        });
      },
      bindBtnClickOpenGameCpList: function () {
        this.StartLoginAndGotoGame();
        // wx.navigateTo({
        //   url: "../sub_pages/chapterList/chapterList"
        // });
      },
      onLoad: function () {
        app.gameData.isIndexPage = true;
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
            });

            if (app.gameData.SessonId > 0) {

            } else {
              NetReprot.LoginWx(this.loginBack);
            }
          }
        } else {
          // 在没有 open-type=getUserInfo 版本的兼容处理
          wx.getUserInfo({
            success: res => {
              app.globalData.wxLoginInfo = res
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
        if (chapterId == undefined || chapterId == "") { //没存的话初始化用户
          app.gameData.chapterId = 1;
          app.gameData.cpPlotIndex = 0;
          app.gameData.goldNum = 0;
          app.gameData.shareNumToday = 0;
          app.gameData.lastLoginDay = 0;
          app.gameData.totalSignedDayNum = 0;
          app.gameData.lastSignDay = 0;
          app.gameData.plotIdArr = [];
          app.gameData.isAgreeXieYi = 0;
          app.gameData.isShowedGameTip = 0;

          dataCenter.SaveAllData(app.gameData, app.globalData);
        } else { //如果是登录过的根据时间判断 初始化

          app.gameData.goldNum = wx.getStorageSync(app.globalData.GAME_GOLD);
          app.gameData.isShowedGameTip = wx.getStorageSync(app.globalData.IS_Showed_GameTIp);
          app.gameData.chapterId = wx.getStorageSync(app.globalData.GAME_CHAPTERID);
          app.gameData.cpPlotIndex = wx.getStorageSync(app.globalData.GAME_CPPLOTINDEX);
          app.gameData.plotIdArr = wx.getStorageSync(app.globalData.GAME_PLOT_ARR);

          app.gameData.shareNumToday = wx.getStorageSync(app.globalData.SHARE_COUNT);
          app.gameData.totalSignedDayNum = wx.getStorageSync(app.globalData.TOTAL_SIGNIN_COUNT);
          app.gameData.lastSignDay = wx.getStorageSync(app.globalData.LAST_SIGNIN);
          app.gameData.isAgreeXieYi = wx.getStorageSync(app.globalData.IS_AGREE_XIEYI);
          app.gameData.lastLoginDay = wx.getStorageSync(app.globalData.LAST_LOGINDAY);

        }

        let date = new Date();
        let curDay = date.getDate();
        if (app.gameData.lastLoginDay != curDay) {
          app.gameData.lastLoginDay = curDay;
          app.gameData.shareNumToday = 0;
          dataCenter.SaveShareData();
        }
        soundCtl.play();
        if (curDay != app.gameData.lastSignDay) {
          app.gameData.remainSignNum = 1;
          if (app.gameData.SessonId > 0) {
            wx.navigateTo({
              url: "../sub_pages/signin/signin"
            });
          }

        }


      },
      StartLoginAndGotoGame: function () {

        wx.navigateTo({
          url: "../sub_pages/chapterList/chapterList"
        });

        if (app.gameData.SessonId > 0) {

        } else {
          NetReprot.LoginWx(this.loginBack);
        }
      },
      loginBack: function () {
        if (app.gameData.remainSignNum > 0) {
          if (app.gameData.isIndexPage) {
            wx.navigateTo({
              url: "../sub_pages/signin/signin"
            });
          } else {
            wx.navigateTo({
              url: "../signin/signin"
            });
          }
        }
      },
      bindBtnClick: function () {
        wx.showLoading({
          title: "加载中..."
        });
      },
      getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        });
        wx.hideLoading();
        this.StartLoginAndGotoGame();
      },
      getUserInfoAndMoreGame: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        });
        wx.hideLoading();
        this.bindBtnClickMoreGames();
      },
      getUserInfoAndRank: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        });
        wx.hideLoading();
        this.bindBtnClickOpenRank();
      },
      getUserInfoAndShare: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        });
        wx.hideLoading();
        this.bindBtnClickShare();
      }

    })