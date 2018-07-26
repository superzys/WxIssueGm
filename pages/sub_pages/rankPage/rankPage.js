// pages/sub_pages/rankPage/rankPage.js
const app = getApp()

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
    rankType :1,
    myOrder:0,
    myChapter:"asdasd",
    myPlot:"asdsad",
    myInfo:{},
    // rankNum,nickName, avatarUrl, value, value1
    rankArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先显示自己。 然后请求数据
    let selfInfo = {};
    selfInfo.nickName = app.globalData.userInfo.nickName;
    selfInfo.avatarUrl = app.globalData.userInfo.avatarUrl;
     
    let rankArr = [];
    for(let i=0;i<5;i++){
      let rankObj = {};
      rankObj.rankNum = i;
      rankObj.nickName = app.globalData.userInfo.nickName;
      rankObj.avatarUrl = selfInfo.avatarUrl ;
      rankObj.value = "saas";
      rankObj.value1 = "saas";
      rankArr.push(rankObj);
    }
 
    this.setData({
      rankArr: rankArr
  });
    
  },
  clickTop:function (item) {  
    this.setData({
      rankType: item.currentTarget.dataset.type
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