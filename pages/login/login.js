// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    defaultType: true,
    passwordType: true
  },
  mailInput: function(e) {
    this.data.mailInput = e.detail.value;
  },
  passwordInput: function(e) {
    this.data.passwordInput = e.detail.value;
  },
  loginClick:function (){
    var that = this;
    wx.request({
        //请求链接
        url: 'https://photoshare.akasaki.space/api/user/login',
        method: 'post',
        header: {
          'content-type': 'application/json',
        },
        //发送的数据
        data: {
          email: this.data.mailInput,
          password: this.data.passwordInput
        },
        //成功回调
        success: function (res) {
          if(res.data.success == true){
            wx.navigateTo({
              url: '/pages/home/home',
            })
            wx.showToast({
              title: '登录成功',
            })
          }
          else {
              wx.showToast({
                title: '用户不存在或密码错误',
                icon: 'none'
              })
            }
          that.setData({
              sucess: res.data.success,
              token: res.data.token
          });
          console.log(res.data.token);
          const app = getApp();
          app.globalData.token = res.data.token;
          wx.setStorage({
            key: 'token',
            data: res.data.token
          })
      },
    });
  },
  registerClick:function () {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
    //defaultType：眼睛状态   passwordType：密码可见与否状态
    eyeStatus: function() {
      if (this.data.defaultType) {
        this.setData({
          passwordType: false,
          defaultType: false,
        })
      } else {
        this.setData({
          passwordType: true,
          defaultType: true,
        })
      }
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