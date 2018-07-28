const app = getApp()

const dataCenter = require('./dataCenter.js');

var serverURL = "http://192.168.10.152:8081/";


module.exports = {
    /**
     * 登陆微信。 把账号信息发给服务器
     */
    LoginWx: function () {
        let userInfo = app.globalData.userInfo;
        let wxLoginInfo = app.globalData.wxLoginInfo;
        let gameUserId = wx.getStorageSync(app.globalData.GAME_USERID);
        let obj = {};
        obj.UserId = gameUserId;
        obj.code = app.globalData.wxLoginCode;
        obj.nickName = userInfo.nickName;
        obj.gender = userInfo.gender;
        obj.city = userInfo.city;
        obj.province = userInfo.province;
        obj.country = userInfo.country;
        obj.avatarUrl = userInfo.avatarUrl;
        let msg = JSON.stringify(obj);
        wx.request({
            url: serverURL + "LoginWx",
            method: 'POST',
            data: msg,
            success: function (e) {
                if (e.data.msg.error != undefined) {
                    console.log("登录失败 上报用户信息");
                } else {
                    var userInfoObj = JSON.parse(e.data.msg);
                    app.gameData.SessonId = userInfoObj.SessonId;
                    app.gameData.gameUserId = userInfoObj.UserId;
                    dataCenter.SaveLoginData(userInfoObj, app.globalData);
                    console.log("登录成功 上报用户信息");
                }
            }
        });
    },

    GainLoginReward: function () {
        let SessonId = app.gameData.SessonId;

        let obj = {};
        obj.SessonId = SessonId;
        let msg = JSON.stringify(obj);
        wx.request({
            url: serverURL + "GainLoginReward",
            method: 'POST',
            data: msg,
            success: function (e) {
                if (e.data.msg.error != undefined) {
                    console.log("签到失败 上报用户信息");
                } else {
                    var getObj = JSON.parse(e.data.msg);
                    let AddGoldNum = getObj.AddGoldNum;
                    let UserGoldNum = getObj.UserGoldNum;
                    console.log("签到结束 上报用户信息");
                }
            }
        });
    },

    GainPlotReward: function (ChapterId, PlotId) {
        let SessonId = app.gameData.SessonId;

        let obj = {};
        obj.SessonId = SessonId;
        obj.PlotId = PlotId;
        obj.ChapterId = ChapterId;
        let msg = JSON.stringify(obj);
        wx.request({
            url: serverURL + "GainPlotReward",
            method: 'POST',
            data: msg,
            success: function (e) {
                if (e.data.msg.error != undefined) {
                    console.log("破关失败 上报用户信息");
                } else {
                    var getObj = JSON.parse(e.data.msg);
                    let AddGoldNum = getObj.RewardGold;
                    let UserGoldNum = getObj.UserGoldNum;
                    console.log("破关结束 上报用户信息");
                }
            }
        });
    },

    GainChapterReward: function (ChapterId, PlotId) {
        let SessonId = app.gameData.SessonId;

        let obj = {};
        obj.SessonId = SessonId;
        obj.PlotId = PlotId;
        obj.ChapterId = ChapterId;
        let msg = JSON.stringify(obj);
        wx.request({
            url: serverURL + "GainChapterReward",
            method: 'POST',
            data: msg,
            success: function (e) {
                if (e.data.msg.error != undefined) {
                    console.log("跳章节失败 上报用户信息");
                } else {
                    var getObj = JSON.parse(e.data.msg);
                    let AddGoldNum = getObj.RewardGold;
                    let UserGoldNum = getObj.UserGoldNum;
                    console.log("跳章节结束 上报用户信息");
                }
            }
        });
    },

    ShareOnce: function () {
        if (app.gameData.shareNumToday < 5) {
            //不等结果。 自己计算成功    
            wx.showToast({
                title: "获得萝卜币+5",
                image: "../images/Img_DinaLB.png",
                duration: 2e3
            });
            app.gameData.shareNumToday++;
            app.gameData.goldNum+=5;   
            dataCenter.SaveShareData();
        }


        let SessonId = app.gameData.SessonId;

        let obj = {};
        obj.SessonId = SessonId;
        let msg = JSON.stringify(obj);
        wx.request({
            url: serverURL + "ShareOnce",
            method: 'POST',
            data: msg,
            success: function (e) {
                if (e.data.msg.error != undefined) {
                    console.log("分享失败 上报用户信息");
                } else {
                    var getObj = JSON.parse(e.data.msg);
                    let AddGoldNum = getObj.RewardGold;
                    let UserGoldNum = getObj.UserGoldNum;
                    console.log("分享结束 上报用户信息");
                }
            }
        });
    },

    GetRankInfo: function (rankType) {
        let SessonId = app.gameData.SessonId;

        let obj = {};
        obj.SessonId = SessonId;
        obj.RankType = rankType;
        let msg = JSON.stringify(obj);
        wx.request({
            url: serverURL + "GetRankInfo",
            method: 'POST',
            data: msg,
            success: function (e) {
                if (e.data.msg.error != undefined) {
                    console.log("获取排行失败 上报用户信息");
                } else {
                    var getObj = JSON.parse(e.data.msg);
                    let AddGoldNum = getObj.RewardGold;
                    let UserGoldNum = getObj.UserGoldNum;
                    console.log("获取排行结束 上报用户信息");
                }
            }
        });
    },

    SendDesignIssue: function (data) {
        let SessonId = app.gameData.SessonId;

        let obj = {};
        obj.SessonId = SessonId;
        obj.LeftPhoto = data.LeftPhoto;
        obj.RightPhoto = data.RightPhoto;
        obj.WordsArr = data.WordsArr;
        obj.TipsArr = data.TipsArr;

        let msg = JSON.stringify(obj);

        wx.request({
            url: serverURL + "SendDesignIssue",
            method: 'POST',
            data: msg,
            success: function (e) {
                if (e.data.msg.error != undefined) {
                    console.log("出题失败 上报用户信息");
                } else {
                    var getObj = JSON.parse(e.data.msg);
                    let Status = getObj.Status;
                    console.log("获取排行结束 上报用户信息");
                }
            }
        });
    }
}