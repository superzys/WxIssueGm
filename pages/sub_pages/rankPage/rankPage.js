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