var tabTitle = ['简介', '课程', '相册'];
var appInstance = getApp();
var defaultCourseCover = appInstance.globalData.defaultCourseCover;

Page({
    onLoad: function() {
        var that = this;

        setTimeout(function() {
            that.setData({
                loading: false
            })    
        }, 1000);
    },
    switchTab: function(event) {
        var currentTab = Number(event.target.dataset.index);
        var panel = this.data.panels[currentTab];
        var that = this;

        this.setData({
            currentTab: currentTab           
        });   

        // 如果是第一次切换至该选卡，则请求数据
        if (!panel.data) {
            this.setData({
                loading: true
            });

            setTimeout(function() {
               that.setData({
                    loading: false
                }); 
            }, 1000);
        }

    },
    data: {
        teacher: {
            "name": "yota",
            "avatar": "/images/avatar-demo.png",
            "intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
            "teachingAge": 10
        },
        currentTab: 0,
        loading: true,
        panels: [{
            title: tabTitle[0],
            data: {
                degree: "本科",
                school: "广东工业大学",
                role: "在校生",
                studio: "暂无",
                intro: "国家一级健身指导员 东一PFEA金牌私人教练 AASFP亚洲体适能教练 DFEA绿色拉伸疗法 肌筋膜松解及结构整疗。擅长授课：增肌、塑形、康复及功能性训练课程，曾帮助过102会员达到自身目标。",
                experiences: [{
                    time: "2016-10-06",
                    cont: "国家一级健身指导员 东一PFEA金牌私人教练 AASFP亚洲体适能教练 DFEA绿色拉伸疗法 肌筋膜松解及结构整疗。擅长授课：增肌、塑形、康复及功能性训练课程，曾帮助过102会员达到自身目标。"
                }, {
                    time: "2016-10-06",
                    cont: "国家一级健身指导员 东一PFEA金牌私人教练 AASFP亚洲体适能教练 DFEA绿色拉伸疗法 肌筋膜松解及结构整疗。擅长授课：增肌、塑形、康复及功能性训练课程，曾帮助过102会员达到自身目标。"
                }]  
            }
        }, {
            title: tabTitle[1],
            data: {
                courses: [{
                    cover: "" || defaultCourseCover,
                    name: "天山健身",
                    intro: "优美的环境，全方位的服务，是您健身休闲的好去处！价格150元起",
                    type: "1对1"
                }, {
                    cover: "" || defaultCourseCover,
                    name: "体适能训练",
                    intro: "优美的环境，全方位的服务，是您健身休闲的好去处！价格150元起",
                    type: "1对1"
                }]
            }
        }, {
            title: tabTitle[2],
            data: {
                photos: [
                    defaultCourseCover,
                    defaultCourseCover,
                    defaultCourseCover,
                    defaultCourseCover
                ]
            }
        }]
    }   
});