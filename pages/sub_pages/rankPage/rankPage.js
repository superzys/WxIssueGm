// pages/sub_pages/rankPage/rankPage.js
const app = getApp()

const NetReprot = require('../../../utils/NetReport.js')
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   * {
   * imgUrl
   * Name
   * rankNum
   * chapterName
   * doneNum
   * }
   */
  data: {
    IsShowWuJin: 0,
    rankType: 1,
    myOrder: 0,
    myChapter: "asdasd",
    myPlot: "asdsad",
    myInfo: {},
    // rankNum,nickName, avatarUrl, value, value1
    rankArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先显示自己。 然后请求数据
    let myChapter =util. GetChapterName(app.gameData.chapterId);
    let myPlot =app.gameData.plotIdArr.length;

    this.setData({
      IsShowWuJin:false,
      myChapter: myChapter,
      myPlot:myPlot
    });

    this.ShowChooseTypeRank();

  },
  clickTop: function (item) {
    this.setData({
      rankType: item.currentTarget.dataset.type
    });
    this.ShowChooseTypeRank();
  },
  //显示选择的类型的排行数据
  ShowChooseTypeRank: function () {
    let rankArr = [];
    if (this.data.rankType == 1) {
      rankArr = this.GetGameRanArr();
    }
    else if (this.data.rankType == 2) {
      rankArr = this.GetChuTiRanArr();
    } else {

    }
    if (rankArr == undefined) {
      rankArr = [];
    }
    this.setData({
      rankArr: rankArr
    });
  },
  GetGameRanArr: function () {
    let curPage = this;
    var timestamp = new Date().getTime();
    if (app.gameData.gameRankArr == undefined || (timestamp - app.gameData.gameRankTime ) >= 3000) {//需要更新

      wx.showLoading({
        title: "加载中..."
      });
      NetReprot.GetRankInfo(this.data.rankType, (arr) => {
        wx.hideLoading();
        let rankArr = [];
        for (let i = 0; i < arr.length; i++) {
          let netObj = arr[i];
          let rankObj = {};
          rankObj.rankNum = netObj.rankNum;
          rankObj.nickName = netObj.nickName;
          rankObj.avatarUrl = netObj.avatarUrl;
          let cpname =util. GetChapterName(netObj.value1);
          rankObj.value = netObj.value+"";
          rankObj.value1 = cpname;
          rankArr.push(rankObj);
        }
        app.gameData.gameRankArr = rankArr;
        app.gameData.gameRankTime = timestamp;

        curPage.setData({
          rankArr: rankArr
        });
      });
      return [];
    } else {
      return app.gameData.gameRankArr;
    }

  },

  GetChuTiRanArr: function () {
    let curPage = this;
    var timestamp = new Date().getTime();
    if (app.gameData.chutiRankArr == undefined || (timestamp - app.gameData.chutiRankTime ) >= 3000) {//需要更新

      wx.showLoading({
        title: "加载中..."
      });
      NetReprot.GetRankInfo(this.data.rankType, (arr) => {
        wx.hideLoading();
        let rankArr = [];
        for (let i = 0; i < arr.length; i++) {
          let netObj = arr[i];
          let rankObj = {};
          rankObj.rankNum = netObj.rankNum;
          rankObj.nickName = netObj.nickName;
          rankObj.avatarUrl = netObj.avatarUrl;
          // let cpname =util. GetChapterName(netObj.value1);
          rankObj.value = netObj.value+"";
          // rankObj.value1 = cpname;
          rankArr.push(rankObj);
        }
        app.gameData.chutiRankArr = rankArr;
        app.gameData.chutiRankTime = timestamp;

        curPage.setData({
          rankArr: rankArr
        });
      });
      return [];
    } else {
      return app.gameData.chutiRankArr;
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