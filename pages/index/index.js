//index.js
//获取应用实例
const app = getApp()
const ctx=wx.createCanvasContext("canvas")
const document=wx.createSelectorQuery()
var precision = 100;
var hearts = [];
var mouseMoved = false;
var ww;
var wh;
//星星类
var Heart = function (x, y) {
  this.x = x || Math.random() * ww;
  this.y = y || Math.random() * wh;
  this.size = Math.random() * 2 + 1;
  this.shadowBlur = Math.random() * 10;
  this.speedX = (Math.random() + 0.2 - 0.6) * 8;
  this.speedY = (Math.random() + 0.2 - 0.6) * 8;
  this.speedSize = Math.random() * 0.05 + 0.01;
  this.opacity = 1;
  this.vertices = [];
  for (var i = 0; i < precision; i++) {
    var step = (i / precision - 0.5) * (Math.PI * 2);
    var vector = {
      x: (15 * Math.pow(Math.sin(step), 3)),
      y: -(13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
    }
    this.vertices.push(vector);
  }
}
Heart.prototype.draw = function () {
  this.size -= this.speedSize;
  this.x += this.speedX;
  this.y += this.speedY;
  console.log(this.x)
  ctx.translate(-1000, this.y);
  ctx.scale(this.size, this.size);
  ctx.beginPath();
  for (var i = 0; i < precision; i++) {
    var vector = this.vertices[i];
    ctx.lineTo(vector.x,vector.y);
  }
  ctx.setGlobalAlpha(this.size);
  ctx.setShadow(this.x + 1000, 0, Math.round((3 - this.size) * 10),"red");
  // ctx.globalCompositeOperation = "screen"
  ctx.fill()
  ctx.closePath()
};
var lastFrameTime = 0;
// 模拟 requestAnimationFrame
var requestAnimationFrame= function (callback) {
  var currTime = new Date().getTime();
  var timeToCall = Math.max(0, 16 - (currTime - lastFrameTime))+500;
  var id = setTimeout( function () {
    callback(currTime + timeToCall);
  }, timeToCall);
  lastFrameTime = currTime + timeToCall;
  return id;
}
var render=function(a) {
  // requestAnimationFrame(render);
  hearts.push(new Heart())
  ctx.clearRect(0, 0, ww, wh);
  console.log(hearts)
  for (var i = 0; i < hearts.length; i++) {
    hearts[i].draw();
    if (hearts[i].size <= 0) {
      hearts.splice(i, 1);
      i--;
    }
  }
  ctx.restore();
  ctx.draw()
}
//时间
var time=function(futimg,that) {
  var nowtime = new Date().getTime(); // 现在时间转换为时间戳
  var futruetime = new Date(futimg).getTime(); // 未来时间转换为时间戳
  var msec = nowtime - futruetime; // 毫秒 未来时间-现在时间
  var time = (msec / 1000);  // 毫秒/1000
  var day = parseInt(time / 86400); // 天  24*60*60*1000 
  var hour = parseInt(time / 3600) - 24 * day;    // 小时 60*60 总小时数-过去的小时数=现在的小时数 
  var minute = parseInt(time % 3600 / 60); // 分 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
  var second = parseInt(time % 60);  // 以60秒为一整份 取余 剩下秒数
  // console.log(that.data)
  that.setData({
    time:time,
    day:day,
    hour:hour,
    minute:minute,
    second,second
  })
  return true;
}
Page({
  /**
   * 页面的初始数据
   */
   onMove : function (e) {
     console.log(e)
    mouseMoved = true;
    if (e.type === "touchmove") {
      hearts.push(new Heart(e.touches[0].clientX, e.touches[0].clientY));
      hearts.push(new Heart(e.touches[0].clientX, e.touches[0].clientY));
    }
    else {
      hearts.push(new Heart(e.clientX, e.clientY));
      hearts.push(new Heart(e.clientX, e.clientY));
    }
  },
  data: {
    time:'00',
    day:'00',
    hour:'00',
    minute:'00',
    show:true
  },
 
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  opcraty:function(){
    this.setData({
      show:false
    })
    wx.redirectTo({url:'../laugh/laugh'})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    let that=this
    wx.getSystemInfo({
      success: function (res) {
        let myCanvasWidth = res.windowWidth
        ww=myCanvasWidth
        let myCanvasHeight = res.windowHeight
        wh=myCanvasHeight
        that.setData({
          canvasWidth: myCanvasWidth,
          canvasHeight: myCanvasHeight
        })
      },
    })
    // requestAnimationFrame(render);
    var query = wx.createSelectorQuery()//创建节点查询器 query
    var h1 = query.select('#h1')
    var ptimer;
    function a(){
      time('2019,3,24', that)
      ptimer = setTimeout(a, 1000);// 添加计时器
    } 
    a()
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
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
