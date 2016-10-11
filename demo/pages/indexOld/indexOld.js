var apiUrls = [
    'https://localhost:18081/get-recomment-teachers',
    'https://localhost:18081/get-hot-teachers'
];
var tabTitle = ['推荐老师', '热门老师'];

var appInstance = getApp();
var emptyContImageUrl = appInstance.globalData.emptyContImageUrl;


Page({
    loadMore: function(event) {
        
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
    getTeachers: function(currentTab) {
        var that = this;
        var panel = this.data.panels[currentTab];
        var currentPage = panel.currentPage;
        var totalPage = panel.totalPage;

        // 如果不是最后一页，继续加载数据
        if (currentPage < totalPage) {
            this.setData({
                fetching: true,
                isLastPage: false
            });

            wx.request({
                url: apiUrls[currentTab],
                method: "POST",
                data: {
                    page: this.data.panels[currentTab].currentPage + 1
                },
                header:{
                    "Content-Type": "application/json"
                },
                success: function(res) {
                    console.log('success');

                    var panels = that.data.panels; 
                    var responData = res.data.data;
                    var currentPage = responData.currentPage;
                    var totalPage = responData.totalPage;  
                    var teachers = responData.teachers;

                    if (currentPage < totalPage) {
                        that.setData({
                            isLastPage: false
                        });    
                    } else if (currentPage == totalPage) {
                        that.setData({
                            isLastPage: true
                        });   
                    }

                    if (currentPage <= totalPage && teachers.length) {
                        panels.splice(currentTab, 1, {
                            title: tabTitle[currentTab],
                            teachers: teachers,
                            currentPage: currentPage,
                            totalPage: totalPage
                        }); 

                        that.setData({
                            panels: panels    
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
        var currentTab = this.data.currentTab; 

        // this.getTeachers(currentTab);
    },
    // 事件
    switchTab: function(event) {
        console.log('switchTab');
        var currentTab = Number(event.target.dataset.index);
        var panel = this.data.panels[currentTab];

        this.setData({
            currentTab: currentTab           
        });

        if (!panel.teachers.length) {// 如果某个选卡未初始化数据
            this.getTeachers(currentTab);
        } else {
            var currentPage = panel.currentPage;
            var totalPage = panel.totalPage;

            console.log('currentPage: ', currentPage);
            console.log('totalPage: ', totalPage);

            if (currentPage < totalPage) {
                this.setData({
                    isLastPage: true
                });     
            } else {
                this.setData({
                    isLastPage: false
                }); 
            }
        }
    },
    data: {
        navItems: [{
            'className': 'icon-art',
            'text': '艺术',
            'id': 1    
        }, {
            'className': 'icon-sport',
            'text': '体育',
            'id': 2
        }, {
            'className': 'icon-life',
            'text': '生活',
            'id': 3
        }, {
            'className': 'icon-abroad',
            'text': '出国',
            'id': 4
        }, {
            'className': 'icon-child',
            'text': '幼小',
            'id': 5
        }, {
            'className': 'icon-middle-school',
            'text': '初中',
            'id': 6
        }, {
            'className': 'icon-hight-school',
            'text': '高中',
            'id': 7
        }, {
            'className': 'icon-college',
            'text': '大学',
            'id': 8 
        }, {
            'className': 'icon-language',
            'text': '语言',
            'id': 9 
        }, {
            'className': 'icon-other',
            'text': '其他',
            'id': 10
        }],
        emptyContImageUrl: emptyContImageUrl,
        currentTab: 0,
        fetching: false,
        isLastPage: false,
        panels: [{
            title: tabTitle[0],
            teachers: [], 
            currentPage: 0,
            totalPage: 0
        }, {
            title: tabTitle[1],
            teachers: [],
            currentPage: 0,
            totalPage: 0
        }]
    }
})