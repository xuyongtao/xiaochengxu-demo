var appInstance = getApp();
var cats = appInstance.globalData.cats; 

Page({
    onLoad: function() {
        var that = this;

        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    windowHeight: (res.windowHeight * 2 - 90 - 110)
                })
                console.log('系统信息：', res);
            }
        })

        var newCats = this.data.cats;

        for (var i = 0,len = newCats.length; i < len; i++) {
            newCats[i].courses = [{
                label: '健身',
                url: ''
            }, {
                label: '体能适',
                url: ''
            }, {
                label: '瑜伽',
                url: ''
            }];    
        }

        this.setData({
            cats: newCats
        })

    },
    // 事件定义
    focusInput: function() {
        this.setData({
            isFocus: true
        })
    },
    bindInputHandler: function(event) {
        var keyword = event.detail.value;
        this.setData({
            keyword,
            searchResult: [{
                label: '科目',
                panels: [{
                    label: '初中-初三-物理'
                }, {
                    label: '高中-高一-物理'
                }, {
                    label: '高考物理'
                }]
            }, {
                label: '机构',
                panels: [{
                    label: '机构1'
                }, {
                    label: '机构2'
                }, {
                    label: '机构3'
                }]
            }, {
                label: '老师',
                panels: [{
                    label: '老师1'
                }, {
                    label: '老师2'
                }, {
                    label: '老师3'
                }]
            }]
        }) 
        console.log('正在输入...', keyword);
         
    },
    bindBlurHandler: function() {
        if (!this.data.keyword) {
            this.setData({
                isFocus: false
            })  
        }
          
        console.log('失去焦点');
    },
    bindCancelHandler: function(){
        this.setData({
            isFocus: false
        })
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
    scrollTop: function(){
        this.setData({
            toView: 'history-panel'
        })
    },
    scrollPanel: function(event){
        var index = event.target.dataset.index;
        console.log('index: ', index);

        this.setData({
            toView: (cats[index].name + '-panel')
        });
    },
    // end事件定义
    data: {
        toView: 'history-panel',
        cats,
        keyword: '',
        searchResult: [],
        isFocus: false,
        fetching: false,
        isLastPage: false,
        currentPage: 0,
        totalPage: 0,
        teachers: [],
        histories: [{
            label: '艺术-器乐-钢琴',
            url: '1'
        }, {
            label: '天山健身',
            url: '2'
        }, {
            label: '刘老师',
            url: '3'
        }]
    }
})