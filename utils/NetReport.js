const app = getApp()

const dataCenter = require('./dataCenter.js');

// var serverURL = "http://192.168.10.152:8081/";
var serverURL = "http://121.201.23.222:8081/";
// var serverURL = "http://47.100.200.222:8081/";


module.exports = {
    /**
     * 登陆微信。 把账号信息发给服务器
     */
    LoginWx: function () {
        let userInfo = app.globalData.userInfo;
        if(userInfo != undefined){
            let wxLoginInfo = app.globalData.wxLoginInfo;
            let gameUserId = wx.getStorageSync(app.globalData.GAME_USERID);
            let obj = {};
            obj.UserId = gameUserId;
            obj.code = app.globalData.wxLoginCode;
            obj.nickName = userInfo.nickName;
            obj.gender = userInfo.gender;
            obj.city = userInfo.city+"";
            obj.province = userInfo.province+"";
            obj.country = userInfo.country+"";
            obj.avatarUrl = userInfo.avatarUrl;
            let msg = JSON.stringify(obj);
            wx.request({
                url: serverURL + "LoginWx",
                method: 'POST',
                data: msg,
                success: function (e) {                    
                    var userInfoObj = JSON.parse(e.data.msg);

                    if (userInfoObj.error != undefined) {
                        console.log("登录失败 上报用户信息");
                    } else {
                        app.gameData.SessonId = userInfoObj.SessonId;
                        app.gameData.gameUserId = userInfoObj.UserId;
                        dataCenter.SaveLoginData(userInfoObj, app.globalData);
                        console.log("登录成功 上报用户信息");
                    }
                }
            });
        }
     
    },

    GainLoginReward: function () {
        let SessonId = app.gameData.SessonId;

        let obj = {};
        obj.SessonId = SessonId+"";
        let msg = JSON.stringify(obj);
        wx.request({
            url: serverURL + "GainLoginReward",
            method: 'POST',
            data: msg,
            success: function (e) {
                var getObj = JSON.parse(e.data.msg);
                if (getObj.error != undefined) {
                    console.log("签到失败 上报用户信息");
                } else {
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
        obj.SessonId = SessonId+"";
        obj.PlotId = PlotId+"";
        obj.ChapterId = ChapterId+"";
        let msg = JSON.stringify(obj);
        wx.request({
            url: serverURL + "GainPlotReward",
            method: 'POST',
            data: msg,
            success: function (e) {
                var getObj = JSON.parse(e.data.msg);
                if (getObj.error != undefined) {
                    console.log("破关失败 上报用户信息");
                } else {
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
        obj.SessonId = SessonId+"";
        obj.PlotId = PlotId+"";
        obj.ChapterId = ChapterId+"";
        let msg = JSON.stringify(obj);
        wx.request({
            url: serverURL + "GainChapterReward",
            method: 'POST',
            data: msg,
            success: function (e) {
                var getObj = JSON.parse(e.data.msg);
                if (getObj.error != undefined) {
                    console.log("跳章节失败 上报用户信息");
                } else {
                     let AddGoldNum = getObj.RewardGold;
                    let UserGoldNum = getObj.UserGoldNum;
                    console.log("跳章节结束 上报用户信息");
                }
            }
        });
    },

    ShareOnce: function () {



        let SessonId = app.gameData.SessonId;

        let obj = {};
        obj.SessonId = SessonId+"";
        let msg = JSON.stringify(obj);
        wx.request({
            url: serverURL + "ShareOnce",
            method: 'POST',
            data: msg,
            success: function (e) {
                var getObj = JSON.parse(e.data.msg);
                if (getObj.error != undefined) {
                    console.log("分享失败 上报用户信息");
                } else {
                     let AddGoldNum = getObj.RewardGold;
                    let UserGoldNum = getObj.UserGoldNum;
                    console.log("分享结束 上报用户信息");
                }
            }
        });
    },
    ShareUnlock: function () {

        wx.showToast({
            title: "解锁成功",
            icon: "none",
            duration: 2e3
        });
        app.gameData.shareNumToday++;
        app.gameData.goldNum+=5;   
        dataCenter.SaveShareData(app.gameData, app.globalData);


        let SessonId = app.gameData.SessonId;

        let obj = {};
        obj.SessonId = SessonId +"";
        let msg = JSON.stringify(obj);
        wx.request({
            url: serverURL + "ShareOnce",
            method: 'POST',
            data: msg,
            success: function (e) {
                var getObj = JSON.parse(e.data.msg);
                if (getObj.error != undefined) {
                    console.log("分享失败 上报用户信息");
                } else {
                     let AddGoldNum = getObj.RewardGold;
                    let UserGoldNum = getObj.UserGoldNum;
                    console.log("分享结束 上报用户信息");
                }
            }
        });
    },

    GetRankInfo: function (rankType,callBack) {
        let SessonId = app.gameData.SessonId;

        let obj = {};
        obj.SessonId = SessonId+"";
        obj.RankType = rankType-1;
        let msg = JSON.stringify(obj);
        wx.request({
            url: serverURL + "GetRankInfo",
            method: 'POST',
            data: msg,
            success: function (e) {
                var getObj = JSON.parse(e.data.msg);
                if (getObj.error != undefined) {
                    console.log("获取排行失败 上报用户信息");
                    if(callBack){
                        callBack([]);
                    }
                } else {
                     let RankArr = getObj.RankArr;
                    console.log("获取排行结束 上报用户信息");
                    if(callBack){
                        callBack(RankArr);
                    }
                }
            }
        });
    },

    SendDesignIssue: function (data) {
        let SessonId = app.gameData.SessonId;

        let obj = {};
        obj.SessonId = SessonId+"";
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
                var getObj = JSON.parse(e.data.msg);
                if (getObj.error != undefined) {
                    console.log("出题失败 上报用户信息");
                } else {
                     let Status = getObj.Status;
                     wx.showToast({
                        title: "题目创建成功",
                        icon: "none",
                        mask: true,
                        duration: 2e3
                      });
                    console.log("出题成功  上报用户信息");
                }
            }
        });
    }
}