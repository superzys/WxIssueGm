const app = getApp()

// pages/sub_pages/createMyIssue/createMyIssue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answear:"",
    issueArr:[],
    isAgree:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化的时候给三个对话
    let arr = [];
    for(let i=0;i<6;i++){
      let oneTalk = {};
      // "PhotoId":0,"IsLeft":1,"Words":"请问你"
      oneTalk.IsLeft = i%2==0?true:false;
      oneTalk.PhotoId = 0;
      oneTalk.Words = "背景高背景高背景高背景高背景高背景高背景高背景高";
      arr.push(oneTalk);
    }  
    this.setData({
      issueArr: arr
    });
  },
  inputWords :function (item) {
    
  },
  btnSurePhoto:function () {
    
  },

  readAgreement:function(){
    if(!this.data.isAgree){
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