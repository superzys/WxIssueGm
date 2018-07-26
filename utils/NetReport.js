const app = getApp()

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
            data: {
                msg
            },
            success: function (e) {
                console.log("上报用户信息");
            }
        });
    },
}