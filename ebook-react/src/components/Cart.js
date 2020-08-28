import React from 'react';
import {List, Button, notification} from 'antd';
import Cartitem from "./Cartitem";
import {getCart,deleteCart} from "../services/CartService";
import {addOrder} from "../services/OrderService";

const IconText = ({ icon, text }) => (
    <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
  </span>
);

class Cart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cart:[],
            alladd:false,
            orderable:false,
            totalprice:0,
    }
    }

    componentDidMount() {
        const callback = (data)=>{
            this.initRowType(data);
        }
        getCart(sessionStorage.getItem("userId"),callback);
    }

    initRowType(data) {
        for (let item of data) {
            item["inorder"] = false;
        }
        this.setState({cart:data,totalprice:0});
    }

    calculate = ()=>{
        let x=0;
        let orderable=false;
        this.state.cart.map(item=>{
            if(item.inorder==true)
            {
                x +=item.num*item.book.price;
                orderable = true;
            }
    })
        this.setState({totalprice:x , orderable:orderable});
    }

    reverseType(cartId) {
        const data = this.state.cart.map((item)=>{
            if(item.cartId==cartId)
            item.inorder = !item.inorder;
            return item;
        })
        this.setState({cart:data});
        this.calculate();
    }

    delete=(cartId)=>{
        this.setState({
            cart: this.state.cart.filter(item=>(item.cartId!=cartId))
        });
        this.calculate();
    }

    renderlist(){
        return(
            <List
                grid={{gutter: 0, column: 2}}
                itemLayout="vertical"
                size = "large"
                dataSource={this.state.cart}
                pagination={{
                    pageSize: 4
                }}
                renderItem={item => (
                    <List.Item>
                        <Cartitem info={item} parent={this}/>
                    </List.Item>
                )}
            />
        );
    }

    order=()=>{
        const predata =this.state.cart.filter(item=>item.inorder==true);
        const data = predata.map((item)=>{
                return {cartId:item.cartId};
        })
        const alldata={
            userId:sessionStorage.getItem("userId"),
            order:data
        }

        const callback2 = (data)=>{
            this.initRowType(data);
        }

        const callback = (datas)=>{
            if(datas.length==0)
            {
                notification["success"]({
                    message:"购买成功",
                    duration:2,
                    placement:"bottomRight"
                })
            }
            else{
                var message = "";
                for(let data of datas)
                {
                    message = message + data;
                }
                notification["error"]({
                    message:message+"库存不足，购买失败",
                    duration:3,
                    placement:"bottomRight"
                })
            }
            getCart(sessionStorage.getItem("userId"),callback2);
        };

        addOrder(alldata,callback);
    }

    alladd=()=>{
        const data = this.state.cart;
        for(let item of data)
            item.inorder = true;
        this.setState({cart:data,alladd:true});
        this.calculate();
    }

    allremove=()=>{
        const data = this.state.cart;
        for(let item of data)
            item.inorder = false;
        this.setState({cart:data,alladd:false});
        this.calculate();
    }

    alldelete=()=>{
        this.state.cart.filter(item=>(
            deleteCart(item.cartId)))
        this.setState({cart:[]});
        this.calculate();
    }
    render() {
        return (
            <div className="cartlist">
                <Button shape="round" className="order" onClick={this.order} disabled={!this.state.orderable}>下  单</Button>
                <Button shape="round" className="alladd" onClick={this.alladd}
                        style={{display:this.state.alladd?"none":"block"}}>全  选</Button>
                <Button shape="round" className="allremove" onClick={this.allremove}
                        style={{display:this.state.alladd?"block":"none"}}>全 不 选</Button>
                <Button shape="round" className="alldelete" onClick={this.alldelete}>清空购物车</Button>
                <span className="totalprice">总价：￥{this.state.totalprice.toFixed(2)}</span>
                {this.renderlist()}
            </div>
        )
    }
}

export default Cart;
