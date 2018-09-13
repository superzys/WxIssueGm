const app = getApp()
const NetReprot = require('../../../utils/NetReport.js')
const dataCenter = require('../../../utils/dataCenter.js');

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
    for (let i = 0; i < 5; i++) {
      let oneTalk = {};
      // idx "PhotoId":0,"IsLeft":1,"Words":"请问你"
      oneTalk.IsLeft = i % 2 == 0 ? true : false;
      oneTalk.PhotoId = oneTalk.IsLeft?app.gameData.choosePhotoLeft:app.gameData.choosePhotoRight;
      oneTalk.idx = i;
      oneTalk.heightRpx = 80;
      oneTalk.Words = "";
      arr.push(oneTalk);
    }
 this.data.isAgree =    app.gameData.isAgreeXieYi;
    this.setData({
      isAgree:this.data.isAgree,
      issueArr: arr
    });
  },
  inputWords: function (item) {
    let curItem = item.currentTarget.dataset.item;
    let oneTalk = this.data.issueArr[curItem.idx];
    oneTalk.Words = item.detail.value;

    // if (oneTalk.Words != "" && (oneTalk.idx + 1) == this.data.issueArr.length) {//最后一个给文本了
    //   this.AddOneTalk();
    // }
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
      if(oneTalk.Words == "" && i == this.data.issueArr.length-1){
        
      }else{
        WordsArr.push(oneTalk.Words);
      }
      
    }
    for (let i = 0; i < this.data.answear.length; i++) {
      let answearStr = this.data.answear[i];
      TipsArr.push(answearStr);
    }
    obj.WordsArr = WordsArr;
    obj.TipsArr = TipsArr;

    NetReprot.SendDesignIssue(obj);
    wx.navigateBack();
    wx.navigateBack();
  },


  readAgreement: function () {
    //弹出来 规则
    wx.navigateTo({
      url: "../yonghuxieyi/yonghuxieyi"
    });
    // if (!this.data.isAgree) {  

    // }
    // this.setData({
    //   isAgree: !this.data.isAgree
    // });
  },
  changeAgreement: function () {

    app.gameData.isAgreeXieYi = !this.data.isAgree;
    this.setData({
      isAgree: !this.data.isAgree
    });
    dataCenter.SaveYongHuXieYi(app.gameData, app.globalData);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 点击到了背景
   */
  clickTipBk: function () {
    //不做处理只是为了阻挡点击
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