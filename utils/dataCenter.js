const SaveAllData = (date, keyData) => {
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
    wx.setStorage({
        key: keyData.GAME_USERID,
        data: date.gameUserId
    }); 
}
const SaveShareData = (date, keyData) => {

    wx.setStorage({
        key: keyData.GAME_USERID,
        data: date.gameUserId
    }); 
    wx.setStorage({
        key: keyData.SHARE_COUNT,
        data: date.shareNumToday
    }); 
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

module.exports = {
    SaveAllData: SaveAllData,
    SaveSignedData:SaveSignedData,
    SaveShareData:SaveShareData,
    SaveLoginData:SaveLoginData
}
