var appInstance = getApp();
var cats = appInstance.globalData.cats; 

Page({
    onLoad: function() {
        

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
        isFocus: true,
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