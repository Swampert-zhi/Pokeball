// components/cart/cart.js
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
    cartitems:[],
    totalprice:0.00,
  },
  
  /**
   * 组件的生命周期
   */
  lifetimes: {
    created(){
      var Orderservice = require("../../services/Orderservice");
      const callback=(data)=>{
        this.setData({cartitems:data});
      }
      wx.getStorage({
        key: 'userId',
        success:(res)=>{
          Orderservice.getCart(res.data,callback);
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e){
      var orderservice = require("../../services/Orderservice");
      const value={
        cartId:parseInt(e.target.id),
        num:e.detail
      };
      orderservice.postCart(value);

      let total = 0;
      this.data.cartitems.map((item)=>{
        if(item.select == true)
        {
          if(item.cartId == parseInt(e.target.id))
            total+=item.book.price*e.detail;
          else
            total+=item.book.price*item.num;
        }
      })
      total*=100;

      this.setData({cartitems:this.data.cartitems.map((item)=>{
        if(item.cartId == parseInt(e.target.id))
        {
          item.num = e.detail;
        }
        return item;
      }),totalprice:total});
    },

    changeSelect(e){
      let total = 0;
      let newData = this.data.cartitems.map((item)=>{
        if(item.cartId == parseInt(e.target.id))
          item.select = !item.select;
        if(item.select==true)
          total+=item.book.price*item.num;
        return item;
      })
      total*=100;

      this.setData({cartitems:newData,totalprice:total});
    },

    onSubmit(){
      var orderservice = require("../../services/Orderservice");

      const predata =this.data.cartitems.filter(item=>item.select==true);
      if(predata.length==0)
      {
        wx.showToast({
          title: "未选择商品，无法购买",
          icon: "none"
        });
      }
      else
      {
        const data = predata.map((item)=>{
          return {cartId:item.cartId};
  });
  if(data[0]!=undefined)
  wx.getStorage({
    key: 'userId',
    success:(res)=>{
      const alldata={
        userId:res.data,
        order:data
      };
      const callback = (datas)=>{
        if(datas.length!=0)
        {
          var message="";
          datas.map((item)=>{
            message+=item;
          })
          wx.showToast({
            title: message+"库存不足，购买失败",
            icon: "none"
          })
        }
        else
        {
          wx.showToast({
            title: "购买成功",
            icon: "none"
          })
        }
        orderservice.getCart(res.data,(data)=>{this.setData({cartitems:data,totalprice:0.00});});
      };
      orderservice.addOrder(alldata,callback);
    }
  })
      }
    },

    onDelete(e){
      var orderservice = require("../../services/Orderservice");
      orderservice.deleteCart(parseInt(e.target.id));

      this.setData({cartitems:this.data.cartitems.filter(item=>
        item.cartId!=parseInt(e.target.id)
        )})
    }
  }
})
