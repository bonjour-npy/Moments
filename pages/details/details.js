// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc:"../../assets/images/add.png",
    datainput:"",
    inputlength:0,
    info: {
      licensePicUrls: [],
    },
    imgShow:false
  },
  bindinput(e){
    this.setData({
      datainput: e.detail.value,
      inputlength:e.detail.cursor
    })
  },
  uploadphoto(e){
    var that = this
      wx: wx.showActionSheet({
        itemList: ['拍照', '从手机相册选择'],
        itemColor: '',
        success: function (res) {
            wx.chooseImage({
              count: 9,//最多选9张
              sizeType: ['original', 'compressed'],
              sourceType: ['album', 'camera'],
              success (res) {
                console.log('res',res)
                const tempFilePaths = res.tempFilePaths
                that.setData({
                  "info.licensePicUrls":tempFilePaths,
                  imgShow:true
                })
              }
            })
        },
        fail: function (res) {
          console.log('取消',res.errMsg);
        },
        complete: function (res) {},
      })
    },
  
    //图片预览
    previewImage(e) {
      const current = e.target.dataset.src  //获取当前点击的 图片 url
      wx.previewImage({
        current,
        urls: this.data.info.licensePicUrls
      })
    },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  }
})