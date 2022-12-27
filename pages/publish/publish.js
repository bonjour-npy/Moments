// pages/publish/publish.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc:"../../assets/images/add.png",
    content:'',
    textLenth:0,
    images:[],
    maxcount:9,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
that =this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  bindInput(e){
  that.setData({
  content:e.detail.value,
  textLenght:e.detail.value.lenght
  })
},
chooseImage(){
wx.chooseImage({
  count:9,
  sizeType:['original','compressed'],
  sourceType:['album','camera'],
  success(res){
    that.setData({
      images:res.tempFilePaths
    })
  }
})
},
previewImage(e){
  const current = e.target.dataset.src //获取当前点击的 图片 url
  wx.previewImage({
    
    current,// 当前显示图片的 http 链接
    urls: this.data.info.licensePicUrls // 需要预览的图片 http 链接列表
  })
}
})