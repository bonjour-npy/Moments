// pages/home/home.js
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // imageurl:"../../assets/images/shoucang-no.png",
    // dianzanurl:"../../assets/images/dianzan-no.png",
    list:[],
    showOperationPannelIndex:-1,
  },
  goPublish: function() {
    wx.navigateTo({
      url:"../details/details"
    })
  },
  gomy: function() {
    wx.navigateTo({
      url:"../my/my"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp(); // 使用全局变量
    wx.request({
      url: 'https://photoshare.akasaki.space/api/publicians/random',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + app.globalData.token
      },
      success: function (res) {
        console.log(res.data)
        console.log('length: '+res.data.length)
        const app = getApp();
        app.globalData.dataList = res.data;
        var imageList = [];
        var contentList = [];
        for(var i=0; i<20;  i++) {
          imageList.push(res.data[i]["image"]);
          contentList.push(res.data[i]["description"]);
          // console.log(res.data[i]["description"])
        }
        that.setData({
          ImageList: imageList,
          ContentList: contentList
        })
        app.globalData.imageList = imageList;
        app.globalData.contentList = contentList;
        console.log(contentList)
      },
      fail: function(error) {
        console.log(error)
      }
    })
    that = this;
    for(var i=1; i<10; i++){
      var circleData = {};
      circleData.nickName = "朋友-"+i;
      circleData.content = "朋友发布-"+i;
      circleData.time = "2022-2-2"+i;

      var imageList = []
      var loveList = [];
      var commentList = [];

      circleData.imageList = imageList;
      circleData.loveList = loveList;
      circleData.commentList = commentList;

      for(var j=1; j<i;j++){
        imageList.push(j);
        var loveData = {};
        loveData.nickName = '点赞-'+j;


        loveList.push(loveData);

        var commentData = {};
        commentData.nickName = '兰陵王-'+j+":";
        commentData.content = "评论内容-"+j;

        commentList.push(commentData);
      }
      that.data.list.push(circleData);
    }
    that.setData({
      list:that.data.list
    })
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
  showOperationPannel(e){
    console.log("showOperationPannel",e)
    var index = e.currentTarget.dataset.index;
    if(that.data.showOperationPannelIndex == index){
      that.setData({
        showOperationPannelIndex:-1
      })
    }else{
    that.setData({
      showOperationPannelIndex:index
    })}
  },
})