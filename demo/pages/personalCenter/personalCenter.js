var appInstance = getApp();
var userInfo = appInstance.globalData.userInfo;

Page({
    logout: function() {
        this.setData({
            tryLogout: true
        })
    },
    confirmLogout: function() {
        this.setData({
            tryLogout: false
        })    
    },
    cancelLogout: function() {
        this.setData({
            tryLogout: false
        })
    },
    data: {
        user: userInfo,
        tryLogout: false
    }
});