const app = getApp()
const dataCenter = require('../../../utils/dataCenter.js')
const util = require('../../../utils/util.js')

// pages/sub_pages/chapterLv/chapterLv.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //{chapterId Name ChargeNum HardLv PlotIDArr isUnLock luoboArr}
    chapterArr:[],
    isShowLockTip: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //组装数据 看那些解锁了那些没有
    let chapterArr = [];
    for (let i = 0; i < util.chapterArr.length; i++) {
      let chapterData = util.chapterArr[i];

      let chapter = {};
      chapter.chapterId = chapterData._id;
      chapter.Name = chapterData.Name;
      chapter.ChargeNum = chapterData.ChargeNum;
      chapter.HardLv = chapterData.HardLv;
      chapter.PlotIDArr = chapterData.PlotIDArr;
      chapter.isUnLock = app.gameData.chapterId < chapterData._id ? false : true;

      let ziNum = Math.floor( chapter.HardLv / 5);
      let huangNum =Math.floor( chapter.HardLv % 5);
      chapter.luoboArr = [];
      for(let i=0;i<huangNum;i++){
        chapter.luoboArr.push(false);
      }
      for(let i=0;i<ziNum;i++){
        chapter.luoboArr.push(true);
      }
      chapterArr.push(chapter);
    }
    this.setData({
      chapterArr: chapterArr
    });
  },
  /**
   * 选中了某个章节;
   */
  ChoosedOneChapter: function (item) {
    let curChapter = item.currentTarget.dataset.item;
    console.log(JSON.stringify(curChapter));
    if (curChapter.isUnLock) {
      app.gameData.gameChapterId = curChapter._id;

      app.gameData.gameCpPlotIdx = 0;
      if (curChapter._id == app.gameData.chapterId) {
        app.gameData.gameCpPlotIdx = app.gameData.cpPlotIndex;
      }
      wx.navigateTo({
        url: "../gamePlot/gamePlot"
      });

    } else {
      //显示未解锁
      this.setData({
        isShowLockTip: true
      });
      setTimeout(() => {
        this.setData({
          isShowLockTip: false
        });
      }, 2e3);
    }
  },
  unshowLockTips: function () {
    t.setData({
      isShowLockTip: false
    });
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