// pages/register/register.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    defaultType: true,
    passwordType: true,
    defaultType2: true,
    passwordType2: true
  },
  usernameInput: function(e) {
    this.data.usernameInput = e.detail.value;
  },
  mailInput: function(e) {
    this.data.mailInput = e.detail.value;
  },
  passwordInput: function(e) {
    this.data.passwordInput = e.detail.value;
  },

  backloginClick: function () {
    wx.navigateTo({
      url: '/pages/login/login',
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
    eyeStatus2: function() {
      if (this.data.defaultType2) {
        this.setData({
          passwordType2: false,
          defaultType2: false,
        })
      } else {
        this.setData({
          passwordType2: true,
          defaultType2: true,
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
  },

  loginClick: function() {
    var that = this;
    wx.request({
        //请求链接
        url: 'https://photoshare.akasaki.space/api/user/register',
        method: 'post',
        header: {
          'content-type': 'application/json',
        },
        //发送的数据
        data: {
          username: this.data.usernameInput,
          email: this.data.mailInput,
          password: this.data.passwordInput
        },
        //成功回调
        success: function (res) {
          if(res.data.success === true){
              wx.navigateTo({
                url: '/pages/login/login',
              });
              wx.showToast({
                title: '注册成功，返回登录',
              });
          }
          else {
              wx.showToast({
                title: '用户已存在，重新注册',
              })
            }
          that.setData({
              sucess: res.data.success,
              token: res.data.token
          })
      },
    });
  }
})
