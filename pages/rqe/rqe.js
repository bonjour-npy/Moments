// pages/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    date:'2022-12-24'
  },
  onReady() {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        show: true
      })
    }, 2000);
  },
  uploadPhoto() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
      }
    })
  },
  submit(e) {
    //用户表单数据
    const value = e.detail.value;
    //数据发送到服务器
    console.log(value);
    if (value.Sname == "") {
      wx.showToast({
        title: '请输入你的姓名',
        icon: 'error',
        duration: 2000

      })
    }
  },
  checkboxchange(e) {
    const value = e.detail.value;
    console.log(value);
    wx.showModal({
      title: '原因',
      editable:true,
      placeholderText: '你食不食油饼',
      success: (res) => {
        if (res.cancel) {
          console.log("确定")
        }

        if (res.confirm) {
          console.log("取消")
        }
      }
    })
  }


})