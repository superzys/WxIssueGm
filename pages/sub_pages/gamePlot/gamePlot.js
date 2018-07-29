const app = getApp()
const dataCenter = require('../../../utils/dataCenter.js')
const util = require('../../../utils/util.js')
const NetReprot = require('../../../utils/netReport.js')

// pages/sub_pages/gamePlot/gamePlot.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IsGameing: false,
    IsLoseGame: false,
    IsNextPlot: false,
    IsNextChapter: false,
    isNeedCharge: false,
    isNeedShare: false,
    allFontColumNum: 3,

    CurCpData: {},

    WordsArr: [],

    CurPlotData: {},
    //选项答案 {idx, str ,IsChoose}
    AllFontArr: [],
    //选中了的字体。 再次点击取消选择  {idx, str ,sourceIdx}
    ChoosedFontArr: [],

    Gold: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //显示这关的任务
    this.ShowPlotInfo(app.gameData.gameChapterId, app.gameData.gameCpPlotIdx);
  },

  ShowPlotInfo: function (chapterId, cpPlotIdx) {
    this.data.IsGameing = true;
    let curCpData = undefined;
    for (let i = 0; i < util.chapterArr.length; i++) {
      let cpData = util.chapterArr[i];
      if (cpData != undefined && cpData._id == chapterId) {
        curCpData = cpData;
        break;
      }
    }
    if (curCpData != undefined) {
      if (cpPlotIdx >= curCpData.PlotIDArr.length) {//这关打完了。 跳下各章节
        this.ShowPlotInfo(chapterId++, 0);
      } else {
        let plotId = curCpData.PlotIDArr[cpPlotIdx];
        let curPlotData = undefined;
        for (let i = 0; i < util.plotArr.length; i++) {
          let plotDt = util.plotArr[i];
          if (plotDt._id == plotId) {
            curPlotData = plotDt;
            break;
          }
        }
        if (curPlotData != undefined) {
          //打乱扰动顺序
          let WrongAnsArr = curPlotData.WrongAnsArr.concat();
          let MorNum = curPlotData.OptionNum - curPlotData.RightAnsArr.length - curPlotData.WrongAnsArr.length;
          if (MorNum > 0) {
            while (MorNum > 0) {
              WrongAnsArr.shift();
              MorNum--;
            }
          }
          let allFontArr = curPlotData.RightAnsArr.concat(WrongAnsArr);
          allFontArr.sort(function () {
            return 0.5 - Math.random();
          });
          let allFontColumNum = Math.ceil(allFontArr.length / 2);
          //封装选择字体的结构
          let fontObkArr = [];
          for (let i = 0; i < allFontArr.length; i++) {
            let fontObj = {};
            fontObj.idx = i;
            fontObj.str = allFontArr[i];
            fontObj.IsChoose = false;

            fontObkArr.push(fontObj);
          }
          //制作答案选项
          let ChoosedFontArr = [];
          for (let i = 0; i < curPlotData.RightAnsArr.length; i++) {
            let fontObj = {};
            fontObj.idx = i;
            fontObj.sourceIdx = -1;
            fontObj.str = "";
            fontObj.IsChoose = false;

            ChoosedFontArr.push(fontObj);
          }

          let WordsArr = [];
          for (let i = 0; i < curPlotData.DialogsArr.length; i++) {
            // "PhotoId":0,"IsLeft":1,"Words":"请问你","ImgFaceArr
            let word = curPlotData.DialogsArr[i];
            let wordObj = {};
            wordObj.PhotoId = word.PhotoId;
            wordObj.IsLeft = word.IsLeft;
            wordObj.Words = word.Words;
            wordObj.ImgFaceArr = word.ImgFaceArr;
            wordObj.TxtLen = Math.ceil(word.Words.length / 13);
            if (wordObj.TxtLen < 2) {
              wordObj.TxtLen = 2;
            }
            WordsArr.push(wordObj);
          }

          this.setData({
            IsGameing: true,
            IsLoseGame: false,
            IsNextPlot: false,
            IsNextChapter: false,
            isNeedCharge: false,
            isNeedShare: false,
            WordsArr: WordsArr,
            allFontColumNum: allFontColumNum,
            CurCpData: curCpData,
            CurPlotData: curPlotData,
            AllFontArr: fontObkArr,
            ChoosedFontArr: ChoosedFontArr,
            Gold: app.gameData.goldNum
          });
        }
        else {//没有关卡的话去下一章节
          this.ShowPlotInfo(chapterId++, 0);
        }
      }
    }
    else {//这个章节是空的就回上个章节
      this.ShowPlotInfo(chapterId--, 0);
    }

    dataCenter.SaveAllData(app.gameData, app.globalData);
  },
  /**
   * 给娃一个提示
   */
  TipOneAnswer: function () {
    if (!this.data.IsGameing) {
      return;
    }
    if (app.gameData.goldNum >= this.data.CurPlotData.RewardGoldNum) {//钱足够
      let fitArr = [];
      for (let i = 0; i < this.data.ChoosedFontArr.length; i++) {
        let fontObj = this.data.ChoosedFontArr[i];
        if (fontObj.str == "") {
          fitArr.push(i);
        }
      }
      if (fitArr.length == 0) {
        wx.showToast({
          title: "请先删除一个选项",
          icon: "none",
          mask: true,
          duration: 2e3
        });
        return;
      }
      //随机出提示那个字
      let TipIdx = Math.floor(Math.random(0, fitArr.length));
      let fotnIdx = fitArr[TipIdx];
      let tipStr = this.data.CurPlotData.RightAnsArr[fotnIdx];
      let tipFontObj = undefined;
      let sourceIdx = -1;
      for (let i = 0; i < this.data.AllFontArr.length; i++) {
        let fontObj = this.data.AllFontArr[i];
        if (fontObj.str == tipStr && !fontObj.IsChoose) {
          fontObj.IsChoose = true;
          tipFontObj = fontObj;
          sourceIdx = i;
          break;
        }
      }
      //这个字可以提示的话
      if (tipFontObj != undefined) {
        app.gameData.goldNum -= this.data.CurPlotData.RewardGoldNum;

        let tipCmpObj = this.data.ChoosedFontArr[fotnIdx];
        tipCmpObj.str = tipStr;
        tipCmpObj.sourceIdx = sourceIdx;

        this.setData({
          AllFontArr: this.data.AllFontArr,
          ChoosedFontArr: this.data.ChoosedFontArr,
          Gold: app.gameData.goldNum
        });
        this.checkIsWinOrLose();
      }
    } else {
      wx.showToast({
        title: "萝卜币不足",
        icon: "none",
        mask: true,
        duration: 2e3
      });
    }
  },
  /**
   * 选中 一个字。 按空位顺序添加到选中去
   */
  fontClick_ShowCmp: function (item) {
    if (!this.data.IsGameing) {
      return;
    }
    let fontObj = item.currentTarget.dataset.item;
    if (!fontObj.IsChoose && fontObj.str != "") {//可以被选中
      let dataFontObk = this.data.AllFontArr[fontObj.idx];
      this.AddOneFontToShow(dataFontObk);
    }
  },
  AddOneFontToShow: function (sourceFontObj) {

    for (let i = 0; i < this.data.ChoosedFontArr.length; i++) {
      let fontObj = this.data.ChoosedFontArr[i];
      if (fontObj.str == "") {//没有答案
        fontObj.sourceIdx = sourceFontObj.idx;
        fontObj.str = sourceFontObj.str;
        sourceFontObj.IsChoose = true;
        this.setData({
          AllFontArr: this.data.AllFontArr,
          ChoosedFontArr: this.data.ChoosedFontArr
        });
        this.checkIsWinOrLose();
        break;
      }
    }
  },

  //取消选中的一个
  fontClick_ChooseCmp: function (item) {
    if (!this.data.IsGameing) {
      return;
    }
    let fontObj = item.currentTarget.dataset.item;
    if (fontObj.str != "" && fontObj.sourceIdx >= 0) {//取消
      this.data.AllFontArr[fontObj.sourceIdx].IsChoose = false;
      let datafontObj = this.data.ChoosedFontArr[fontObj.idx];
      datafontObj.str = "";
      datafontObj.sourceIdx = -1;
      this.setData({
        AllFontArr: this.data.AllFontArr,
        ChoosedFontArr: this.data.ChoosedFontArr
      });
    } else {//本来啥都没有 瞎点

    }
  },
  /**
   * 如果胜利了。这一关是打过了的  提示奖励金币
   * 如果下一关是激活的  直接去下一关;
   */
  checkIsWinOrLose: function () {
    // this.data.IsGameing = false;
    // this.setData({
    //   IsGameing: this.data.IsGameing,
    //   IsLoseGame: false,
    //   IsNextPlot: false,
    //   IsNextChapter: true,
    //   isNeedCharge: false,
    //   isNeedShare: false,
    // });
    // return;
    let isAllWin = true;
    let isNotEnd = false;
    for (let i = 0; i < this.data.ChoosedFontArr.length; i++) {
      let fontObj = this.data.ChoosedFontArr[i];
      if (fontObj.str == "") {//没有答案或者不对的话 
        isAllWin = false;
        isNotEnd = true;
        break;
      }
      if (fontObj.str != this.data.CurPlotData.RightAnsArr[i]) {
        isAllWin = false;
      }
    }
    if (!isNotEnd) {
      //标记结算中
      this.data.IsGameing = false;
      if (isAllWin) {//需要判断是
        let isNextChapter = false;
        let isNeedCharge = false;
        let isNeedShare = false;
        if (this.data.CurCpData.PlotIDArr.length == (app.gameData.gameCpPlotIdx + 1)) {//这是最后一关
          isNextChapter = true;
          if (this.data.CurCpData.ChargeNum > 0) {
            if (app.globalData.isiPhone) {
              isNeedShare = true;
            } else {
              // isNeedCharge = true;
              isNeedShare = true;
            }
          }
        }
        if (isNextChapter) {//去下一章节了
          if (app.gameData.chapterId > app.gameData.gameChapterId) {//下一关也开了 直接去吧
            this.btnClick_NextChapter();
            return;
          }
        } else {//检测本关是否领过奖励
          if (app.gameData.plotIdArr.indexOf(this.data.CurPlotData._id) >= 0) {//领取过奖励
            this.btnClick_NextPlot();
            return;
          }
        }
        this.setData({
          IsGameing: this.data.IsGameing,
          IsLoseGame: false,
          IsNextPlot: !isNextChapter,
          IsNextChapter: isNextChapter,
          isNeedCharge: isNeedCharge,
          isNeedShare: isNeedShare,
        });
      } else {
        this.setData({
          IsGameing: this.data.IsGameing,
          IsLoseGame: true,
          IsNextPlot: false,
          IsNextChapter: false,
          isNeedCharge: false,
          isNeedShare: false,
        });
        setTimeout(() => {
          this.unShowLoseTip();
        }, 2e3);
      }
    }
  },
  /**
   * 重新开始
   */
  btnClick_RestartGame: function () {
    for (let i = 0; i < this.data.AllFontArr.length; i++) {
      let fontObj = this.data.AllFontArr[i];
      fontObj.IsChoose = false;
    }
    for (let i = 0; i < this.data.ChoosedFontArr.length; i++) {
      let fontObj = this.data.ChoosedFontArr[i];
      fontObj.str = "";
      fontObj.sourceIdx = -1;
    }

    this.setData({
      IsGameing: true,
      IsLoseGame: false,
      IsNextPlot: false,
      IsNextChapter: false,
      isNeedCharge: false,
      isNeedShare: false,
      AllFontArr: this.data.AllFontArr,
      ChoosedFontArr: this.data.ChoosedFontArr,
      Gold: app.gameData.goldNum
    });
  },

  /**
   * 如果当前在游戏中  加金币 
   * 如果游戏结束了
   */
  onShareAppMessage: function (a) {
  
    let curPage = this;
    return {
      title: '转发', // 转发标题（默认：当前小程序名称）
      path: '/pages/index/index', // 转发路径（当前页面 path ），必须是以 / 开头的完整路径
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
        // shareAppMessage:fail cancel
        // shareAppMessage:fail(detail message) 
      },
      complete() {
        console.log("complete");
        if (curPage.data.IsGameing) {
      
          if (app.gameData.shareNumToday < 5) {
            NetReprot.ShareOnce();
            //不等结果。 自己计算成功    
            wx.showToast({
                title: "获得萝卜币+5",
                image: "../../images/Img_DinaLB.png",
                duration: 2e3
            });
            app.gameData.shareNumToday++;
            app.gameData.goldNum+=5;   
            dataCenter.SaveShareData(app.gameData, app.globalData);
            
        }
        }
        else {
          //分享成功后解锁
          NetReprot.ShareUnlock();
          NetReprot.GainChapterReward(app.gameData.chapterId, curPage.data.CurPlotData._id);
          curPage.GotoNextChapter();
        }
      }
    }
  },

  /**
   * 返回 章节选择
   */
  btnClick_Return: function () {
    wx.navigateBack({});
  },
  /**
   * 充值
   */
  btnClick_Charge: function () {

  },
  /**
   * 分享的金币
   *   btnClick_Share: function () {

  },
   */

  /**
   * 分享解锁
   *   btnClick_ShareUnlockChapter: function () {

  },
   */

  /**
   * 下一关
   */
  btnClick_NextPlot: function () {
    //这样需要更新服务器数据
    NetReprot.GainPlotReward(app.gameData.chapterId, this.data.CurPlotData._id);

    app.gameData.gameCpPlotIdx++;
    if (app.gameData.chapterId == app.gameData.gameChapterId && app.gameData.cpPlotIndex < app.gameData.gameCpPlotIdx) {//是当前关卡的话。 进度改掉
      app.gameData.cpPlotIndex = app.gameData.gameCpPlotIdx;
    }

    if (app.gameData.plotIdArr.indexOf(this.data.CurPlotData._id) < 0) {
      app.gameData.plotIdArr.push(this.data.CurPlotData._id);
    }

    this.ShowPlotInfo(app.gameData.gameChapterId, app.gameData.gameCpPlotIdx);
  },
  /**
   * 下一章节
   */
  btnClick_NextChapter: function () {
    NetReprot.GainChapterReward(app.gameData.chapterId, this.data.CurPlotData._id);
this.GotoNextChapter();

  },

  GotoNextChapter:function(){
    app.gameData.gameChapterId++;
    app.gameData.gameCpPlotIdx = 0;
    if (app.gameData.chapterId < app.gameData.gameChapterId) {//是当前关卡的话。 进度改掉
      app.gameData.cpPlotIndex = app.gameData.gameCpPlotIdx;
      app.gameData.chapterId = app.gameData.gameChapterId;
    }
    if (app.gameData.plotIdArr.indexOf(this.data.CurPlotData._id) < 0) {
      app.gameData.plotIdArr.push(this.data.CurPlotData._id);
    }

    //这样需要更新服务器数据
    this.ShowPlotInfo(app.gameData.gameChapterId, app.gameData.gameCpPlotIdx);
  },

  /**
   * 关闭失败的提示
   */
  unShowLoseTip: function () {
    this.data.IsGameing = true;
    this.setData({
      IsGameing: true,
      IsLoseGame: false
    });
  },
  /**
   * 点击到了背景
   */
  clickTipBk: function () {
    //不做处理只是为了阻挡点击
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

})