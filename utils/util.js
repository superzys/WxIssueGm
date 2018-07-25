const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const chapterArr =[
{"_id":1,"Name":"第一章","Desc":"米克尔","ChargeNum":0,"HardLv":1,"PlotIDArr":[1,2]},
{"_id":2,"Name":"第二章","Desc":"纳洛","ChargeNum":0,"HardLv":2,"PlotIDArr":[2,3]},
{"_id":3,"Name":"第三章","Desc":"麦德罗","ChargeNum":0,"HardLv":3,"PlotIDArr":[1,2,3]},
{"_id":4,"Name":"第四章","Desc":"蒂娜","ChargeNum":1,"HardLv":4,"PlotIDArr":[1,2,3]},
{"_id":5,"Name":"第一章","Desc":"米克尔","ChargeNum":0,"HardLv":5,"PlotIDArr":[1,2]},
{"_id":6,"Name":"第二章","Desc":"纳洛","ChargeNum":0,"HardLv":6,"PlotIDArr":[2,3]},
{"_id":7,"Name":"第三章","Desc":"麦德罗","ChargeNum":0,"HardLv":7,"PlotIDArr":[1,2,3]},
{"_id":8,"Name":"第四章","Desc":"蒂娜","ChargeNum":1,"HardLv":8,"PlotIDArr":[1,2,3]},
{"_id":9,"Name":"第一章","Desc":"米克尔","ChargeNum":0,"HardLv":9,"PlotIDArr":[1,2]},
{"_id":10,"Name":"第二章","Desc":"纳洛","ChargeNum":0,"HardLv":10,"PlotIDArr":[2,3]},
{"_id":11,"Name":"第三章","Desc":"麦德罗","ChargeNum":0,"HardLv":11,"PlotIDArr":[1,2,3]},
{"_id":12,"Name":"第四章","Desc":"蒂娜","ChargeNum":1,"HardLv":12,"PlotIDArr":[1,2,3]}
];
const plotArr =[
  {"_id":"1","Name":"名字","DialogsArr":[{"PhotoId":0,"IsLeft":1,"Words":"请问你","ImgFaceArr":null},{"PhotoId":1,"IsLeft":0,"Words":"你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒","ImgFaceArr":null},{"PhotoId":0,"IsLeft":1,"Words":"问完了你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒","ImgFaceArr":null}],"RightAnsArr":["答","案"],"WrongAnsArr":["错","误","干","扰"],"OptionNum":6,"RewardGoldNum":5},
{"_id":"2","Name":"名字2","DialogsArr":[{"PhotoId":0,"IsLeft":1,"Words":"请问你2","ImgFaceArr":null},{"PhotoId":1,"IsLeft":0,"Words":"你问撒2你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒你问撒","ImgFaceArr":null},{"PhotoId":0,"IsLeft":1,"Words":"问完了2","ImgFaceArr":null}],"RightAnsArr":["答","案"],"WrongAnsArr":["错","误","干","扰"],"OptionNum":6,"RewardGoldNum":5},
{"_id":"3","Name":"名字3","DialogsArr":[{"PhotoId":0,"IsLeft":1,"Words":"请问你3","ImgFaceArr":null},{"PhotoId":1,"IsLeft":0,"Words":"你问撒3","ImgFaceArr":null},{"PhotoId":0,"IsLeft":1,"Words":"问完了3","ImgFaceArr":null}],"RightAnsArr":["答","案"],"WrongAnsArr":["错","误","干","扰"],"OptionNum":6,"RewardGoldNum":5}
];

module.exports = {
  formatTime: formatTime,
  chapterArr:chapterArr,
  plotArr :plotArr
}
