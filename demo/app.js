//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  getUserInfo: function(cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },

  globalData:{
    userInfo: {
      name: 'yota',
      mobile: '13450258690',
      avatar: '/images/default-course-cover.png' 
    },
    teacherBasicUrl: '/pages/teacher',
    studioBasicUrl: '/pages/studio',
    defaultCourseCover: '/images/default-course-cover.png',
    emptyContImageUrl: '/images/empty-cont.png',
    cats: [{
      label: '艺术',
      name: 'art' 
    }, {
      label: '体育',
      name: 'sport'
    }, {
      label: '语言',
      name: 'language'
    }, {
      label: '高中',
      name: 'hight-school'
    }, {
      label: '初中',
      name: 'middle-school'
    }, {
      label: '出国',
      name: 'abroad'
    }, {
      label: '大学',
      name: 'college'
    }, {
      label: '幼小',
      name: 'child'
    }, {
      label: '生活',
      name: 'life'
    }, {
      label: '其他',
      name: 'other'
    }]
  }
})
