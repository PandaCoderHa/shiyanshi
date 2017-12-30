
const app = getApp()
var utils = require('../../utils/util');
var encStr;
var utilMd5 = require('../cryptojs/lib/MD5.js');  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  //弹出层
  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ popErrorMsg: '' });
      clearTimeout(fadeOutTimeout);
    }, 1000);
  }, 
  //获取用户输入的密码
  loginBtnClick: function (e) {
    
    var psd = this.data.userPwd;
    var username=this.data.userName;
    setTimeout(() => {
      if (username == null || username == "") {
        this.setData({
          popErrorMsg:"用户名不能为空！"
        });
        this.ohShitfadeOut();
        return;
      }
      else if(psd == null || psd == ""){
        this.setData({
          popErrorMsg: "密码不能为空！"
        });
        this.ohShitfadeOut();
        return;
      }
    },100)
    var psd1 = utilMd5(psd);//密码MD5小写
    var user='{"passwd": "'+psd1+'","uid": "'+this.data.userName+'"}';
    var str=utils.Encrypt(user);//加密函数
    var that = this;
    // var user=JSON.parse(user);
    wx.request({
      url: 'https://api.mindaxiaosi.com/api/isp/info?nonce=' + str.nonce + '&msg_signature=' + str.msg_signature,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },  
      method: "POST",
      data: {
        'encrypt_msg': str.encrypt_msg,
        'api_key': str['api-key']
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫newlist的数组中
        if (res.data.errcode == 2){
          setTimeout(() => {
              that.setData({
                popErrorMsg: "账号或密码错误！"
              });
              that.ohShitfadeOut();
              return;
            
          }, 100)
          
        }
        else if( res.data.errcode == 0){
          var netlist= utils.Decrypt(res.data.nonce,res.data.encrypt_msg);
          that.setData({
            netlist: netlist,
          })
          wx.setStorage({
            key: 'key',
            data: netlist,
          })
          // console.log(user)
          wx.setStorage({
            key: 'username',
            data: user,
          })
          wx.redirectTo({
            url: '../networks/networks',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'username',
      success: function (res) {
        wx.redirectTo({
          url: '../networks/networks',
        })
      },
    })
//     var that=this
//     var stree = 'xk6F4oSj';
//     console.log(stree);
//     wx.request({
//       url: 'https://api.mindaxiaosi.com/api/urp/usr_dinfo?nonce=jSisiJCEIUQvaHzJoUNJvppta&msg_signature=4D4E1BC32BE5B19FEBCF5152C45C835F50A9A756',
//       header: {
//          "content-type": "application/x-www-form-urlencoded"
//       },  
//       method: "POST",
//       // parame: {
//       //   'nonce': 'jSisiJCEIUQvaHzJoUNJvppta',
//       //   'msg_signature': '4D4E1BC32BE5B19FEBCF5152C45C835F50A9A756',
//       // },
//       data: {
//         'encrypt_msg': 'f9276962a44d8ca70e9104b96efa13b50328ebce726e774eba6bc8c446b5a3e627826c7302ae651e678ae89db489c71c',
//         'api_key': 'xk6F4oSj'
//       },
//       success:function(res){
//         //将获取到的json数据，存在名字叫newlist的数组中
//         console.log('--------------44444444444444------------------');
//         console.log(res.data);
//         console.log('--------------44444444444444------------------');
//         that.setData({
//           newlist:res.data,
//         })
//       }
//     })
   },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})