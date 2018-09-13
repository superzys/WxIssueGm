const app = getApp()
const dataCenter = require('../../../utils/dataCenter.js')
const util = require('../../../utils/util.js')

// pages/sub_pages/chapterList/chapterList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //{chapterId Name ChargeNum HardLv PlotIDArr isUnLock luoboArr}
    chapterArr: [],
    isShowLockTip: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.gameData.isIndexPage = false;
    this.ShowCurLvInfo();
  },
  ShowCurLvInfo: function () {
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

      let ziNum = Math.floor(chapter.HardLv / 5);
      let huangNum = Math.floor(chapter.HardLv % 5);
      chapter.luoboArr = [];
      for (let i = 0; i < huangNum; i++) {
        chapter.luoboArr.push(false);
      }
      for (let i = 0; i < ziNum; i++) {
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
      app.gameData.gameChapterId = curChapter.chapterId;

      app.gameData.gameCpPlotIdx = 0;
      if (curChapter.chapterId == app.gameData.chapterId) {
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
    this.setData({
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
    app.gameData.isIndexPage = false;
    this.ShowCurLvInfo();
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