const app = getApp()
const dataCenter = require('../../../utils/dataCenter.js');

const NetReprot = require('../../../utils/NetReport.js')

// pages/sub_pages/signin/signin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    signinCount: 0,
    curRewardNum: 0,
    dayArr:[
      {day: 1, dayDes: "第一天",rewardNum:20,isSigned:false},
      {day: 2, dayDes: "第二天",rewardNum:40,isSigned:false},
      {day: 3, dayDes: "第三天",rewardNum:60,isSigned:false},
      {day: 4, dayDes: "第四天",rewardNum:80,isSigned:false},
      {day: 5, dayDes: "第五天",rewardNum:100,isSigned:false},
      {day: 6, dayDes: "第六天",rewardNum:120,isSigned:false},
      {day: 7, dayDes: "第七天",rewardNum:140,isSigned:false},
    ],
    // day: ["第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "第七天"],
    // gold: [20, 40, 60, 80, 100, 120, 140],
    isSignin: !1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("lasTotalDays::" + app.gameData.lastSignDay + "   curTotalDays::" + app.gameData.totalSignedDayNum);
    let curRewardNum=0;
    for(let i=0;i<this.data.dayArr.length;i++){
       this.data.dayArr[i].isSigned= app.gameData.totalSignedDayNum >=i?true:false;
       if(app.gameData.totalSignedDayNum >=i){
        curRewardNum=this.data.dayArr[i].rewardNum;
       }
    }
    this.setData({
      isSignin: 0,
      curRewardNum:curRewardNum,
      dayArr:this.data.dayArr,
      signinCount: app.gameData.totalSignedDayNum
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
    let date = new Date();
    let curDay = date.getDate();   

    app.gameData.lastSignDay =curDay;
    app.gameData.totalSignedDayNum++;
    app.gameData.goldNum+=this.data.curRewardNum;
    dataCenter.SaveSignedData(app.gameData,app.globalData);
    NetReprot.GainLoginReward();
    wx.showToast({
      title: "获得" + this.data.curRewardNum + "萝卜币",
      image: "../images/Img_DinaLB.png",
      duration: 2e3
    });

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
      imageUrl: "../../imagesUrl/Share_"+TipIdx+".jpg",
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
  }
})