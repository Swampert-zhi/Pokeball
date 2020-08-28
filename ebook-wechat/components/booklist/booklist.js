// components/booklist/booklist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    books:[],
    prebooks:[],
  },
  /**
   * 组件的生命周期
   */
  lifetimes: {
    created(){
    var Bookservice = require("../../services/Bookservice");
    const callback = (data)=>{
      this.setData({books:data,prebooks:data});
    }
    Bookservice.getBooks(callback);
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSearch(event){
      var newdata = this.data.prebooks.filter((item)=>{
        if( 
          item.title.toString().toLowerCase().includes(event.detail.toLowerCase())||
          item.author.toString().toLowerCase().includes(event.detail.toLowerCase())||
          item.language.toString().toLowerCase().includes(event.detail.toLowerCase())||
          item.price.toString().toLowerCase().includes(event.detail.toLowerCase())
        )
        return item;
      })
      this.setData({books:newdata});
    },

    cancelSearch(){
      this.setData({books:this.data.prebooks});
    },

    onChange(event){
      console.log(event.detail);
      wx.navigateTo({
        url: '../index/index',
      })
    },

    fordetail(event){
      let bookId = event.currentTarget.id;
      wx.navigateTo({
        url: '../../pages/bookdetail/bookdetail?bookId='+bookId
      })
    }
  }
})
