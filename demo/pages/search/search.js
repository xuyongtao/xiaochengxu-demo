Page({
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
    data: {
        keyword: '',
        isFocus: true,
        fetching: false,
        isLastPage: false,
        currentPage: 0,
        totalPage: 0,
        teachers: []
    }
})