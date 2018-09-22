//获取应用实例
import {translate} from '../../utils/api.js'
let app = getApp()
Page({
  data:{
    query:'',
    hideClearIcon:true,
    result:[],//查询后得到的数据
    curLang:{}
  },
  onLoad: function (options) {
    console.log('lonload..')
    console.log(options)
    if (options.query) {
      this.setData({ query: options.query })
    }

  },
  onShow: function () {
    if (this.data.curLang.lang !== app.globalData.curLang.lang) {//一进来就翻译
      this.setData({ curLang: app.globalData.curLang })
      this.onConfirm()
    }

  },
  onInput:function(e){
    this.setData({'query':e.detail.value})//获得dom的输入
    if(this.data.query.length >0){
      this.setData({'hideClearIcon':false})
    }else{
      this.setData({'hideClearIcon':true})
    }
  },
  onTapClose:function(){//点x,输入value为空，x隐藏
    this.setData({query:'',hideClearIcon:true})
  },
  onConfirm:function(){
    if(!this.data.query) return
    translate(this.data.query,{from:'auto',to:this.data.curLang.lang}).then(res=>{
      this.setData({'result':res.trans_result})
      let history = wx.getStorageSync("history") || []
      history.unshift({query:this.data.query,result:res.trans_result[0].dst})
      history.length = history.length >10 ? 10:history.length
      wx.setStorageSync('history',history)
    })
  }
})