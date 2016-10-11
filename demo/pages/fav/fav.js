var apiUrl = 'https://localhost:18081/get-fav-teachers';

Page({
    getTeachers: function() {
        var that = this;

        this.setData({
            fetching: true
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
                var newTeachers = responData.teachers;
                var oldTeachers = that.data.teachers;
                var teachers = oldTeachers.concat(newTeachers);

                console.log('老师数目：', teachers.length);

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
                        teachers: teachers,
                        currentPage: currentPage     
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
    },
    loadMore: function() {
        this.getTeachers();    
    },
    onLoad: function() {
        this.getTeachers();
    },
    data: {
        fetching: false,
        currentPage: 0,
        isLastPage: false,
        teachers: []
    }    
});