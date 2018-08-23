const SaveAllData = (date, keyData) => {
    if (date == undefined || keyData == undefined) {
        return;
    }
    wx.setStorage({
        key: keyData.GAME_GOLD,
        data: date.goldNum
    });
    wx.setStorage({
        key: keyData.GAME_CHAPTERID,
        data: date.chapterId
    });
    wx.setStorage({
        key: keyData.GAME_CPPLOTINDEX,
        data: date.cpPlotIndex
    });
    wx.setStorage({
        key: keyData.GAME_PLOT_ARR,
        data: date.plotIdArr
    });
    wx.setStorage({
        key: keyData.SHARE_COUNT,
        data: date.shareNumToday
    });
    wx.setStorage({
        key: keyData.TOTAL_SIGNIN_COUNT,
        data: date.totalSignedDayNum
    });
    wx.setStorage({
        key: keyData.LAST_SIGNIN,
        data: date.lastSignDay
    });
}
const SaveSignedData = (date, keyData) => {
    if (date == undefined || keyData == undefined) {
        return;
    }
    wx.setStorage({
        key: keyData.GAME_GOLD,
        data: date.goldNum
    });
    wx.setStorage({
        key: keyData.TOTAL_SIGNIN_COUNT,
        data: date.totalSignedDayNum
    });
    wx.setStorage({
        key: keyData.LAST_SIGNIN,
        data: date.lastSignDay
    });
}

const SaveLoginData = (date, keyData) => {
    if (date == undefined || keyData == undefined) {
        return;
    }
    wx.setStorage({
        key: keyData.GAME_USERID,
        data: date.gameUserId
    });
}
const SaveShareData = (date, keyData) => {
    if (date == undefined || keyData == undefined) {
        return;
    }
    wx.setStorage({
        key: keyData.LAST_LOGINDAY,
        data: date.lastLoginDay
    });
    wx.setStorage({
        key: keyData.SHARE_COUNT,
        data: date.shareNumToday
    });
}
const SaveYongHuXieYi = (date, keyData) => {
    if (date == undefined || keyData == undefined) {
        return;
    }
    wx.setStorage({
        key: keyData.IS_AGREE_XIEYI,
        data: date.isAgreeXieYi
    });
}
const SaveIsShowedGameTip = (date, keyData) => {
    if (date == undefined || keyData == undefined) {
        return;
    }
    wx.setStorage({
        key: keyData.IS_Showed_GameTIp,
        data: date.isShowedGameTip
    });
}
// const SaveGameData = (date, keyData) => {

//     wx.setStorage({
//         key: keyData.GAME_CHAPTERID,
//         data: date.gameUserId
//     }); 
//     wx.setStorage({
//         key: keyData.SHARE_COUNT,
//         data: date.shareNumToday
//     }); 
// }

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

module.exports = {
    SaveAllData: SaveAllData,
    // SaveGameData: SaveGameData,
    SaveSignedData: SaveSignedData,
    SaveShareData: SaveShareData,
    SaveYongHuXieYi: SaveYongHuXieYi,
    SaveIsShowedGameTip: SaveIsShowedGameTip,
    SaveLoginData: SaveLoginData
}
