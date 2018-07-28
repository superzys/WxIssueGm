const app = getApp()
const NetReprot = require('../../../utils/netReport.js')

// pages/sub_pages/createMyIssue/createMyIssue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answear: "",
    issueArr: [],
    isAgree: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化的时候给三个对话
    let arr = [];
    for (let i = 0; i < 3; i++) {
      let oneTalk = {};
      // idx "PhotoId":0,"IsLeft":1,"Words":"请问你"
      oneTalk.IsLeft = i % 2 == 0 ? true : false;
      oneTalk.PhotoId = 0;
      oneTalk.idx = i;
      oneTalk.heightRpx = 80;
      oneTalk.Words = "";
      arr.push(oneTalk);
    }
    this.setData({
      issueArr: arr
    });
  },
  inputWords: function (item) {
    let curItem = item.currentTarget.dataset.item;
    let oneTalk = this.data.issueArr[curItem.idx];
    oneTalk.Words = item.detail.value;

  },
  inputAnswear: function (item) {

    this.data.answear = item.detail.value;

  },
  inputLingChange: function (item) {
    let curItem = item.currentTarget.dataset.item;
    let oneTalk = this.data.issueArr[curItem.idx];
    if ((item.detail.heightRpx + 10) > curItem.heightRpx) {
      oneTalk.heightRpx = item.detail.heightRpx + 10;

      this.setData({
        issueArr: this.data.issueArr
      });
    }

    if (oneTalk.Words != "" && (oneTalk.idx + 1) == this.data.issueArr.length) {//最后一个给文本了
      this.AddOneTalk();
    }
    // console.log("  "+item);
  },
  AddOneTalk: function () {
    let oneTalk = {};
    // idx "PhotoId":0,"IsLeft":1,"Words":"请问你"
    oneTalk.IsLeft = (this.data.issueArr.length) % 2 == 0 ? true : false;
    oneTalk.PhotoId = 0;
    oneTalk.idx = (this.data.issueArr.length);
    oneTalk.heightRpx = 80;
    oneTalk.Words = "";
    this.data.issueArr.push(oneTalk);
    this.setData({
      issueArr: this.data.issueArr
    });
  },
  Btn_SubmitIssue: function () {
    let obj = {};
    obj.LeftPhoto = app.gameData.choosePhotoLeft;
    obj.RightPhoto = app.gameData.choosePhotoRight;
    let WordsArr = [];
    let TipsArr = [];
    for (let i = 0; i < this.data.issueArr.length; i++) {
      let oneTalk = this.data.issueArr[i];
      WordsArr.push(oneTalk.Words);
    }
    for (let i = 0; i < this.data.answear.length; i++) {
      let answearStr = this.data.answear[i];
      TipsArr.push(answearStr);
    }
    obj.WordsArr = WordsArr;
    obj.TipsArr = TipsArr;

    NetReprot.SendDesignIssue(obj);
  },

  readAgreement: function () {
    if (!this.data.isAgree) {
      //弹出来 规则
    }
    this.setData({
      isAgree: !this.data.isAgree
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