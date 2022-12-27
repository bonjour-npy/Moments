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
                console.log('res', res)
                const tempFilePaths = res.tempFilePaths
                that.setData({
                  "info.licensePicUrls": tempFilePaths,
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
      const current = e.target.dataset.src  //获取当前点击的图片url
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
  },

  publishClick: function() {
    wx.getStorage({
      key: 'token',
      success (res) {
        that.setData({
          token: res.data
        })
      }
    })  //获取token
    var that = this;
    const FormData = require('../../utils/formData.js')  //引入这个文件
    let formData = new FormData();  //实例化formData
    formData.appendFile("formFile", this.data.info.licensePicUrls[0], "file");//文件字段
    let data = formData.getData();  //组合成data
    const app = getApp();
    wx.request({
        //请求链接
        url: 'https://photoshare.akasaki.space/api/publicians/new',
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + app.globalData.token
        },
        //发送的数据
        data: {
          description: this.data.datainput,
        },
        //成功回调
        success: function (res) {
          console.log(res.data.id)
          that.setData({
              id: res.data.id
          })
          wx.request({
            url: 'https://photoshare.akasaki.space/api/publicians/' + res.data.id + '/image',
            method: 'PUT',
            header: {
              'content-type': data.contentType,
              'Authorization': 'Bearer ' + app.globalData.token
            },
            data: data.buffer,
            success (res){
              wx.navigateBack();
              console.log("图片上传测试" + res)
            },
            fail: function(error) {
              console.log(error)
            }
          });
      },
    });
  }
})