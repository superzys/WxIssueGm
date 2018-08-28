var SoundCtl = wx.createInnerAudioContext();

SoundCtl.volume = .7;

var e = !1;

SoundCtl.onPlay(function(e) {
    console.log("播放了", SoundCtl.paused);
}),

SoundCtl.onPause(function(e) {
    console.log("暂停了", SoundCtl.paused);
}), 

SoundCtl.onError(function(o) {
    console.log(o.errMsg);
     console.log(o.errCode);
}),

module.exports = {
    play: function() {
        SoundCtl.loop = true;
        SoundCtl.src = "pages/voice/music.mp3";
        SoundCtl.play();
       
    },

    getStatus: function() {
        return SoundCtl.paused;
    },
    setStatus: function(e) {
        e ? SoundCtl.play() : SoundCtl.pause();
    }
};