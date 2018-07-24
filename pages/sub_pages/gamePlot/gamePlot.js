const app = getApp()
const dataCenter = require('../../../utils/dataCenter.js')
const util = require('../../../utils/util.js')

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

    CurCpData: {},

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
          for (let i = 0; i < curPlotData.OptionNum; i++) {
            let fontObj = {};
            fontObj.idx = i;
            fontObj.sourceIdx = -1;
            fontObj.str = "";
            fontObj.IsChoose = false;

            ChoosedFontArr.push(fontObj);
          }

          this.setData({
            IsGameing: true,
            IsLoseGame: false,
            IsNextPlot: false,
            IsNextChapter: false,
            isNeedCharge: false,
            isNeedShare: false,
            CurCpData: curCpData,
            hasUserInfo: curPlotData,
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
  },
  /**
   * 给娃一个提示
   */
  TipOneAnswer: function () {
    if (!this.data.IsGameing) {
      return;
    }
    if (app.gameData.goldNum >= this.CurPlotData.RewardGoldNum) {//钱足够
      let fitArr = [];
      for (let i = 0; i < this.data.ChoosedFontArr.length; i++) {
        let fontObj = this.data.ChoosedFontArr[i];
        if (fontObj.str == "") {
          fitArr.push(i);
        }
      }
      //随机出提示那个字
      let TipIdx = Math.floor(Math.random(0, fitArr.length));
      let tipStr = this.data.CurPlotData.RightAnsArr[TipIdx];
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
        app.gameData.goldNum -= this.CurPlotData.RewardGoldNum;

        let tipCmpObj = this.data.ChoosedFontArr[TipIdx];
        tipCmpObj.str = tipStr;
        tipCmpObj.sourceIdx = sourceIdx;

        this.setData({
          AllFontArr: fontObkArr,
          ChoosedFontArr: ChoosedFontArr,
          Gold: app.gameData.goldNum
        });
      }
    } else {
      wx.showToast({
        title: "萝卜币不足",
        // image: "",
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
      this.AddOneFontToShow(fontObj);
    }
  },
  AddOneFontToShow: function (sourceFontObj) {

    for (let i = 0; i < this.ChoosedFontArr.length; i++) {
      let fontObj = this.ChoosedFontArr[i];
      if (fontObj.str == "") {//没有答案
        fontObj.sourceIdx = sourceFontObj.idx;
        fontObj.str = sourceFontObj.str;

        this.setData({
          AllFontArr: fontObkArr,
          ChoosedFontArr: ChoosedFontArr
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
      fontObj.str = "";
      fontObj.sourceIdx = -1;
      this.setData({
        AllFontArr: fontObkArr,
        ChoosedFontArr: ChoosedFontArr
      });
    } else {//本来啥都没有 瞎点

    }
  },
  checkIsWinOrLose: function () {
    let isAllWin = true;
    let isNotEnd = false;
    for (let i = 0; i < this.ChoosedFontArr.length; i++) {
      let fontObj = this.ChoosedFontArr[i];
      if (fontObj.str == "") {//没有答案或者不对的话 
        isAllWin = false;
        isNotEnd = true;
        break;
      }
      if (fontObj.str != this.CurPlotData.RightAnsArr[i]) {
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
        if (this.data.CurCpData.plotArr.length == (pp.gameData.gameCpPlotIdx + 1)) {//这是最后一关
          isNextChapter = true;
          if (this.CurCpData.ChargeNum > 0) {
            if (app.globalData.isiPhone) {
              isNeedShare = true;
            } else {
              isNeedCharge = true;
            }
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
        });
      }
    }
  },
/**
 * 返回 章节选择
 */
  btnClick_Return :function () {
    
  },
/**
 * 充值
 */
  btnClick_Charge :function () {
    
  },
/**
 * 分享
 */
  btnClick_Share :function () {
    
  },
  /**
   * 下一关
   */
  btnClick_NextPlot :function () {
    
  },
  /**
   * 下一章节
   */
   btnClick_NextChapter :function () {
    
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