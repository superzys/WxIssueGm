const app = getApp()
const dataCenter = require('../../../utils/dataCenter.js');

const NetReprot = require('../../../utils/netReport.js')

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})