var apiUrl = 'https://localhost:18081/get-recomment-teachers';

Page({
    go2search: function() {
        wx.navigateTo({
            url: '/pages/search/search'
        })    
    },
    focusInput: function() {
        this.setData({
            isFocus: true
        })
    },
    bindInputHandler: function(event) {
        var keyword = event.detail.value;
        this.setData({
            keyword
        }) 
        console.log('正在输入...', keyword);

    },
    bindBlurHandler: function() {
        this.setData({
            isFocus: false
        })    
        console.log('失去焦点');
    },
    cleanKeyword: function() {
        console.log('清除关键字');
        this.setData({
            keyword: ''
        }) 
    },
    loadMore: function(event) {
        this.getTeachers();  
        console.log('loadMore');
    },
    redictDetail: function(e) {
        var data = e.currentTarget.dataset; 
        var id = data.id;
        var role = data.role;
        var url;

        if (role == 'teacher') {
            url = '/pages/teacher/teacher?id=' + id;
        } else if (role == 'studio') {
            url = '/pages/studio/studio?id=' + id;
        } else {
            url = '/pages/404/404';
        }
        
        wx.navigateTo({
            url: url
        })
    },
    getTeachers: function() {
        var that = this;
        var currentPage = that.data.currentPage;
        var totalPage = that.data.totalPage;

        // 如果不是最后一页，继续加载数据
        if ((!currentPage && !totalPage) || currentPage < totalPage) {
            this.setData({
                fetching: true,
                isLastPage: false
            });

            wx.request({
                url: apiUrl,
                method: "POST",
                data: {
                    page: that.data.currentPage + 1
                },
                header:{
                    "Content-Type": "application/json"
                },
                success: function(res) {
                    console.log('success');

                    var responData = res.data.data;
                    var currentPage = responData.currentPage;
                    var totalPage = responData.totalPage; 
                    var oldTeachers = that.data.teachers;
                    var newTeachers = responData.teachers;

                    if (currentPage < totalPage) {
                        that.setData({
                            isLastPage: false
                        });    
                    } else if (currentPage == totalPage) {
                        that.setData({
                            isLastPage: true
                        });   
                    }

                    if (currentPage <= totalPage && newTeachers.length) {
                        that.setData({
                            teachers: oldTeachers.concat(newTeachers)    
                        });
                    }

                },
                fail: function() {
                    console.log('fail');

                },
                complete: function() {

                    console.log('complete');
                    
                    that.setData({
                        fetching: false
                    });
                    
                }
            });
        } else {
            this.setData({
                isLastPage: true
            })
        }

        
    },
    onLoad: function() {
        this.getTeachers();
    },
    data: {
        keyword: '',
        isFocus: false,
        fetching: false,
        isLastPage: false,
        currentPage: 0,
        totalPage: 0,
        teachers: []
    }
})